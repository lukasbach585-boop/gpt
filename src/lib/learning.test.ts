import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ContentPack, Flashcard } from '../types';
import sourceLibrary from '../data/source-library.json';
import { validateSourceLibrary } from './source-library';
import {
  addActivity, createProgress, dateKey, dueCards, getStreak, loadProgress,
  nextLesson, parseProgress, PROGRESS_STORAGE_KEY, saveProgress, scheduleReview,
  shuffle, validateContentPack,
} from './learning';

function validPack(): ContentPack {
  return {
    schemaVersion: 1, version: '2026.10', reviewedAt: '2026-10-07', title: 'KI im Unternehmen',
    weeks: [{
      id: 1, phase: 1, title: 'Grundlagen', subtitle: 'Verständnis vor Anwendung',
      outcomes: ['KI erklären können'],
      lessons: [{
        id: 'w1-l1', title: 'Was ist KI?', minutes: 8, summary: 'Eine Einführung.',
        concept: ['KI erkennt Muster.'], keyPoints: ['Ergebnisse prüfen.'],
        example: { title: 'Ein Unternehmen', text: 'Ein Team prüft einen Entwurf.' },
        privateUse: 'Urlaub planen.', exercise: 'Finde einen Anwendungsfall.', reflection: 'Welche Grenzen gelten?', visual: 'hierarchy',
      }],
      questions: [{ id: 'w1-q1', prompt: 'Was gilt?', options: ['Prüfen', 'Blind vertrauen'], correct: 0, explanation: 'Menschen prüfen Ergebnisse.' }],
      flashcards: [{ id: 'w1-f1', front: 'Was ist wichtig?', back: 'Ergebnisse prüfen.', week: 1 }],
      challenge: { title: 'Projektidee', scenario: 'Ein Team sucht Unterstützung.', task: 'Beschreibe eine Idee.', rubric: ['Ziel nennen'], sample: 'Entwürfe vorstrukturieren.' },
      resources: [{ title: 'KI-Verordnung', url: 'https://eur-lex.europa.eu/' }],
    }],
  };
}

function fullPack(): ContentPack {
  const pack = validPack();
  const template = pack.weeks[0];
  pack.weeks = Array.from({ length: 12 }, (_, index) => {
    const id = index + 1;
    const week = structuredClone(template);
    week.id = id;
    week.phase = id;
    week.lessons[0].id = `w${id}-l1`;
    week.questions[0].id = `w${id}-q1`;
    week.flashcards[0].id = `w${id}-f1`;
    week.flashcards[0].week = id;
    return week;
  });
  pack.library = structuredClone(sourceLibrary);
  return pack;
}

function storageMock() {
  const values = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => { values.set(key, value); }),
    removeItem: vi.fn((key: string) => { values.delete(key); }),
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Fortschrittsdaten', () => {
  it('starts with the library recommendation of six learning hours per week', () => {
    expect(createProgress().profile.goalMinutes).toBe(360);
    expect(parseProgress(createProgress()).profile.goalMinutes).toBe(360);
  });

  it('keeps the annual curriculum separate from any earlier twenty-week progress', () => {
    const storage = storageMock();
    const oldProgress = createProgress();
    oldProgress.completed = ['w1-l1'];
    storage.setItem('ki-kompass-progress-v1', JSON.stringify(oldProgress));
    vi.stubGlobal('localStorage', storage);
    expect(PROGRESS_STORAGE_KEY).toBe('ki-kompass-progress-annual-v1');
    expect(loadProgress().completed).toEqual([]);
    expect(saveProgress(createProgress())).toBe(true);
    expect(JSON.parse(storage.getItem('ki-kompass-progress-v1')!).completed).toEqual(['w1-l1']);
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY)!).completed).toEqual([]);
  });

  it('creates independent profiles and round-trips a complete progress backup', () => {
    const first = createProgress();
    first.completed.push('w1-l1');
    first.reviews['w1-f1'] = scheduleReview(undefined, 'good', new Date('2026-10-07T12:00:00Z'));
    first.notes.push({ id: 'note-1', title: 'Meine Idee', body: 'KI unterstützt die Planung.', week: 1, updated: '2026-10-07T12:00:00Z' });
    first.attempts.push({ id: 'exam-1', date: '2026-10-07T12:00:00Z', label: 'Woche 1', scope: 'week-1', correct: 2, total: 3, minutes: 4, wrongIds: ['w1-q2'] });
    first.practice['w1'] = { text: 'Ein erster Projektentwurf', checked: [0, 2] };
    const parsed = parseProgress(JSON.parse(JSON.stringify(first)));
    expect(parsed).toEqual(first);
    expect(parsed).not.toBe(first);
    expect(parsed.reviews).not.toBe(first.reviews);
    expect(createProgress().completed).toEqual([]);
  });

  it.each([
    ['negative minutes', (p: ReturnType<typeof createProgress>) => { p.profile.goalMinutes = -1; }],
    ['duplicate completions', (p: ReturnType<typeof createProgress>) => { p.completed = ['w1-l1', 'w1-l1']; }],
    ['invalid calendar date', (p: ReturnType<typeof createProgress>) => { p.profile.startDate = '2026-02-30'; }],
    ['unknown schema', (p: ReturnType<typeof createProgress>) => { (p as unknown as Record<string, unknown>).schemaVersion = 2; }],
    ['negative activity', (p: ReturnType<typeof createProgress>) => { p.activity['2026-10-07'] = -10; }],
    ['unknown property', (p: ReturnType<typeof createProgress>) => { (p as unknown as Record<string, unknown>).injected = 'bad'; }],
    ['overlarge text', (p: ReturnType<typeof createProgress>) => { p.profile.name = 'a'.repeat(101); }],
  ])('rejects %s instead of silently repairing an import', (_name, mutate) => {
    const progress = createProgress();
    mutate(progress);
    expect(() => parseProgress(progress)).toThrow();
  });

  it('rejects inconsistent results, nonfinite values and impossible review timestamps', () => {
    const progress = createProgress();
    progress.attempts = [{ id: 'attempt-1', date: '2026-10-07T12:00:00Z', label: 'Test', scope: 'week-1', correct: 1, total: 2, minutes: 3, wrongIds: [] }];
    expect(() => parseProgress(progress)).toThrow(/Fehlerliste/);
    progress.attempts = [];
    progress.activity['2026-10-07'] = NaN;
    expect(() => parseProgress(progress)).toThrow();
    progress.activity = {};
    progress.reviews['w1-f1'] = { due: '2026-02-30T12:00:00Z', interval: 1, ease: 2.5, repetitions: 1 };
    expect(() => parseProgress(progress)).toThrow(/Kalendertag/);
  });

  it('preserves large structured portfolio drafts while enforcing a 200,000-character cap', () => {
    const progress = createProgress();
    progress.practice['T01'] = { text: 'a'.repeat(120_000), checked: [0, 2] };
    expect(parseProgress(progress).practice['T01'].text).toHaveLength(120_000);
    progress.practice['T01'].text = 'a'.repeat(200_001);
    expect(() => parseProgress(progress)).toThrow(/200000/);
  });

  it('does not invoke injected getters or allow prototype pollution', () => {
    const progress = createProgress();
    const getter = vi.fn(() => 'secret');
    Object.defineProperty(progress, 'profile', { get: getter, enumerable: true });
    expect(() => parseProgress(progress)).toThrow(/Unsichere/);
    expect(getter).not.toHaveBeenCalled();
    const malicious = JSON.parse(JSON.stringify(createProgress()));
    malicious.reviews = JSON.parse('{"__proto__":{"polluted":true}}');
    expect(() => parseProgress(malicious)).toThrow(/Unsichere/);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('rejects cycles, object instances and unsupported nested values', () => {
    const progress = createProgress();
    (progress.practice as unknown as Record<string, unknown>).cycle = progress;
    expect(() => parseProgress(progress)).toThrow(/Zyklische/);
    expect(() => parseProgress(new Date())).toThrow(/JSON-Objekte/);
    expect(() => parseProgress({ ...createProgress(), lastLesson: undefined })).toThrow(/JSON-Daten/);
  });

  it('loads corrupt storage without erasing the original backup', () => {
    const storage = storageMock();
    storage.setItem(PROGRESS_STORAGE_KEY, '{broken');
    storage.setItem.mockClear();
    vi.stubGlobal('localStorage', storage);
    expect(loadProgress().completed).toEqual([]);
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBe('{broken');
    expect(storage.setItem).not.toHaveBeenCalled();
    expect(saveProgress(createProgress())).toBe(false);
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBe('{broken');
    expect(saveProgress(createProgress(), { replaceCorrupt: true })).toBe(true);
  });

  it('reports quota errors and never stores invalid progress', () => {
    const storage = storageMock();
    vi.stubGlobal('localStorage', storage);
    expect(saveProgress(createProgress())).toBe(true);
    const invalid = createProgress();
    invalid.completed.push('bad id');
    expect(saveProgress(invalid)).toBe(false);
    expect(storage.setItem).toHaveBeenCalledTimes(1);
    storage.setItem.mockImplementation(() => { throw new Error('QuotaExceededError'); });
    expect(saveProgress(createProgress())).toBe(false);
  });
});

describe('Lernrhythmus und Kalender', () => {
  it('uses the local calendar date rather than UTC date slices', () => {
    const localMidnight = new Date(2026, 9, 7, 0, 15);
    expect(dateKey(localMidnight)).toBe('2026-10-07');
    expect(dateKey(new Date(2026, 0, 2, 23, 45))).toBe('2026-01-02');
    expect(() => dateKey(new Date('invalid'))).toThrow();
  });

  it('accumulates minutes immutably and respects the daily upper bound', () => {
    const original = createProgress();
    const now = new Date(2026, 9, 7, 12);
    const first = addActivity(original, 10, now);
    const second = addActivity(first, 15, now);
    expect(original.activity).toEqual({});
    expect(second.activity['2026-10-07']).toBe(25);
    expect(addActivity(second, 1440, now).activity['2026-10-07']).toBe(1440);
    expect(() => addActivity(original, -1, now)).toThrow();
    expect(() => addActivity(original, Infinity, now)).toThrow();
  });

  it('keeps the streak from yesterday until today is completed, ignoring future days', () => {
    const now = new Date(2026, 9, 7, 16);
    expect(getStreak({ '2026-10-05': 5, '2026-10-06': 10, '2026-10-08': 10 }, now)).toBe(2);
    expect(getStreak({ '2026-10-05': 5, '2026-10-06': 0, '2026-10-07': 5 }, now)).toBe(1);
    expect(getStreak({ '2026-10-05': 5 }, now)).toBe(0);
  });

  it('counts calendar days over month, year, leap-day and DST boundaries', () => {
    expect(getStreak({ '2025-12-31': 1, '2026-01-01': 1 }, new Date(2026, 0, 1, 12))).toBe(2);
    expect(getStreak({ '2024-02-28': 1, '2024-02-29': 1, '2024-03-01': 1 }, new Date(2024, 2, 1, 12))).toBe(3);
    expect(getStreak({ '2026-03-28': 1, '2026-03-29': 1, '2026-03-30': 1 }, new Date(2026, 2, 30, 12))).toBe(3);
  });

  it('grows successful intervals, resets a lapse and preserves the supplied date', () => {
    const now = new Date('2026-10-07T12:00:00Z');
    const first = scheduleReview(undefined, 'good', now);
    const second = scheduleReview(first, 'good', now);
    const third = scheduleReview(second, 'good', now);
    expect([first.interval, second.interval, third.interval]).toEqual([1, 3, 8]);
    const failed = scheduleReview(third, 'again', now);
    expect(failed.interval).toBe(0);
    expect(failed.repetitions).toBe(0);
    expect(Date.parse(failed.due) - now.getTime()).toBe(10 * 60_000);
    expect(scheduleReview(failed, 'good', now).interval).toBe(1);
    expect(now.toISOString()).toBe('2026-10-07T12:00:00.000Z');
  });

  it('offers distinct hard and easy schedules and bounds ease and intervals', () => {
    const now = new Date('2026-10-07T12:00:00Z');
    expect(scheduleReview(undefined, 'hard', now).interval).toBe(1);
    expect(scheduleReview(undefined, 'easy', now).interval).toBe(4);
    const difficult = { due: now.toISOString(), interval: 2, ease: 1.3, repetitions: 3 };
    expect(scheduleReview(difficult, 'hard', now).ease).toBe(1.3);
    const long = { due: now.toISOString(), interval: 3650, ease: 5, repetitions: 100_000 };
    expect(scheduleReview(long, 'easy', now)).toMatchObject({ interval: 3650, ease: 5, repetitions: 100_000 });
  });

  it('adds calendar days while retaining the local hour across DST', () => {
    // Run this suite with TZ=Europe/Berlin too; local constructors exercise the host timezone.
    const beforeSpringChange = new Date(2026, 2, 28, 12, 30);
    const review = scheduleReview(undefined, 'good', beforeSpringChange);
    const due = new Date(review.due);
    expect(dateKey(due)).toBe('2026-03-29');
    expect(due.getHours()).toBe(12);
    expect(due.getMinutes()).toBe(30);
  });

  it('uses elapsed minutes for relearning during the repeated hour at DST end', () => {
    const beforeClockFallsBack = new Date('2026-10-25T00:55:00Z');
    const review = scheduleReview(undefined, 'again', beforeClockFallsBack);
    expect(Date.parse(review.due) - beforeClockFallsBack.getTime()).toBe(600_000);
  });

  it('shows week one initially and adds practiced weeks, sorting overdue reviews first', () => {
    const cards: Flashcard[] = [
      { id: 'w1-f1', front: '1', back: '1', week: 1 },
      { id: 'w2-f1', front: '2', back: '2', week: 2 },
      { id: 'w1-f2', front: '3', back: '3', week: 1 },
    ];
    const progress = createProgress();
    const now = new Date('2026-10-07T12:00:00Z');
    expect(dueCards(cards, progress, now).map(card => card.id)).toEqual(['w1-f1', 'w1-f2']);
    progress.completed = ['w2-l1'];
    progress.reviews['w2-f1'] = { due: '2026-10-06T12:00:00Z', interval: 1, ease: 2.5, repetitions: 1 };
    progress.reviews['w1-f2'] = { due: '2026-10-08T12:00:00Z', interval: 1, ease: 2.5, repetitions: 1 };
    expect(dueCards(cards, progress, now).map(card => card.id)).toEqual(['w2-f1', 'w1-f1']);
    expect(cards.map(card => card.id)).toEqual(['w1-f1', 'w2-f1', 'w1-f2']);
  });
});

describe('Updates und Lernpfad', () => {
  it('keeps the entire validated source library in a full update instead of dropping source metadata', () => {
    const pack = fullPack();
    const updated = validateContentPack(pack);
    expect(updated.library).toEqual(sourceLibrary);
    expect(updated.library?.resources).toHaveLength(69);
    expect(updated.library?.monthly_plan).toHaveLength(12);
    expect(updated.library).not.toBe(pack.library);
    expect(validateContentPack(validPack())).not.toHaveProperty('library');
  });

  it('rejects mismatched modules in a full update and missing library sections', () => {
    const pack = fullPack();
    pack.weeks.pop();
    expect(() => validateContentPack(pack)).toThrow(/zwölf/);
    const incomplete = fullPack();
    delete (incomplete.library as unknown as Record<string, unknown>).templates;
    expect(() => validateContentPack(incomplete)).toThrow(/Fehlende/);
  });

  it('accepts updated versions, twelve phases and week 48 without requiring exactly twelve modules', () => {
    const pack = validPack();
    pack.version = '2027.01-agenten-update';
    pack.reviewedAt = '2027-01-10';
    const lastModule = pack.weeks[0];
    lastModule.id = 48;
    lastModule.phase = 12;
    lastModule.lessons[0].id = 'w48-l1';
    lastModule.questions[0].id = 'w48-q1';
    lastModule.flashcards[0].id = 'w48-f1';
    lastModule.flashcards[0].week = 48;
    const validated = validateContentPack(pack);
    expect(validated.version).toBe('2027.01-agenten-update');
    expect(validated.weeks).toHaveLength(1);
    expect(validated.weeks[0]).toMatchObject({ id: 48, phase: 12 });
  });

  it('validates the entire pack and produces a detached copy', () => {
    const pack = validPack();
    const validated = validateContentPack(pack);
    expect(validated).toEqual(pack);
    validated.weeks[0].lessons[0].title = 'Changed';
    expect(pack.weeks[0].lessons[0].title).toBe('Was ist KI?');
  });

  it.each([
    ['HTML', (p: ContentPack) => { p.weeks[0].lessons[0].summary = '<img src=x onerror=alert(1)>'; }],
    ['script URL', (p: ContentPack) => { p.weeks[0].resources[0].url = 'javascript:alert(1)'; }],
    ['HTTP URL', (p: ContentPack) => { p.weeks[0].resources[0].url = 'http://example.com'; }],
    ['URL credentials', (p: ContentPack) => { p.weeks[0].resources[0].url = 'https://user:pass@example.com'; }],
    ['wrong answer index', (p: ContentPack) => { p.weeks[0].questions[0].correct = 2; }],
    ['duplicate options', (p: ContentPack) => { p.weeks[0].questions[0].options = ['Same', 'Same']; }],
    ['empty lessons', (p: ContentPack) => { p.weeks[0].lessons = []; }],
    ['invalid visual', (p: ContentPack) => { (p.weeks[0].lessons[0] as unknown as Record<string, unknown>).visual = 'script'; }],
    ['wrong card week', (p: ContentPack) => { p.weeks[0].flashcards[0].week = 2; }],
    ['wrong lesson ID', (p: ContentPack) => { p.weeks[0].lessons[0].id = 'w2-l1'; }],
    ['invalid review date', (p: ContentPack) => { p.reviewedAt = '2026-02-30'; }],
    ['unsupported phase', (p: ContentPack) => { p.weeks[0].phase = 13; }],
    ['excessive array', (p: ContentPack) => { p.weeks[0].challenge.rubric = Array(31).fill('x'); }],
  ])('rejects malicious or inconsistent %s', (_name, mutate) => {
    const pack = validPack();
    mutate(pack);
    expect(() => validateContentPack(pack)).toThrow();
  });

  it('rejects duplicate global IDs and prototype pollution inside resources', () => {
    const pack = validPack();
    pack.weeks[0].lessons.push({ ...pack.weeks[0].lessons[0] });
    expect(() => validateContentPack(pack)).toThrow(/Doppelte/);
    const poisoned = JSON.parse(JSON.stringify(validPack()));
    poisoned.weeks[0].resources[0] = JSON.parse('{"title":"Link","url":"https://example.com","__proto__":{"polluted":true}}');
    expect(() => validateContentPack(poisoned)).toThrow(/Unsichere/);
  });

  it('returns the first incomplete lesson or null when all lessons are complete', () => {
    const pack = validPack();
    pack.weeks[0].lessons.push({ ...pack.weeks[0].lessons[0], id: 'w1-l2' });
    const progress = createProgress();
    expect(nextLesson(pack.weeks, progress)?.lesson.id).toBe('w1-l1');
    progress.completed = ['w1-l1'];
    expect(nextLesson(pack.weeks, progress)?.lesson.id).toBe('w1-l2');
    progress.completed.push('w1-l2');
    expect(nextLesson(pack.weeks, progress)).toBeNull();
    expect(nextLesson([], progress)).toBeNull();
  });

  it('shuffles without mutation, duplication or missing elements', () => {
    const original = [1, 2, 3, 4, 5];
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const shuffled = shuffle(original);
    expect(shuffled).not.toEqual(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
    expect([...shuffled].sort()).toEqual(original);
    expect(shuffle([])).toEqual([]);
  });
});

describe('Quellenbibliothek Schema 1.0', () => {
  it('validates the uploaded library and detaches all nested data', () => {
    const parsed = validateSourceLibrary(sourceLibrary);
    expect(parsed).toEqual(sourceLibrary);
    expect(parsed.resources[0]).not.toBe(sourceLibrary.resources[0]);
    parsed.modules[0].lessons[0][0] = 'Unabhängige Kopie';
    expect(sourceLibrary.modules[0].lessons[0][0]).toBe('Begriffe und Aufgaben');
  });

  it.each([
    ['unknown schema', (raw: typeof sourceLibrary) => { raw.schema_version = '2.0'; }],
    ['missing module', (raw: typeof sourceLibrary) => { raw.modules.pop(); }],
    ['missing month', (raw: typeof sourceLibrary) => { raw.monthly_plan.pop(); }],
    ['duplicate source ID', (raw: typeof sourceLibrary) => { raw.resources[1].id = raw.resources[0].id; }],
    ['invalid module reference', (raw: typeof sourceLibrary) => { raw.resources[0].module_id = 'M99'; }],
    ['invalid source reference', (raw: typeof sourceLibrary) => { raw.modules[0].source_ids[0] = 'Q99'; }],
    ['invalid month reference', (raw: typeof sourceLibrary) => { raw.monthly_plan[0].source_ids[0] = 'Q99'; }],
    ['invalid core reference', (raw: typeof sourceLibrary) => { raw.modules[0].recommended_core_sources[0] = 'Q99'; }],
    ['unsafe resource URL', (raw: typeof sourceLibrary) => { raw.resources[0].url = 'javascript:alert(1)'; }],
    ['unsafe evidence URL', (raw: typeof sourceLibrary) => { raw.resources[0].evidence_url = 'http://example.com'; }],
    ['incomplete template tuple', (raw: typeof sourceLibrary) => { raw.templates[0].fields[0].pop(); }],
    ['impossible source date', (raw: typeof sourceLibrary) => { raw.resources[0].verified_on = '2026-02-30'; }],
    ['invalid budget', (raw: typeof sourceLibrary) => { raw.monthly_plan[0].theory_hours = 600; }],
    ['executable glossary', (raw: typeof sourceLibrary) => { raw.glossary[0].definition = '<svg onload=alert(1)>'; }],
  ])('rejects %s', (_name, mutate) => {
    const raw = structuredClone(sourceLibrary);
    mutate(raw);
    expect(() => validateSourceLibrary(raw)).toThrow();
  });

  it('rejects oversized catalogs and malicious nested properties', () => {
    const raw = structuredClone(sourceLibrary);
    raw.resources = Array.from({ length: 501 }, () => structuredClone(sourceLibrary.resources[0]));
    expect(() => validateSourceLibrary(raw)).toThrow(/500/);
    const malicious = structuredClone(sourceLibrary);
    (malicious.capstone as unknown as Record<string, unknown>).injected = JSON.parse('{"__proto__":{"polluted":true}}');
    expect(() => validateSourceLibrary(malicious)).toThrow(/Unsichere/);
  });
});
