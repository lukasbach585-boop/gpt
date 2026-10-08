import type { ContentPack, Flashcard, LearningVisual, Lesson, Progress, ReviewState, Week } from '../types';
import { validateSourceLibrary } from './source-library';

export const PROGRESS_STORAGE_KEY = 'ki-kompass-progress-annual-v1';
const DAY_MINUTES = 1440;
const FORBIDDEN_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const ID = /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,99}$/;
const VISUALS = ['hierarchy', 'tokens', 'workflow', 'rag', 'compare', 'shield', 'loop', 'matrix'];
const LEARNING_VISUAL_KINDS = ['flow', 'comparison', 'layers', 'document', 'matrix', 'scorecard', 'cycle', 'timeline'];
const LEARNING_VISUAL_ICONS = ['brain', 'document', 'database', 'search', 'spark', 'shield', 'check', 'person', 'chart', 'target', 'settings', 'clock'];

function fail(path: string, detail: string): never {
  throw new Error(`${path}: ${detail}`);
}

/** Inspect imported JSON before touching fields: bound memory, reject accessors and pollution keys. */
function inspectJson(raw: unknown, maxSize: number): void {
  let size = 0;
  let nodes = 0;
  const seen = new WeakSet<object>();
  function visit(value: unknown, depth: number): void {
    if (depth > 16 || ++nodes > 100_000) fail('Datei', 'Datenstruktur ist zu groß oder zu tief.');
    if (typeof value === 'string') size += value.length * 2;
    else if (value === null || typeof value === 'boolean') size += 8;
    else if (typeof value === 'number') {
      if (!Number.isFinite(value)) fail('Datei', 'Ungültige Zahl.');
      size += 16;
    } else if (typeof value === 'object') {
      if (seen.has(value)) fail('Datei', 'Zyklische Daten sind nicht erlaubt.');
      seen.add(value);
      const proto = Object.getPrototypeOf(value);
      if (!Array.isArray(value) && proto !== Object.prototype && proto !== null) {
        fail('Datei', 'Nur JSON-Objekte sind erlaubt.');
      }
      if (Object.getOwnPropertySymbols(value).length) fail('Datei', 'Ungültige Eigenschaften.');
      for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
        if (Array.isArray(value) && key === 'length') continue;
        if (FORBIDDEN_KEYS.has(key) || !('value' in descriptor)) fail('Datei', 'Unsichere Eigenschaft.');
        size += key.length * 2;
        visit(descriptor.value, depth + 1);
      }
      seen.delete(value);
    } else fail('Datei', 'Nur JSON-Daten sind erlaubt.');
    if (size > maxSize) fail('Datei', 'Datei überschreitet die erlaubte Größe.');
  }
  visit(raw, 0);
}

function object(value: unknown, path: string, keys?: string[]): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(path, 'Objekt erwartet.');
  const result = value as Record<string, unknown>;
  if (keys) {
    const actual = Object.keys(result);
    if (actual.length !== keys.length || actual.some(key => !keys.includes(key))) fail(path, 'Fehlende oder unbekannte Felder.');
  }
  return result;
}

function string(value: unknown, path: string, max = 10_000, allowEmpty = false): string {
  if (typeof value !== 'string' || value.length > max || (!allowEmpty && !value.trim())) {
    fail(path, `Text${allowEmpty ? '' : ' ohne Leerwert'} mit maximal ${max} Zeichen erwartet.`);
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) fail(path, 'Ungültige Steuerzeichen.');
  return value;
}

function identifier(value: unknown, path: string): string {
  const id = string(value, path, 100);
  if (!ID.test(id) || FORBIDDEN_KEYS.has(id)) fail(path, 'Ungültige ID.');
  return id;
}

function number(value: unknown, path: string, min: number, max: number, integer = false): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) {
    fail(path, `Zahl zwischen ${min} und ${max} erwartet.`);
  }
  return value;
}

function array<T>(value: unknown, path: string, min: number, max: number, parse: (item: unknown, path: string) => T): T[] {
  if (!Array.isArray(value) || value.length < min || value.length > max) fail(path, `${min} bis ${max} Einträge erwartet.`);
  return value.map((item, index) => parse(item, `${path}[${index}]`));
}

function unique<T>(values: T[], path: string): T[] {
  if (new Set(values).size !== values.length) fail(path, 'Doppelte Einträge.');
  return values;
}

function day(value: unknown, path: string): string {
  const result = string(value, path, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result)) fail(path, 'Kalendertag als JJJJ-MM-TT erwartet.');
  const parsed = new Date(`${result}T12:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== result) fail(path, 'Ungültiger Kalendertag.');
  return result;
}

function timestamp(value: unknown, path: string): string {
  const result = string(value, path, 40);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(result) || !Number.isFinite(Date.parse(result))) {
    fail(path, 'ISO-Zeitstempel mit Zeitzone erwartet.');
  }
  day(result.slice(0, 10), path);
  const hours = Number(result.slice(11, 13));
  const minutes = Number(result.slice(14, 16));
  const seconds = Number(result.slice(17, 19));
  if (hours > 23 || minutes > 59 || seconds > 59) fail(path, 'Ungültige Uhrzeit.');
  return result;
}

function validDate(value: Date): Date {
  if (!(value instanceof Date) || !Number.isFinite(value.getTime())) fail('Datum', 'Ungültiges Datum.');
  return value;
}

function record<T>(raw: unknown, path: string, max: number, parse: (value: unknown, path: string) => T, parseKey = identifier): Record<string, T> {
  const source = object(raw, path);
  const entries = Object.entries(source);
  if (entries.length > max) fail(path, `Maximal ${max} Einträge erlaubt.`);
  return Object.fromEntries(entries.map(([key, value]) => [parseKey(key, `${path}.ID`), parse(value, `${path}.${key}`)]));
}

function review(raw: unknown, path: string): ReviewState {
  const value = object(raw, path, ['due', 'interval', 'ease', 'repetitions']);
  return {
    due: timestamp(value.due, `${path}.due`),
    interval: number(value.interval, `${path}.interval`, 0, 3650, true),
    ease: number(value.ease, `${path}.ease`, 1.3, 5),
    repetitions: number(value.repetitions, `${path}.repetitions`, 0, 100_000, true),
  };
}

export function dateKey(date = new Date()): string {
  validDate(date);
  return `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export function createProgress(): Progress {
  return {
    schemaVersion: 1,
    completed: [], bookmarks: [], reviews: {}, notes: [], attempts: [], activity: {},
    profile: { name: '', goalMinutes: 360, sessionMinutes: 15, focus: 'both', startDate: dateKey() },
    lastLesson: null, practice: {},
  };
}

/** Return a fresh, explicitly typed copy; imports never retain arbitrary object properties. */
export function parseProgress(raw: unknown): Progress {
  inspectJson(raw, 8_000_000);
  const value = object(raw, 'Fortschritt', ['schemaVersion', 'completed', 'bookmarks', 'reviews', 'notes', 'attempts', 'activity', 'profile', 'lastLesson', 'practice']);
  if (value.schemaVersion !== 1) fail('schemaVersion', 'Nicht unterstützte Fortschrittsversion.');
  const profile = object(value.profile, 'profile', ['name', 'goalMinutes', 'sessionMinutes', 'focus', 'startDate']);
  if (!['business', 'private', 'both'].includes(profile.focus as string)) fail('profile.focus', 'Ungültiger Schwerpunkt.');
  const notes = array(value.notes, 'notes', 0, 500, (rawNote, path) => {
    const note = object(rawNote, path, ['id', 'title', 'body', 'week', 'updated']);
    return { id: identifier(note.id, `${path}.id`), title: string(note.title, `${path}.title`, 200, true), body: string(note.body, `${path}.body`, 20_000, true), week: number(note.week, `${path}.week`, 1, 104, true), updated: timestamp(note.updated, `${path}.updated`) };
  });
  unique(notes.map(note => note.id), 'notes.id');
  const attempts = array(value.attempts, 'attempts', 0, 1000, (rawAttempt, path) => {
    const attempt = object(rawAttempt, path, ['id', 'date', 'label', 'scope', 'correct', 'total', 'minutes', 'wrongIds']);
    const total = number(attempt.total, `${path}.total`, 1, 500, true);
    const correct = number(attempt.correct, `${path}.correct`, 0, total, true);
    const wrongIds = unique(array(attempt.wrongIds, `${path}.wrongIds`, 0, total, identifier), `${path}.wrongIds`);
    if (wrongIds.length !== total - correct) fail(`${path}.wrongIds`, 'Fehlerliste stimmt nicht mit dem Prüfungsergebnis überein.');
    return { id: identifier(attempt.id, `${path}.id`), date: timestamp(attempt.date, `${path}.date`), label: string(attempt.label, `${path}.label`, 200), scope: string(attempt.scope, `${path}.scope`, 200), correct, total, minutes: number(attempt.minutes, `${path}.minutes`, 0, DAY_MINUTES), wrongIds };
  });
  unique(attempts.map(attempt => attempt.id), 'attempts.id');
  return {
    schemaVersion: 1,
    completed: unique(array(value.completed, 'completed', 0, 3000, identifier), 'completed'),
    bookmarks: unique(array(value.bookmarks, 'bookmarks', 0, 3000, identifier), 'bookmarks'),
    reviews: record(value.reviews, 'reviews', 10_000, review), notes, attempts,
    activity: record(value.activity, 'activity', 10_000, (amount, path) => number(amount, path, 0, DAY_MINUTES), day),
    profile: { name: string(profile.name, 'profile.name', 100, true), goalMinutes: number(profile.goalMinutes, 'profile.goalMinutes', 1, 600, true), sessionMinutes: number(profile.sessionMinutes, 'profile.sessionMinutes', 1, 240, true), focus: profile.focus as Progress['profile']['focus'], startDate: day(profile.startDate, 'profile.startDate') },
    lastLesson: value.lastLesson === null ? null : identifier(value.lastLesson, 'lastLesson'),
    practice: record(value.practice, 'practice', 3000, (rawPractice, path) => {
      const practice = object(rawPractice, path, ['text', 'checked']);
      return { text: string(practice.text, `${path}.text`, 200_000, true), checked: unique(array(practice.checked, `${path}.checked`, 0, 100, (index, indexPath) => number(index, indexPath, 0, 99, true)), `${path}.checked`) };
    }),
  };
}

export function loadProgress(): Progress {
  try {
    const raw = globalThis.localStorage?.getItem(PROGRESS_STORAGE_KEY);
    // Corrupt data stays stored for recovery. Loading must never replace it with an empty profile.
    if (raw && raw.length > 8_000_000) return createProgress();
    return raw ? parseProgress(JSON.parse(raw)) : createProgress();
  } catch {
    return createProgress();
  }
}

export function saveProgress(progress: Progress, options: { replaceCorrupt?: boolean } = {}): boolean {
  try {
    const validated = parseProgress(progress);
    if (!globalThis.localStorage) return false;
    const stored = globalThis.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (stored && !options.replaceCorrupt) {
      try {
        if (stored.length > 8_000_000) return false;
        parseProgress(JSON.parse(stored));
      } catch {
        // A default profile after a failed load must not erase someone's only backup.
        return false;
      }
    }
    globalThis.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(validated));
    return true;
  } catch {
    return false;
  }
}

export function addActivity(progress: Progress, minutes: number, date = new Date()): Progress {
  number(minutes, 'Lernminuten', 0, DAY_MINUTES);
  const key = dateKey(date);
  const previous = progress.activity[key] ?? 0;
  return { ...progress, activity: { ...progress.activity, [key]: Math.min(DAY_MINUTES, previous + minutes) } };
}

/** Calendar-day spacing keeps review times stable when daylight-saving time changes. */
export function scheduleReview(previous: ReviewState | undefined, grade: 'again' | 'hard' | 'good' | 'easy', now = new Date()): ReviewState {
  validDate(now);
  if (!['again', 'hard', 'good', 'easy'].includes(grade)) fail('Bewertung', 'Ungültige Kartenbewertung.');
  const state = previous ? review(previous, 'Kartenfortschritt') : { interval: 0, ease: 2.5, repetitions: 0 };
  let interval: number;
  let ease = state.ease;
  let repetitions = Math.min(100_000, state.repetitions + 1);
  const due = new Date(now.getTime());
  if (grade === 'again') {
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
    repetitions = 0;
    due.setTime(due.getTime() + 10 * 60_000);
  } else {
    if (grade === 'hard') {
      interval = Math.max(1, Math.ceil(state.interval * 1.2));
      ease = Math.max(1.3, ease - 0.15);
    } else if (grade === 'good') {
      interval = state.repetitions === 0 ? 1 : state.repetitions === 1 ? 3 : Math.max(state.interval + 1, Math.round(state.interval * ease));
    } else {
      interval = state.repetitions === 0 ? 4 : Math.max(state.interval + 1, Math.round(state.interval * ease * 1.3));
      ease = Math.min(5, ease + 0.15);
    }
    interval = Math.min(3650, interval);
    due.setDate(due.getDate() + interval);
  }
  return { due: due.toISOString(), interval, ease, repetitions };
}

export function dueCards(cards: Flashcard[], progress: Progress, now = new Date()): Flashcard[] {
  const current = validDate(now).getTime();
  const availableWeeks = new Set([1]);
  for (const id of progress.completed) {
    const match = /^w(\d+)-l\d+$/.exec(id);
    if (match) availableWeeks.add(Number(match[1]));
  }
  return cards
    .filter(card => availableWeeks.has(card.week) && (!progress.reviews[card.id] || Date.parse(progress.reviews[card.id].due) <= current))
    .sort((a, b) => (progress.reviews[a.id] ? Date.parse(progress.reviews[a.id].due) : Infinity) - (progress.reviews[b.id] ? Date.parse(progress.reviews[b.id].due) : Infinity) || a.week - b.week);
}

export function getStreak(activity: Record<string, number>, now = new Date()): number {
  const cursor = new Date(validDate(now).getTime());
  cursor.setHours(12, 0, 0, 0);
  if (!(activity[dateKey(cursor)] > 0)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (activity[dateKey(cursor)] > 0 && streak < 10_000) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function contentText(value: unknown, path: string, max = 10_000): string {
  const result = string(value, path, max);
  // Packs contain prose, not HTML or executable templates. React renders all accepted text as text.
  if (/<\/?\s*[a-z!][^>]*>/i.test(result) || /(?:javascript|vbscript)\s*:/i.test(result) || /data\s*:[\w.+/-]+[;,]/i.test(result)) fail(path, 'HTML oder ausführbare Inhalte sind nicht erlaubt.');
  return result;
}

function texts(value: unknown, path: string, min = 1, max = 30): string[] {
  return array(value, path, min, max, contentText);
}

function learningVisual(raw: unknown, path: string): LearningVisual {
  const hasConnections = !!raw && typeof raw === 'object' && Object.hasOwn(raw, 'connections');
  const value = object(raw, path, ['kind', 'title', 'caption', 'steps', 'takeaway', ...(hasConnections ? ['connections'] : [])]);
  if (!LEARNING_VISUAL_KINDS.includes(value.kind as string)) fail(`${path}.kind`, 'Unbekannter Grafiktyp.');
  const steps = array(value.steps, `${path}.steps`, 3, 6, (rawStep, stepPath) => {
    const step = object(rawStep, stepPath, ['title', 'detail', 'example', 'icon']);
    if (!LEARNING_VISUAL_ICONS.includes(step.icon as string)) fail(`${stepPath}.icon`, 'Unbekanntes Grafiksymbol.');
    return {
      title: contentText(step.title, `${stepPath}.title`, 160),
      detail: contentText(step.detail, `${stepPath}.detail`, 600),
      example: contentText(step.example, `${stepPath}.example`, 600),
      icon: step.icon as LearningVisual['steps'][number]['icon'],
    };
  });
  return {
    kind: value.kind as LearningVisual['kind'],
    title: contentText(value.title, `${path}.title`, 160),
    caption: contentText(value.caption, `${path}.caption`, 500),
    steps,
    takeaway: contentText(value.takeaway, `${path}.takeaway`, 500),
    ...(hasConnections ? { connections: array(value.connections, `${path}.connections`, 0, 6, (connection, connectionPath) => contentText(connection, connectionPath, 100)) } : {}),
  };
}

function lesson(raw: unknown, path: string): Lesson {
  const hasLearningVisual = !!raw && typeof raw === 'object' && Object.hasOwn(raw, 'learningVisual');
  const value = object(raw, path, ['id', 'title', 'minutes', 'summary', 'concept', 'keyPoints', 'example', 'privateUse', 'exercise', 'reflection', 'visual', ...(hasLearningVisual ? ['learningVisual'] : [])]);
  const example = object(value.example, `${path}.example`, ['title', 'text']);
  if (!VISUALS.includes(value.visual as string)) fail(`${path}.visual`, 'Unbekannte Visualisierung.');
  return {
    id: identifier(value.id, `${path}.id`), title: contentText(value.title, `${path}.title`, 200), minutes: number(value.minutes, `${path}.minutes`, 1, 180, true),
    summary: contentText(value.summary, `${path}.summary`), concept: texts(value.concept, `${path}.concept`), keyPoints: texts(value.keyPoints, `${path}.keyPoints`),
    example: { title: contentText(example.title, `${path}.example.title`, 200), text: contentText(example.text, `${path}.example.text`) },
    privateUse: contentText(value.privateUse, `${path}.privateUse`), exercise: contentText(value.exercise, `${path}.exercise`), reflection: contentText(value.reflection, `${path}.reflection`), visual: value.visual as Lesson['visual'],
    ...(hasLearningVisual ? { learningVisual: learningVisual(value.learningVisual, `${path}.learningVisual`) } : {}),
  };
}

export function validateContentPack(raw: unknown): ContentPack {
  inspectJson(raw, 8_000_000);
  const hasLibrary = !!raw && typeof raw === 'object' && Object.hasOwn(raw, 'library');
  const value = object(raw, 'Lernpaket', ['schemaVersion', 'version', 'reviewedAt', 'title', 'weeks', ...(hasLibrary ? ['library'] : [])]);
  if (value.schemaVersion !== 1) fail('schemaVersion', 'Nicht unterstützte Lernpaketversion.');
  const weeks = array(value.weeks, 'weeks', 1, 104, (rawWeek, path): Week => {
    const week = object(rawWeek, path, ['id', 'phase', 'title', 'subtitle', 'outcomes', 'lessons', 'questions', 'flashcards', 'challenge', 'resources']);
    const id = number(week.id, `${path}.id`, 1, 104, true);
    const challenge = object(week.challenge, `${path}.challenge`, ['title', 'scenario', 'task', 'rubric', 'sample']);
    return {
      id, phase: number(week.phase, `${path}.phase`, 1, 12, true), title: contentText(week.title, `${path}.title`, 200), subtitle: contentText(week.subtitle, `${path}.subtitle`, 1000),
      outcomes: texts(week.outcomes, `${path}.outcomes`), lessons: array(week.lessons, `${path}.lessons`, 1, 20, lesson),
      questions: array(week.questions, `${path}.questions`, 1, 100, (rawQuestion, questionPath) => {
        const question = object(rawQuestion, questionPath, ['id', 'prompt', 'options', 'correct', 'explanation']);
        const options = unique(array(question.options, `${questionPath}.options`, 2, 8, (option, optionPath) => contentText(option, optionPath, 2000)), `${questionPath}.options`);
        return { id: identifier(question.id, `${questionPath}.id`), prompt: contentText(question.prompt, `${questionPath}.prompt`), options, correct: number(question.correct, `${questionPath}.correct`, 0, options.length - 1, true), explanation: contentText(question.explanation, `${questionPath}.explanation`) };
      }),
      flashcards: array(week.flashcards, `${path}.flashcards`, 1, 100, (rawCard, cardPath) => {
        const card = object(rawCard, cardPath, ['id', 'front', 'back', 'week']);
        if (card.week !== id) fail(`${cardPath}.week`, 'Karte gehört zu einer anderen Woche.');
        return { id: identifier(card.id, `${cardPath}.id`), front: contentText(card.front, `${cardPath}.front`, 4000), back: contentText(card.back, `${cardPath}.back`), week: id };
      }),
      challenge: { title: contentText(challenge.title, `${path}.challenge.title`, 200), scenario: contentText(challenge.scenario, `${path}.challenge.scenario`), task: contentText(challenge.task, `${path}.challenge.task`), rubric: texts(challenge.rubric, `${path}.challenge.rubric`), sample: contentText(challenge.sample, `${path}.challenge.sample`) },
      resources: array(week.resources, `${path}.resources`, 0, 20, (rawResource, resourcePath) => {
        const resource = object(rawResource, resourcePath, ['title', 'url']);
        const url = string(resource.url, `${resourcePath}.url`, 2000);
        let parsed: URL;
        try { parsed = new URL(url); } catch { fail(`${resourcePath}.url`, 'Ungültiger Link.'); }
        if (parsed.protocol !== 'https:' || parsed.username || parsed.password || /[\s\\]/.test(url)) fail(`${resourcePath}.url`, 'Nur HTTPS-Links ohne Zugangsdaten sind erlaubt.');
        return { title: contentText(resource.title, `${resourcePath}.title`, 200), url };
      }),
    };
  });
  unique(weeks.map(week => week.id), 'weeks.id');
  const ids = weeks.flatMap(week => [...week.lessons, ...week.questions, ...week.flashcards].map(entry => entry.id));
  unique(ids, 'Lerninhalte.ID');
  for (const week of weeks) {
    for (const [type, items] of [['l', week.lessons], ['q', week.questions], ['f', week.flashcards]] as const) {
      if (items.some(item => !new RegExp(`^w${week.id}-${type}[1-9]\\d*$`).test(item.id))) fail(`Woche ${week.id}`, 'IDs müssen zur Woche und zum Inhaltstyp passen, z. B. w1-l1.');
    }
  }
  const library = hasLibrary ? validateSourceLibrary(value.library) : undefined;
  if (library && (weeks.length !== 12 || library.modules.some(module => !weeks.some(week => week.id === Number(module.id.slice(1)))))) {
    fail('library.modules', 'Ein Vollpaket benötigt die zwölf passenden Lernmodule mit IDs 1 bis 12.');
  }
  return { schemaVersion: 1, version: contentText(value.version, 'version', 100), reviewedAt: day(value.reviewedAt, 'reviewedAt'), title: contentText(value.title, 'title', 200), weeks, ...(library ? { library } : {}) };
}

export function nextLesson(weeks: Week[], progress: Progress): { week: Week; lesson: Lesson } | null {
  const completed = new Set(progress.completed);
  for (const week of weeks) {
    for (const lesson of week.lessons) {
      if (!completed.has(lesson.id)) return { week, lesson };
    }
  }
  return null;
}
