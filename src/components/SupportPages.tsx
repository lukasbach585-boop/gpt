import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  Check, Download, ExternalLink, FileText, NotebookPen, Plus,
  RefreshCw, Search, ShieldCheck, Smartphone, Trash2, Upload, WifiOff, X,
} from 'lucide-react';
import { useLearning } from '../context';
import { methods } from '../data/catalog';
import originalLibrary from '../data/source-library.json';
import { createProgress, parseProgress, validateContentPack } from '../lib/learning';
import type { ContentPack, Note, Progress } from '../types';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const APP_BASE_URL = import.meta.env.BASE_URL;
const BACKUP_FORMAT = 'ki-kompass-backup';
const BACKUP_CURRICULUM = 'ki-management-annual-2026';

function displayDate(value: string): string {
  const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function downloadJson(value: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function readJson(file: File): Promise<unknown> {
  if (file.size > MAX_FILE_BYTES) throw new Error('Die Datei ist zu groß. Bitte wähle eine JSON-Datei mit höchstens 5 MB.');
  try {
    return JSON.parse(await file.text()) as unknown;
  } catch {
    throw new Error('Die Datei enthält kein gültiges JSON. Bitte verwende eine exportierte JSON-Datei.');
  }
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : 'Die Datei konnte nicht gelesen werden.';
}

function parseBackup(raw: unknown): Progress {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Bitte wähle eine KI-Kompass-Fortschrittssicherung für den aktuellen Jahreslernplan.');
  const value = raw as Record<string, unknown>;
  if (value.format !== BACKUP_FORMAT || value.curriculum !== BACKUP_CURRICULUM) throw new Error('Diese Datei ist keine Sicherung für den aktuellen KI-Management-Jahreslernplan. Frühere 20-Wochen-Sicherungen und reine Fortschrittsdateien werden nicht übernommen, damit unterschiedliche Lerninhalte nicht falsch zugeordnet werden.');
  const keys = Object.keys(value);
  if (value.schemaVersion !== 1 || keys.length !== 4 || keys.some(key => !['format', 'curriculum', 'schemaVersion', 'progress'].includes(key))) throw new Error('Die Sicherung hat ein unbekanntes oder unvollständiges Format. Bitte verwende eine in dieser App exportierte Fortschrittssicherung.');
  return parseProgress(value.progress);
}

export function NotesPage() {
  const { progress, content, updateProgress, notify } = useLearning();
  const [activeId, setActiveId] = useState<string | null>(progress.notes[0]?.id ?? null);
  const [query, setQuery] = useState('');
  const [weekFilter, setWeekFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const active = progress.notes.find(note => note.id === activeId);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('de');
    return progress.notes
      .filter(note => weekFilter === 'all' || note.week === Number(weekFilter))
      .filter(note => `${note.title} ${note.body}`.toLocaleLowerCase('de').includes(term))
      .sort((a, b) => b.updated.localeCompare(a.updated));
  }, [progress.notes, query, weekFilter]);

  function newNote() {
    if (progress.notes.length >= 500) {
      notify('Du hast 500 Notizen erreicht. Sichere sie als JSON und lösche eine Notiz, bevor du eine neue anlegst.');
      return;
    }
    const note: Note = {
      id: `note-${crypto.randomUUID()}`,
      title: '', body: '',
      week: weekFilter === 'all' ? 1 : Number(weekFilter),
      updated: new Date().toISOString(),
    };
    if (!updateProgress(current => ({ ...current, notes: [note, ...current.notes] }))) return;
    setActiveId(note.id);
    setDeleteId(null);
    setQuery('');
  }

  function editNote(changes: Partial<Pick<Note, 'title' | 'body' | 'week'>>) {
    if (!active) return;
    updateProgress(current => ({
      ...current,
      notes: current.notes.map(note => note.id === active.id ? { ...note, ...changes, updated: new Date().toISOString() } : note),
    }));
  }

  function removeNote() {
    if (!active || deleteId !== active.id) return;
    if (!updateProgress(current => ({ ...current, notes: current.notes.filter(note => note.id !== active.id) }))) return;
    setActiveId(null);
    setDeleteId(null);
    notify('Notiz gelöscht.');
  }

  return (
    <div className="support-page">
      <header className="page-heading">
        <div><p className="eyebrow">DEIN WISSEN, IN DEINEN WORTEN</p><h1>Lernnotizen</h1><p className="page-description">Gedanken festhalten, Begriffe erklären und Ideen für deinen Arbeitsalltag sammeln.</p></div>
        <button className="btn btn-primary" onClick={newNote}><Plus size={18} aria-hidden="true" /> Neue Notiz</button>
      </header>
      <div className="notes-grid">
        <section className="card note-list" aria-label="Deine Notizen">
          <label className="field" htmlFor="note-search"><span>Notizen durchsuchen</span><div className="search-field"><Search size={17} aria-hidden="true" /><input id="note-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Titel oder Inhalt …" /></div></label>
          <label className="field" htmlFor="note-week-filter"><span>Modul filtern</span><select id="note-week-filter" value={weekFilter} onChange={event => setWeekFilter(event.target.value)}><option value="all">Alle Module</option>{content.weeks.map(week => <option key={week.id} value={week.id}>Modul {week.id} · {week.title}</option>)}</select></label>
          <p className="muted note-count">{filtered.length} {filtered.length === 1 ? 'Notiz' : 'Notizen'}</p>
          <div className="note-list-items">
            {filtered.map(note => <button className={`note-item ${note.id === activeId ? 'active' : ''}`} key={note.id} aria-pressed={note.id === activeId} onClick={() => { setActiveId(note.id); setDeleteId(null); }}><span className="note-item-title">{note.title.trim() || 'Unbenannte Notiz'}</span><span className="muted">Modul {note.week} · {displayDate(note.updated)}</span><span className="note-item-preview">{note.body.trim() || 'Hier ist Platz für deine Gedanken.'}</span></button>)}
            {filtered.length === 0 && <div className="empty-state"><NotebookPen size={28} aria-hidden="true" /><h3>{progress.notes.length ? 'Keine passenden Notizen' : 'Dein Lernjournal beginnt hier'}</h3><p>{progress.notes.length ? 'Ändere die Suche oder den Modulfilter.' : 'Schreib nach jeder Einheit einen Gedanken in deinen eigenen Worten auf.'}</p>{!progress.notes.length && <button className="btn btn-secondary" onClick={newNote}>Erste Notiz erstellen</button>}</div>}
          </div>
        </section>
        <section className="card note-editor" aria-label="Notiz bearbeiten">
          {active ? <>
            <div className="section-heading"><span className="badge"><NotebookPen size={13} aria-hidden="true" /> Lokales Lernjournal</span><button className="btn btn-ghost" onClick={() => setDeleteId(deleteId === active.id ? null : active.id)} aria-label="Diese Notiz löschen"><Trash2 size={17} aria-hidden="true" /> Löschen</button></div>
            {deleteId === active.id && <div className="callout callout-warning" role="alert"><p>Diese Notiz endgültig löschen?</p><div className="button-row"><button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Behalten</button><button className="btn btn-danger" onClick={removeNote}>Notiz löschen</button></div></div>}
            <label className="field" htmlFor="note-title"><span>Titel</span><input id="note-title" value={active.title} onChange={event => editNote({ title: event.target.value })} placeholder="Mein Aha-Moment …" maxLength={200} /></label>
            <label className="field" htmlFor="note-week"><span>Zu welchem Modul gehört diese Notiz?</span><select id="note-week" value={active.week} onChange={event => editNote({ week: Number(event.target.value) })}>{!content.weeks.some(week => week.id === active.week) && <option value={active.week}>Bisherige Einheit {active.week} · nicht im aktiven Paket</option>}{content.weeks.map(week => <option key={week.id} value={week.id}>Modul {week.id} · {week.title}</option>)}</select></label>
            <label className="field" htmlFor="note-body"><span>Deine Gedanken</span><textarea id="note-body" rows={13} value={active.body} onChange={event => editNote({ body: event.target.value })} maxLength={20000} placeholder="Was habe ich verstanden? Wie würde ich es jemandem erklären? Wo kann ich es anwenden?" /><small className="muted">{active.body.length.toLocaleString('de-DE')} / 20.000 Zeichen</small></label>
            <p className="muted">Änderungen werden automatisch in diesem Browser gespeichert. Sichere deine Notizen zusammen mit deinem Fortschritt in den Einstellungen.</p>
          </> : <div className="empty-state note-editor-empty"><NotebookPen size={38} aria-hidden="true" /><h2>Platz für deine Erkenntnisse</h2><p>Wähle eine Notiz aus oder beginne mit einem neuen Gedanken.</p><button className="btn btn-primary" onClick={newNote}><Plus size={17} aria-hidden="true" /> Neue Notiz</button></div>}
        </section>
      </div>
    </div>
  );
}

export function LibraryPage() {
  const { content, progress, replaceContent, resetContent } = useLearning();
  const library = content.library ?? originalLibrary;
  const legacyLibrary = !content.library;
  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [pendingPack, setPendingPack] = useState<ContentPack | null>(null);
  const [error, setError] = useState('');
  const [resetConfirm, setResetConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const resources = useMemo(() => {
    const term = query.toLocaleLowerCase('de').trim();
    return library.resources.filter(resource =>
      (moduleFilter === 'all' || resource.module_id === moduleFilter) &&
      (priorityFilter === 'all' || resource.priority === priorityFilter) &&
      (languageFilter === 'all' || resource.language === languageFilter) &&
      `${resource.id} ${resource.title} ${resource.provider} ${resource.summary} ${resource.selected_scope}`.toLocaleLowerCase('de').includes(term));
  }, [library.resources, query, moduleFilter, priorityFilter, languageFilter]);
  const languages = [...new Set(library.resources.map(resource => resource.language))].sort((a, b) => a.localeCompare(b, 'de'));
  const certificates = library.resources.filter(resource => resource.format.toLocaleLowerCase('de').includes('zertifikat'));

  async function importPack(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    setError('');
    setPendingPack(null);
    setResetConfirm(false);
    setLoading(true);
    try {
      const pack = validateContentPack(await readJson(file));
      if (!pack.library || pack.weeks.length !== 12) throw new Error('Bitte importiere ein vollständiges App-Inhalts-Paket mit 12 Modulen und Quellenkatalog. Die Originalbibliothek allein und frühere 20-Wochen-Pakete sind keine aktuellen App-Pakete.');
      setPendingPack(pack);
    }
    catch (problem) { setError(errorText(problem)); }
    finally { setLoading(false); }
  }

  const pendingLessonIds = new Set(pendingPack?.weeks.flatMap(week => week.lessons.map(lesson => lesson.id)) ?? []);
  const retainedLessons = progress.completed.filter(id => pendingLessonIds.has(id)).length;
  const plan = library.study_assumptions;

  return (
    <div className="support-page">
      <header className="page-heading"><div><p className="eyebrow">WISSEN VERTIEFEN & AKTUELL HALTEN</p><h1>Bibliothek</h1><p className="page-description">Eine Auswahlbibliothek für deinen Weg zum KI-Manager mit nachprüfbaren Quellen, Praxis und einem Jahresplan.</p></div><span className="badge">{library.modules.length} Module · {library.resources.length} Quellen</span></header>
      <section className="card source-card">
        <div className="source-icon"><FileText size={26} aria-hidden="true" /></div><div><p className="eyebrow">DEINE NEUE GRUNDLAGE</p><h2>{library.document.title}</h2><p>{library.document.subtitle}. Die bereitgestellte strukturierte Lernbibliothek verbindet Unternehmenspraxis, technische Referenzen und überprüfbare Projektarbeit.</p><p className="muted">Originaldateien bereitgestellt am {displayDate(originalLibrary.document.created_on)} · XLSX und JSON</p></div><div className="button-row"><a className="btn btn-secondary" href={`${APP_BASE_URL}lernplan-original.xlsx`} download><Download size={17} aria-hidden="true" /> Original-XLSX</a><a className="btn btn-secondary" href={`${APP_BASE_URL}lernbibliothek-original.json`} download><Download size={17} aria-hidden="true" /> Original-JSON</a></div>
      </section>
      <div className="card content-meta"><span><strong>{library.modules.length} Module</strong> mit Lernen, Transfer und Portfolio</span><span><strong>{plan.planned_weeks} Lernwochen</strong> bei {plan.weekly_hours} Stunden pro Woche</span><span><strong>{plan.planned_hours} Stunden</strong> plus {plan.buffer_hours} Stunden Puffer</span></div>
      <p className="muted">{plan.scope} Die Originaldateien dienen als Nachschlagewerk; für die App-Aktualisierung benötigst du ein vollständiges App-Inhalts-Paket.</p>
      {legacyLibrary && <div className="callout callout-warning" role="status"><h3>Bisheriges Lernpaket aktiv</h3><p>Dein aktives Paket enthält noch keinen neuen Quellenkatalog. Hier wird deshalb die bereitgestellte Originalbibliothek separat angezeigt. Sie ist noch nicht mit deinem bisherigen Lernpfad verknüpft. Über „Mitgelieferte Inhalte wiederherstellen“ wechselst du bewusst zum neuen Modulpfad; bisherige Fortschrittsdaten bleiben gespeichert, eine automatische Zuordnung gibt es nicht.</p></div>}

      <section className="library-section" aria-labelledby="resource-heading">
        <div className="section-heading"><div><h2 id="resource-heading">Zum Nachlesen & Ausprobieren</h2><p className="muted">Wähle gezielte Abschnitte, statt sämtliche Kurse vollständig zu absolvieren.</p></div><span className="badge">{resources.length} von {library.resources.length} Quellen</span></div>
        <div className="form-grid resource-filters">
          <label className="field" htmlFor="resource-search"><span>Quellen durchsuchen</span><div className="search-field"><Search size={17} aria-hidden="true" /><input type="search" id="resource-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Thema, Anbieter oder Quellen-ID …" /></div></label>
          <label className="field" htmlFor="resource-module"><span>Modul</span><select id="resource-module" value={moduleFilter} onChange={event => setModuleFilter(event.target.value)}><option value="all">Alle Module</option>{library.modules.map(module => <option key={module.id} value={module.id}>{module.id} · {module.title}</option>)}</select></label>
          <label className="field" htmlFor="resource-priority"><span>Priorität</span><select id="resource-priority" value={priorityFilter} onChange={event => setPriorityFilter(event.target.value)}><option value="all">Alle Prioritäten</option><option value="Kern">Kern</option><option value="Vertiefung">Vertiefung</option><option value="Optional">Optional</option></select></label>
          <label className="field" htmlFor="resource-language"><span>Sprache</span><select id="resource-language" value={languageFilter} onChange={event => setLanguageFilter(event.target.value)}><option value="all">Alle Sprachen</option>{languages.map(language => <option key={language} value={language}>{language}</option>)}</select></label>
        </div>
        <div className="callout"><p><strong>So sind die Quellen einzuordnen:</strong> „Kern“ bezeichnet eine empfohlene Haupt- oder Ersatzquelle, keine Pflichtlektüre. Zeitbudgets sind eigene Schätzungen der Bibliothek für ausgewählte Abschnitte; Anbieterangaben stehen separat.</p><p className="muted">Die Datums- und Prüfvermerke wurden aus der bereitgestellten Bibliothek übernommen. Die App hat diese Links nicht erneut geprüft und absolviert keine externen Kurse. Zugriff, Preise und aktuelle Fachstände prüfst du beim Anbieter.</p></div>
        <div className="resource-grid">{resources.map(resource => <article className="card resource-card" key={resource.id}>
          <div className="section-heading"><span className="badge">{resource.id} · {resource.module_id}</span><span className="badge">{resource.priority}</span></div>
          <h3>{resource.title}</h3><p className="muted">{resource.provider} · {resource.language}</p><p>{resource.summary}</p>
          <dl className="resource-details">
            <div><dt>Deine Auswahl</dt><dd>{resource.selected_scope}</dd></div>
            <div><dt>Zeitbudget der Bibliothek</dt><dd>{resource.selection_budget_hours.toLocaleString('de-DE')} Stunden · eigene Schätzung</dd></div>
            {resource.provider_duration && <div><dt>Anbieterangabe zur Dauer</dt><dd>{resource.provider_duration}</dd></div>}
            <div><dt>Zugang</dt><dd>{resource.access_model}. {resource.access_note}</dd></div>
          </dl>
          <details className="resource-more"><summary>Lernziel, Transfer & Voraussetzungen</summary><p><strong>Lernziel:</strong> {resource.learning_outcome}</p><p><strong>Praxis:</strong> {resource.practice_transfer}</p><p><strong>Voraussetzung:</strong> {resource.recommended_prerequisites}</p><p><strong>Leistungsnachweis:</strong> {resource.credential}</p><p className="muted">{resource.selection_budget_basis}</p></details>
          <div className="resource-verification"><p className="muted"><strong>Prüfvermerk der Bibliothek:</strong> {displayDate(resource.verified_on)}<br />{resource.verification_method}</p><p className="muted"><strong>Anbieterstand:</strong> {resource.provider_version}</p></div>
          <div className="button-row"><a className="btn btn-secondary" href={resource.url} target="_blank" rel="noopener noreferrer">Quelle öffnen <ExternalLink size={15} aria-hidden="true" /></a>{resource.evidence_url !== resource.url && <a className="btn btn-ghost" href={resource.evidence_url} target="_blank" rel="noopener noreferrer">Belegseite <ExternalLink size={14} aria-hidden="true" /></a>}</div>
        </article>)}</div>
        {!resources.length && <div className="card empty-state"><Search size={28} aria-hidden="true" /><h3>Keine passenden Quellen</h3><p>Ändere einen Filter oder probiere einen anderen Suchbegriff.</p><button className="btn btn-secondary" onClick={() => { setQuery(''); setModuleFilter('all'); setPriorityFilter('all'); setLanguageFilter('all'); }}>Filter zurücksetzen</button></div>}
      </section>

      <section className="library-section" aria-labelledby="methods-heading"><div className="section-heading"><div><h2 id="methods-heading">So bleibt Wissen hängen</h2><p className="muted">Diese Lernmethoden begegnen dir in den Modulen und im Lernstudio.</p></div></div><div className="resource-grid">{methods.map((method, index) => <article key={method.title} className="card resource-card"><span className="badge">Methode {index + 1}</span><h3>{method.title}</h3><p>{method.text}</p></article>)}</div></section>

      <section className="library-section" aria-labelledby="certificate-heading"><div className="section-heading"><div><h2 id="certificate-heading">Optionale Zertifikatsorientierung</h2><p className="muted">Passende Kompetenzprofile aus der bereitgestellten Bibliothek, zusätzlich zu deinem Portfolio.</p></div></div><div className="resource-grid">{certificates.map(resource => <article className="card resource-card" key={resource.id}><span className="badge">{resource.id} · {resource.priority}</span><h3>{resource.title}</h3><p className="muted">{resource.provider}</p><p>{resource.selected_scope}</p><p>{resource.access_note}</p><a className="btn btn-ghost" href={resource.url} target="_blank" rel="noopener noreferrer">Zum Anbieter <ExternalLink size={15} aria-hidden="true" /></a></article>)}</div><p className="muted certificate-notice">KI Kompass bietet interne Lernkontrollen und Portfolioarbeit. Diese ersetzen keine offizielle Zertifikatsprüfung und garantieren keine Zertifizierung. Zeitbudgets zur Zertifikatsorientierung sind keine vollständige Prüfungsvorbereitung; verbindliche Inhalte und Bedingungen legt der Anbieter fest.</p></section>

      <section className="card content-settings" aria-labelledby="content-heading">
        <div className="section-heading"><div><p className="eyebrow">MANUELL GEPRÜFTE UPDATES</p><h2 id="content-heading">Deinen Lernpfad aktualisieren</h2></div><RefreshCw size={22} aria-hidden="true" /></div>
        <p>Exportiere das vollständige App-Inhalts-Paket mit Modulen, Lernmaterial und Quellenkatalog als JSON. Importiere später ein fachlich geprüftes Paket. Inhaltsupdates werden derzeit nicht automatisch aus dem Internet geladen.</p>
        <div className="content-meta"><span><strong>Aktive Version</strong> {content.version}</span><span><strong>Inhaltsstand</strong> {displayDate(content.reviewedAt)}</span><span><strong>Umfang</strong> {content.weeks.length} Lerneinheiten</span></div>
        <p className="muted">Die Original-JSON beschreibt die Ausgangsbibliothek und ist kein importierbares App-Paket. App-Pakete enthalten zusätzlich die aufbereiteten Lektionen, Fragen und Lernkarten sowie den Quellenkatalog. Ein Update ersetzt das gesamte Paket. Fortschritt bleibt anhand stabiler IDs zugeordnet; geänderte IDs werden nicht automatisch zusammengeführt.</p>
        <div className="button-row"><button className="btn btn-secondary" disabled={legacyLibrary} onClick={() => downloadJson(content, `ki-kompass-inhalte-${content.version.replace(/[^a-zA-Z0-9._-]/g, '-')}.json`)}><Download size={17} aria-hidden="true" /> App-Inhalts-Paket exportieren</button><label className="btn btn-primary file-input" htmlFor="content-upload"><Upload size={17} aria-hidden="true" /> {loading ? 'Datei wird geprüft …' : 'App-Inhalts-Paket importieren'}<input id="content-upload" type="file" accept=".json,application/json" onChange={event => { void importPack(event); }} disabled={loading} /></label></div>
        <p className="muted">JSON-Datei, maximal 5 MB. Erforderlich ist ein vollständiges, gültiges App-Paket mit 12 Modulen und Quellenkatalog. Eine Formatprüfung ersetzt keine fachliche Prüfung.{legacyLibrary && ' Der App-Paket-Export steht nach dem Wechsel zum neuen Modulpfad zur Verfügung.'}</p>
        {error && <p className="callout callout-warning" role="alert">{error}</p>}
        {pendingPack && <div className="callout import-preview" role="status"><h3>Format gültig: {pendingPack.title}</h3><p>Version {pendingPack.version} · Stand {displayDate(pendingPack.reviewedAt)} · {pendingPack.weeks.length} Module · {pendingPack.library?.resources.length ?? 0} Quellen</p><p>{retainedLessons} von {progress.completed.length} abgeschlossenen Lektionen finden eine gleiche ID im neuen Paket. Deine bisherigen Fortschrittsdaten bleiben gespeichert; die Anzeige folgt dem neuen Paket.</p><p><strong>Dieses Paket ersetzt die aktiven Lerninhalte und den Quellenkatalog in diesem Browser.</strong> Übernimm es nur, wenn du Herkunft und fachlichen Stand geprüft hast.</p><div className="button-row"><button className="btn btn-primary" onClick={() => { if (replaceContent(pendingPack)) setPendingPack(null); }}><Check size={17} aria-hidden="true" /> Paket jetzt übernehmen</button><button className="btn btn-secondary" onClick={() => setPendingPack(null)}><X size={17} aria-hidden="true" /> Abbrechen</button></div></div>}
        <div className="content-reset"><button className="btn btn-ghost" onClick={() => { setResetConfirm(!resetConfirm); setPendingPack(null); }}>Mitgelieferte Inhalte wiederherstellen</button>{resetConfirm && <div className="callout callout-warning"><p>Die aktiven Inhalte und den Quellenkatalog durch das mitgelieferte 12-Modul-Paket ersetzen? Deine Notizen und Fortschrittsdaten bleiben gespeichert. Zuordnungen folgen den ursprünglichen IDs, frühere 20-Wochen-Daten werden nicht automatisch dem Jahresplan zugeordnet.</p><div className="button-row"><button className="btn btn-secondary" onClick={() => { if (resetContent()) setResetConfirm(false); }}>Inhalte wiederherstellen</button><button className="btn btn-ghost" onClick={() => setResetConfirm(false)}>Abbrechen</button></div></div>}</div>
      </section>
    </div>
  );
}

export function SettingsPage() {
  const { progress, updateProgress, replaceProgress, offlineReady, installApp } = useLearning();
  const [pendingProgress, setPendingProgress] = useState<Progress | null>(null);
  const [error, setError] = useState('');
  const [clearConfirm, setClearConfirm] = useState(false);
  const [clearText, setClearText] = useState('');
  const [loading, setLoading] = useState(false);

  function updateProfile(changes: Partial<Progress['profile']>) {
    updateProgress(current => ({ ...current, profile: { ...current.profile, ...changes } }));
  }

  async function importProgress(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    setPendingProgress(null);
    setError('');
    setLoading(true);
    try { setPendingProgress(parseBackup(await readJson(file))); }
    catch (problem) { setError(errorText(problem)); }
    finally { setLoading(false); }
  }

  return (
    <div className="support-page">
      <header className="page-heading"><div><p className="eyebrow">DEIN LERNEN, DEIN RHYTHMUS</p><h1>Einstellungen</h1><p className="page-description">Passe KI Kompass an deinen Alltag an und nimm deinen Lernfortschritt mit.</p></div></header>
      <div className="settings-grid">
        <section className="card" aria-labelledby="profile-heading"><div className="section-heading"><h2 id="profile-heading">Dein Lernprofil</h2><span className="badge">Lokales Profil</span></div>
          <label className="field" htmlFor="profile-name"><span>Wie möchtest du genannt werden?</span><input id="profile-name" type="text" value={progress.profile.name} autoComplete="given-name" placeholder="Dein Vorname" maxLength={80} onChange={event => updateProfile({ name: event.target.value })} /></label>
          <label className="field" htmlFor="profile-goal"><span>Wöchentliches Lernziel in Minuten</span><input id="profile-goal" type="number" min={1} max={600} step={1} value={progress.profile.goalMinutes} onChange={event => { const value = event.target.valueAsNumber; if (Number.isFinite(value) && value >= 1 && value <= 600) updateProfile({ goalMinutes: Math.round(value) }); }} /><small className="muted">Der Jahresplan rechnet mit 360 Minuten pro Woche, also 6 Stunden. Teile sie in kurze und längere Einheiten auf.</small></label>
          <label className="field" htmlFor="profile-session"><span>Deine bevorzugte Lernzeit am Stück</span><select id="profile-session" value={progress.profile.sessionMinutes} onChange={event => updateProfile({ sessionMinutes: Number(event.target.value) })}>{![5, 15, 30, 45, 60].includes(progress.profile.sessionMinutes) && <option value={progress.profile.sessionMinutes}>{progress.profile.sessionMinutes} Minuten · importierte Einstellung</option>}<option value={5}>5 Minuten · kurz unterwegs</option><option value={15}>15 Minuten · kleine Lerneinheit</option><option value={30}>30 Minuten · vertiefen</option><option value={45}>45 Minuten · konzentrierter Fokus</option><option value={60}>60 Minuten · ausgiebig lernen</option></select></label>
          <label className="field" htmlFor="profile-focus"><span>Dein Anwendungsschwerpunkt</span><select id="profile-focus" value={progress.profile.focus} onChange={event => updateProfile({ focus: event.target.value as Progress['profile']['focus'] })}><option value="business">KI im Unternehmen</option><option value="both">Beruflich und privat</option><option value="private">Private Nutzung</option></select><small className="muted">Dein Schwerpunkt wird im Profil gespeichert. Unternehmensbeispiele und private Anwendung bleiben im vollständigen Lernpfad verfügbar.</small></label>
          <p className="muted">Dein Ziel: KI-Management, AI Transformation und Product Management. Lernplan gestartet am {displayDate(progress.profile.startDate)}.</p>
        </section>

        <section className="card" aria-labelledby="mobile-heading"><div className="section-heading"><h2 id="mobile-heading">Lernen unterwegs</h2><Smartphone size={23} aria-hidden="true" /></div><p>KI Kompass funktioniert auf PC und Handy. Installiere die App für schnellen Zugriff vom Startbildschirm.</p>
          {installApp ? <button className="btn btn-primary" onClick={installApp}><Smartphone size={17} aria-hidden="true" /> App installieren</button> : <div className="install-instructions"><h3>Auf Android oder am PC</h3><p>Öffne diese Seite in Chrome oder Edge. Wähle im Browsermenü „App installieren“ oder „Zum Startbildschirm hinzufügen“, sobald dein Browser diese Option anbietet.</p><h3>Auf iPhone oder iPad</h3><p>Öffne diese Seite in Safari. Tippe auf „Teilen“, dann auf „Zum Home-Bildschirm“ und „Hinzufügen“.</p></div>}
          <div className={`callout ${offlineReady ? '' : 'callout-warning'}`} role="status"><div className="section-heading"><strong><WifiOff size={17} aria-hidden="true" /> {offlineReady ? 'Für Offline-Lernen bereit' : 'Offline-Speicherung noch nicht bestätigt'}</strong></div><p>{offlineReady ? 'Die App und ihre Lerninhalte sind für den Offline-Zugriff vorbereitet. Öffne sie vor deiner Fahrt einmal vollständig mit Internet.' : 'Lade die App einmal vollständig mit Internet. Im lokalen Entwicklungsmodus ist die Offline-Speicherung deaktiviert; sie wird im Produktionsbuild verfügbar.'}</p><p className="muted">Externe Quellen benötigen Internet. Der Browser kann lokale Daten bei Speicherbereinigung entfernen; sichere deinen Fortschritt regelmäßig als JSON.</p></div>
        </section>

        <section className="card progress-settings" aria-labelledby="backup-heading"><div className="section-heading"><h2 id="backup-heading">Fortschritt sichern & mitnehmen</h2><ShieldCheck size={23} aria-hidden="true" /></div><p>Deine Notizen, Ergebnisse, Lernkarten und Einstellungen bleiben lokal in diesem Browser. Mit einer JSON-Sicherung überträgst du sie zwischen PC und Handy. Eine automatische Gerätesynchronisierung ist derzeit nicht eingerichtet.</p><div className="button-row"><button className="btn btn-secondary" onClick={() => downloadJson({ format: BACKUP_FORMAT, curriculum: BACKUP_CURRICULUM, schemaVersion: 1, progress }, `ki-kompass-fortschritt-${new Date().toISOString().slice(0, 10)}.json`)}><Download size={17} aria-hidden="true" /> Fortschritt exportieren</button><label className="btn btn-primary file-input" htmlFor="progress-upload"><Upload size={17} aria-hidden="true" /> {loading ? 'Datei wird geprüft …' : 'Fortschritt importieren'}<input id="progress-upload" type="file" accept=".json,application/json" disabled={loading} onChange={event => { void importProgress(event); }} /></label></div><p className="muted">JSON-Datei, maximal 5 MB. Sichere deinen Fortschritt für den aktuellen Jahreslernplan mit dieser Exportfunktion. Nur Sicherungen mit passender Lernpfadkennung werden übernommen; frühere 20-Wochen-Sicherungen und reine Fortschrittsdateien sind nicht kompatibel. Ein Import ersetzt deinen Stand ohne automatische Zusammenführung.</p>
          {error && <p className="callout callout-warning" role="alert">{error}</p>}
          {pendingProgress && <div className="callout import-preview" role="status"><h3>Sicherung bereit zum Import</h3><p>{pendingProgress.profile.name || 'Lernprofil'} · {pendingProgress.completed.length} abgeschlossene Lektionen · {pendingProgress.notes.length} Notizen · {pendingProgress.attempts.length} Prüfungsversuche</p><p>Damit ersetzt du deinen derzeitigen Fortschritt in diesem Browser. Exportiere zuerst eine Sicherung, wenn du den aktuellen Stand behalten möchtest. Die Lerninhalte werden nicht verändert.</p><div className="button-row"><button className="btn btn-primary" onClick={() => { if (replaceProgress(pendingProgress)) setPendingProgress(null); }}><Check size={17} aria-hidden="true" /> Fortschritt ersetzen</button><button className="btn btn-secondary" onClick={() => setPendingProgress(null)}>Abbrechen</button></div></div>}
        </section>
      </div>
      <section className="card danger-zone" aria-labelledby="reset-heading"><div className="section-heading"><div><h2 id="reset-heading">Von vorn beginnen</h2><p className="muted">Lösche deinen lokalen Fortschritt nur, wenn du wirklich neu starten möchtest.</p></div><button className="btn btn-ghost" onClick={() => { setClearConfirm(!clearConfirm); setClearText(''); }}>Fortschritt zurücksetzen</button></div>{clearConfirm && <div className="callout callout-warning"><p><strong>Alle Lernfortschritte, Notizen, Prüfungsversuche, Übungsantworten, Kartenstände, Lesezeichen und Profileinstellungen in diesem Browser werden gelöscht.</strong> Die Lerninhalte bleiben erhalten. Erstelle vorher eine Sicherung, wenn du diese Daten behalten möchtest.</p><label className="field" htmlFor="reset-confirm"><span>Gib LÖSCHEN ein, um das Zurücksetzen zu bestätigen.</span><input id="reset-confirm" value={clearText} onChange={event => setClearText(event.target.value)} autoComplete="off" spellCheck={false} /></label><div className="button-row"><button className="btn btn-danger" disabled={clearText !== 'LÖSCHEN'} onClick={() => { if (replaceProgress(createProgress())) { setClearConfirm(false); setClearText(''); setPendingProgress(null); } }}><Trash2 size={16} aria-hidden="true" /> Fortschritt endgültig löschen</button><button className="btn btn-secondary" onClick={() => { setClearConfirm(false); setClearText(''); }}>Abbrechen</button></div></div>}</section>
    </div>
  );
}
