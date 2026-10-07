import sourceShape from '../data/source-library.json';
import type { SourceLibrary } from '../types';

const forbidden = new Set(['__proto__', 'constructor', 'prototype']);

function invalid(path: string, detail: string): never {
  throw new Error(`${path}: ${detail}`);
}

function safeJson(raw: unknown): void {
  let nodes = 0;
  let size = 0;
  const seen = new WeakSet<object>();
  function walk(value: unknown, depth: number): void {
    if (++nodes > 100_000 || depth > 16) invalid('Bibliothek', 'Datenstruktur zu groß oder zu tief.');
    if (typeof value === 'string') size += value.length * 2;
    else if (value === null || typeof value === 'boolean') size += 8;
    else if (typeof value === 'number') {
      if (!Number.isFinite(value)) invalid('Bibliothek', 'Ungültige Zahl.');
      size += 16;
    } else if (typeof value === 'object') {
      const prototype = Object.getPrototypeOf(value);
      if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) invalid('Bibliothek', 'Nur JSON-Objekte erlaubt.');
      if (seen.has(value)) invalid('Bibliothek', 'Zyklische Daten.');
      seen.add(value);
      if (Object.getOwnPropertySymbols(value).length) invalid('Bibliothek', 'Ungültige Eigenschaften.');
      for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
        if (Array.isArray(value) && key === 'length') continue;
        if (forbidden.has(key) || !('value' in descriptor)) invalid('Bibliothek', 'Unsichere Eigenschaft.');
        size += key.length * 2;
        walk(descriptor.value, depth + 1);
      }
      seen.delete(value);
    } else invalid('Bibliothek', 'Nur JSON-Daten erlaubt.');
    if (size > 8_000_000) invalid('Bibliothek', 'Datei überschreitet die erlaubte Größe.');
  }
  walk(raw, 0);
}

function text(value: unknown, path: string): string {
  const allowEmpty = /^library\.resources\[\d+\]\.access_note$/.test(path);
  if (typeof value !== 'string' || (!allowEmpty && !value.trim()) || value.length > 20_000) invalid(path, 'Text mit maximal 20.000 Zeichen erwartet.');
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value) || /<\/?\s*[a-z!][^>]*>/i.test(value) || /(?:javascript|vbscript)\s*:/i.test(value) || /data\s*:[\w.+/-]+[;,]/i.test(value)) {
    invalid(path, 'Steuerzeichen, HTML oder ausführbare Inhalte nicht erlaubt.');
  }
  return value;
}

function bounds(value: number, path: string, min: number, max: number, integer = false): void {
  if (!Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) invalid(path, `Zahl zwischen ${min} und ${max} erwartet.`);
}

function calendarDay(value: string, path: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) invalid(path, 'Datum als JJJJ-MM-TT erwartet.');
  const date = new Date(`${value}T12:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) invalid(path, 'Ungültiger Kalendertag.');
}

function https(value: string, path: string): void {
  let url: URL;
  try { url = new URL(value); } catch { invalid(path, 'Ungültiger Link.'); }
  if (url.protocol !== 'https:' || url.username || url.password || /[\s\\]/.test(value) || value.length > 2000) invalid(path, 'Nur HTTPS-Links ohne Zugangsdaten erlaubt.');
}

function listLimits(path: string): [number, number] {
  if (path === 'library.modules' || path === 'library.monthly_plan') return [12, 12];
  if (path === 'library.resources') return [1, 500];
  if (path === 'library.templates') return [1, 50];
  if (path === 'library.glossary') return [1, 300];
  if (path === 'library.practice_test_cases') return [1, 500];
  if (path === 'library.start_30_days') return [4, 4];
  if (path.endsWith('.source_ids')) return [1, 500];
  if (path.endsWith('.module_ids')) return [1, 12];
  if (path.endsWith('.recommended_deep_sources')) return [0, 500];
  if (path.endsWith('.recommended_core_sources')) return [1, 500];
  return [1, 50];
}

/** The shipped schema is the structure contract; imported values never supply their own schema. */
function shape(value: unknown, sample: unknown, path: string): unknown {
  if (path.endsWith('.provider_duration')) return value === null ? null : text(value, path);
  if (typeof sample === 'string') return text(value, path);
  if (typeof sample === 'number') {
    if (typeof value !== 'number') invalid(path, 'Zahl erwartet.');
    bounds(value, path, 0, 20_000);
    return value;
  }
  if (Array.isArray(sample)) {
    if (!Array.isArray(value)) invalid(path, 'Liste erwartet.');
    const tuple = /\.(?:lessons|fields)\[\d+\]$/.test(path);
    const [min, max] = tuple ? [2, 2] : listLimits(path);
    if (value.length < min || value.length > max) invalid(path, `${min} bis ${max} Einträge erwartet.`);
    return value.map((entry, index) => shape(entry, sample[0], `${path}[${index}]`));
  }
  if (!value || typeof value !== 'object' || Array.isArray(value) || !sample || typeof sample !== 'object') invalid(path, 'Objekt erwartet.');
  const expected = Object.entries(sample);
  const source = value as Record<string, unknown>;
  const actual = Object.keys(source);
  if (actual.length !== expected.length || actual.some(key => !Object.hasOwn(sample, key))) invalid(path, 'Fehlende oder unbekannte Felder.');
  return Object.fromEntries(expected.map(([key, model]) => [key, shape(source[key], model, `${path}.${key}`)]));
}

function unique(values: (string | number)[], path: string): void {
  if (new Set(values).size !== values.length) invalid(path, 'Doppelte IDs oder Einträge.');
}

function references(ids: string[], known: Set<string>, path: string): void {
  unique(ids, path);
  if (ids.some(id => !known.has(id))) invalid(path, 'Verweis auf eine unbekannte ID.');
}

export function validateSourceLibrary(raw: unknown): SourceLibrary {
  safeJson(raw);
  const library = shape(raw, sourceShape, 'library') as SourceLibrary;
  if (library.schema_version !== '1.0') invalid('library.schema_version', 'Nur Schema 1.0 wird unterstützt.');
  if (library.document.language !== 'de-DE') invalid('library.document.language', 'Die Lernbibliothek muss deutschsprachig sein.');
  calendarDay(library.document.created_on, 'library.document.created_on');

  const moduleIds = new Set(library.modules.map(module => module.id));
  unique(library.modules.map(module => module.id), 'library.modules.id');
  for (let id = 1; id <= 12; id++) {
    if (!moduleIds.has(`M${String(id).padStart(2, '0')}`)) invalid('library.modules', 'Module M01 bis M12 werden vollständig benötigt.');
  }
  const sourceIds = new Set(library.resources.map(resource => resource.id));
  unique(library.resources.map(resource => resource.id), 'library.resources.id');
  const resources = new Map(library.resources.map(resource => [resource.id, resource]));
  for (const resource of library.resources) {
    if (!/^Q(?:0[1-9]|[1-9]\d{1,2})$/.test(resource.id) || Number(resource.id.slice(1)) > 500) invalid(`Quelle ${resource.id}`, 'ID Q01 bis Q500 erwartet.');
    if (!moduleIds.has(resource.module_id)) invalid(`Quelle ${resource.id}`, 'Unbekanntes Modul.');
    if (!['Kern', 'Vertiefung', 'Optional'].includes(resource.priority)) invalid(`Quelle ${resource.id}`, 'Unbekannte Quellenpriorität.');
    bounds(resource.selection_budget_hours, `Quelle ${resource.id}.selection_budget_hours`, 0, 1000);
    calendarDay(resource.verified_on, `Quelle ${resource.id}.verified_on`);
    https(resource.url, `Quelle ${resource.id}.url`);
    https(resource.evidence_url, `Quelle ${resource.id}.evidence_url`);
  }
  for (const module of library.modules) {
    references(module.source_ids, sourceIds, `${module.id}.source_ids`);
    // The source library deliberately recommends some references across module boundaries.
    references(module.recommended_core_sources, sourceIds, `${module.id}.recommended_core_sources`);
    references(module.recommended_deep_sources, sourceIds, `${module.id}.recommended_deep_sources`);
    if (module.source_ids.some(id => resources.get(id)?.module_id !== module.id)) invalid(module.id, 'Quelle gehört zu einem anderen Modul.');
  }
  for (const resource of library.resources) {
    if (!library.modules.find(module => module.id === resource.module_id)?.source_ids.includes(resource.id)) invalid(resource.id, 'Quelle fehlt im Quellenverzeichnis ihres Moduls.');
  }
  unique(library.monthly_plan.map(month => month.month), 'library.monthly_plan.month');
  for (const month of library.monthly_plan) {
    bounds(month.month, 'library.monthly_plan.month', 1, 12, true);
    references(month.module_ids, moduleIds, `Monat ${month.month}.module_ids`);
    references(month.source_ids, sourceIds, `Monat ${month.month}.source_ids`);
    for (const field of ['theory_hours', 'practice_hours', 'review_hours'] as const) bounds(month[field], `Monat ${month.month}.${field}`, 0, 744);
  }
  const plannedModules = new Set(library.monthly_plan.flatMap(month => month.module_ids));
  if (library.modules.some(module => !plannedModules.has(module.id))) invalid('library.monthly_plan', 'Der Jahresplan muss alle zwölf Module berücksichtigen.');
  unique(library.templates.map(template => template.id), 'library.templates.id');
  if (library.templates.some(template => !/^T(?:0[1-9]|[1-9]\d)$/.test(template.id))) invalid('library.templates.id', 'ID T01 bis T99 erwartet.');
  unique(library.glossary.map(entry => entry.term.trim().toLocaleLowerCase('de-DE')), 'library.glossary.term');
  unique(library.practice_test_cases.map(test => test.id), 'library.practice_test_cases.id');
  if (library.practice_test_cases.some(test => !/^F(?:0[1-9]|[1-9]\d{1,2})$/.test(test.id))) invalid('library.practice_test_cases.id', 'ID F01 bis F999 erwartet.');
  if (library.practice_test_cases.some(test => !['Kritisch', 'Hoch', 'Mittel', 'Niedrig'].includes(test.severity))) invalid('library.practice_test_cases.severity', 'Unbekannte Fehlerpriorität.');
  unique(library.start_30_days.map(week => week.week), 'library.start_30_days.week');
  for (const week of library.start_30_days) bounds(week.week, 'library.start_30_days.week', 1, 4, true);

  const assumptions = library.study_assumptions;
  bounds(assumptions.weekly_hours, 'study_assumptions.weekly_hours', 1, 168);
  bounds(assumptions.planned_weeks, 'study_assumptions.planned_weeks', 1, 104, true);
  bounds(assumptions.annual_buffer_weeks, 'study_assumptions.annual_buffer_weeks', 0, 52, true);
  bounds(assumptions.planned_hours, 'study_assumptions.planned_hours', 1, 17_472);
  bounds(assumptions.buffer_hours, 'study_assumptions.buffer_hours', 0, 8736);
  for (const field of ['monthly_theory_hours', 'monthly_practice_hours', 'monthly_review_hours'] as const) bounds(assumptions[field], `study_assumptions.${field}`, 0, 744);
  if (Math.abs(assumptions.planned_hours - assumptions.weekly_hours * assumptions.planned_weeks) > 0.001 || Math.abs(assumptions.buffer_hours - assumptions.weekly_hours * assumptions.annual_buffer_weeks) > 0.001) invalid('study_assumptions', 'Stundenbudgets stimmen nicht mit dem Wochenplan überein.');
  const planned = library.monthly_plan.reduce((sum, month) => sum + month.theory_hours + month.practice_hours + month.review_hours, 0);
  if (Math.abs(planned - assumptions.planned_hours) > 0.001) invalid('monthly_plan', 'Monatsbudgets stimmen nicht mit dem Gesamtbudget überein.');
  return library;
}
