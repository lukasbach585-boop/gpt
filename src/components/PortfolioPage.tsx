import { useState } from 'react';
import { CheckCircle2, ClipboardList, Download, Eye, FileText, FlaskConical, Rocket, ShieldCheck } from 'lucide-react';
import { useLearning } from '../context';
import baseLibrary from '../data/source-library.json';
import type { SourceLibrary } from '../types';

type PortfolioTab = 'templates' | 'cases' | 'capstone';
type FieldValues = Record<string, string>;
type Template = SourceLibrary['templates'][number];
type PracticeCase = SourceLibrary['practice_test_cases'][number];

function parseFields(text: string | undefined): FieldValues {
  if (!text) return {};
  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
  } catch {
    return {};
  }
}

function exportMarkdown(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function templateDocument(template: Template, values: FieldValues): string {
  return [`# ${template.title}`, '', `Vorlage ${template.id} · KI Kompass Lernportfolio`, '', template.purpose, '',
    ...template.fields.flatMap(([label, hint]) => [`## ${label}`, '', `Leitfrage: ${hint}`, '', values[label]?.trim() || '_Noch nicht ausgearbeitet._', '']),
    '---', 'Eigene Lernunterlage. Angaben und Annahmen müssen fachlich geprüft werden. Keine betriebliche oder normative Freigabe.', ''].join('\n');
}

function caseDocument(test: PracticeCase, response: string, reviewed: boolean): string {
  return [`## ${test.id} · ${test.category}`, '', `Schweregrad: ${test.severity}`, '', '### Szenario', '', test.scenario, '', '### Meine Antwort', '', response.trim() || '_Noch keine Antwort._', '', '### Erwartetes Verhalten', '', test.expected, '', `Selbstbewertung: ${reviewed ? 'mit Musterlösung verglichen' : 'noch offen'}. Keine automatische Bewertung.`, ''].join('\n');
}

export function PortfolioPage() {
  const { content, progress, updateProgress, notify } = useLearning();
  const library = content.library ?? baseLibrary;
  const [tab, setTab] = useState<PortfolioTab>('templates');
  const [templateId, setTemplateId] = useState(library.templates[0]?.id ?? '');
  const [caseId, setCaseId] = useState(library.practice_test_cases[0]?.id ?? '');
  const [revealedCase, setRevealedCase] = useState<string | null>(null);
  const [openOnly, setOpenOnly] = useState(false);
  const template = library.templates.find(item => item.id === templateId) ?? library.templates[0];
  const templateValues = parseFields(template ? progress.practice[`template-${template.id}`]?.text : undefined);
  const visibleCases = library.practice_test_cases.filter(item => !openOnly || !progress.practice[`case-${item.id}`]?.checked.includes(0));
  const currentCase = visibleCases.find(item => item.id === caseId) ?? visibleCases[0];
  const casePractice = currentCase ? progress.practice[`case-${currentCase.id}`] : undefined;
  const capstone = library.capstone;
  const project = parseFields(progress.practice.capstone?.text);
  const projectChecks = progress.practice.capstone?.checked ?? [];
  const completedDeliverables = capstone.deliverables.filter((_, index) => projectChecks.includes(index)).length;
  const reviewedCases = library.practice_test_cases.filter(item => progress.practice[`case-${item.id}`]?.checked.includes(0)).length;
  const editedTemplates = library.templates.filter(item => Object.values(parseFields(progress.practice[`template-${item.id}`]?.text)).some(value => value.trim())).length;
  const tabs: { id: PortfolioTab; label: string; icon: typeof FileText }[] = [
    { id: 'templates', label: 'Vorlagen', icon: FileText },
    { id: 'cases', label: 'Prüffälle', icon: FlaskConical },
    { id: 'capstone', label: 'Abschlussprojekt', icon: Rocket },
  ];

  function saveField(key: string, field: string, value: string) {
    const nextFields = { ...parseFields(progress.practice[key]?.text), [field]: value };
    const nextText = JSON.stringify(nextFields);
    if (nextText.length > 200_000) {
      notify('Dieses Dokument hat das Speicherlimit erreicht. Kürze ein Feld oder exportiere längere Nachweise separat.');
      return;
    }
    updateProgress(current => ({ ...current, practice: { ...current.practice, [key]: {
      text: nextText,
      checked: current.practice[key]?.checked ?? [],
    } } }));
  }

  function saveResponse(key: string, text: string) {
    updateProgress(current => ({ ...current, practice: { ...current.practice, [key]: { text, checked: [] } } }));
  }

  function toggleCheck(key: string, index: number) {
    updateProgress(current => {
      const currentPractice = current.practice[key] ?? { text: '', checked: [] };
      const checked = currentPractice.checked.includes(index) ? currentPractice.checked.filter(item => item !== index) : [...currentPractice.checked, index];
      return { ...current, practice: { ...current.practice, [key]: { ...currentPractice, checked } } };
    });
  }

  function projectDocument(): string {
    return [
      `# ${project.Projekttitel?.trim() || capstone.title}`, '', 'KI Kompass · Abschlussprojekt · Lernprototyp', '',
      '## Quellenumfang', '', capstone.scope, '', '## Datengrundlage', '', capstone.data, '',
      '## Mein Projekt und seine Grenzen', '', project.Projektbeschreibung?.trim() || '_Noch nicht beschrieben._', '',
      '## Geplante Funktionen', '', ...capstone.functions.map(item => `- ${item}`), '',
      ...capstone.deliverables.flatMap((item, index) => [`## ${index + 1}. ${item}`, '', `Eigener Arbeitsstand: ${projectChecks.includes(index) ? 'als ausgearbeitet markiert' : 'offen'}`, '', project[`deliverable-${index}`]?.trim() || '_Nachweise und Ausarbeitung fehlen noch._', '']),
      '## Vorgeschlagene Lern- und Pilotkriterien', '',
      ...capstone.proposed_learning_acceptance.map((item, index) => `- [${projectChecks.includes(capstone.deliverables.length + index) ? 'x' : ' '}] ${item}`), '',
      '## Meine Auswertung und nächste Schritte', '', project.Reflexion?.trim() || '_Noch keine Reflexion._', '',
      '## Grenzen der Bewertung', '', capstone.acceptance_note, '',
      'Die Markierungen sind eine eigene Selbstbewertung. Diese App führt keine KI-Verarbeitung von Projektdokumenten, technische Prüfung oder offizielle Abnahme durch.', '',
    ].join('\n');
  }

  function downloadProject() {
    const documents = library.templates.filter(item => Object.values(parseFields(progress.practice[`template-${item.id}`]?.text)).some(value => value.trim())).map(item => templateDocument(item, parseFields(progress.practice[`template-${item.id}`]?.text)));
    const cases = library.practice_test_cases.filter(item => progress.practice[`case-${item.id}`]?.text.trim()).map(item => caseDocument(item, progress.practice[`case-${item.id}`].text, progress.practice[`case-${item.id}`].checked.includes(0)));
    exportMarkdown([projectDocument(), ...(documents.length ? ['---\n\n# Anhang: ausgearbeitete Vorlagen\n', ...documents] : []), ...(cases.length ? ['---\n\n# Anhang: meine Prüffälle\n', ...cases] : [])].join('\n\n'), 'ki-kompass-lerndossier.md');
    notify('Dein Lerndossier wurde als Markdown exportiert.');
  }

  return <div className="page-content portfolio-page">
    <header className="page-heading"><p className="eyebrow">VOM WISSEN ZUM KÖNNEN</p><h1>Dein Lernportfolio</h1><p>Entwickle belastbare Arbeitsunterlagen, übe kritische Prüffälle und führe deine Ergebnisse in einem eigenen Projekt zusammen.</p></header>
    <div className="portfolio-summary"><div><FileText size={17} aria-hidden="true" /><strong>{editedTemplates}/{library.templates.length}</strong> Vorlagen begonnen</div><div><FlaskConical size={17} aria-hidden="true" /><strong>{reviewedCases}/{library.practice_test_cases.length}</strong> Fälle selbst geprüft</div><div><Rocket size={17} aria-hidden="true" /><strong>{completedDeliverables}/{capstone.deliverables.length}</strong> Projektunterlagen markiert</div></div>
    <div className="tab-bar" role="tablist" aria-label="Bereiche des Lernportfolios">{tabs.map(item => <button key={item.id} id={`portfolio-tab-${item.id}`} role="tab" aria-selected={tab === item.id} aria-controls={`portfolio-panel-${item.id}`} tabIndex={tab === item.id ? 0 : -1} className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)} onKeyDown={event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = tabs.findIndex(entry => entry.id === tab);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      setTab(tabs[next].id);
      document.getElementById(`portfolio-tab-${tabs[next].id}`)?.focus();
    }}><item.icon size={17} aria-hidden="true" />{item.label}</button>)}</div>

    {tab === 'templates' && <section id="portfolio-panel-templates" role="tabpanel" aria-labelledby="portfolio-tab-templates">
      <div className="portfolio-grid">
        <aside className="card template-list" aria-label="Arbeitsvorlage auswählen"><p className="eyebrow">DEINE ARBEITSDOKUMENTE</p><h2>{library.templates.length} Vorlagen für die Praxis</h2><p className="muted">Wähle ein Dokument und arbeite Feld für Feld. Kleine Einheiten reichen.</p>{library.templates.map(item => {
          const values = parseFields(progress.practice[`template-${item.id}`]?.text);
          const filled = item.fields.filter(([label]) => values[label]?.trim()).length;
          return <button key={item.id} className={`template-button ${template?.id === item.id ? 'active' : ''}`} onClick={() => setTemplateId(item.id)} aria-pressed={template?.id === item.id}><span className="template-number">{item.id}</span><span><strong>{item.title}</strong><small>{filled}/{item.fields.length} Felder ausgearbeitet</small></span>{filled === item.fields.length && <CheckCircle2 size={18} aria-hidden="true" />}</button>;
        })}</aside>
        {template ? <article className="card portfolio-fields"><div className="section-heading"><div><span className="eyebrow">VORLAGE {template.id}</span><h2>{template.title}</h2></div><ClipboardList size={25} aria-hidden="true" /></div><p>{template.purpose}</p><p className="fine-print">Änderungen werden lokal gespeichert; bei Fehlern erscheint ein Hinweis. Nur fiktive oder freigegebene anonymisierte Daten verwenden.</p>{template.fields.map(([label, hint], index) => <label className="field" key={label} htmlFor={`portfolio-${template.id}-${index}`}><span>{index + 1}. {label}</span><small>{hint}</small><textarea id={`portfolio-${template.id}-${index}`} rows={3} maxLength={12000} value={templateValues[label] ?? ''} placeholder="Deine Ausarbeitung, Annahmen und überprüfbaren Nachweise …" onChange={event => saveField(`template-${template.id}`, label, event.target.value)} /></label>)}<div className="button-row"><button className="btn btn-primary" onClick={() => { exportMarkdown(templateDocument(template, templateValues), `ki-kompass-${template.id.toLowerCase()}.md`); notify('Arbeitsvorlage als Markdown exportiert.'); }}><Download size={17} aria-hidden="true" />Dokument exportieren</button><button className="btn btn-secondary" onClick={() => setTab('capstone')}>Im Abschlussprojekt einsetzen<Rocket size={16} aria-hidden="true" /></button></div></article> : <div className="card empty-state"><h2>Keine Vorlagen vorhanden</h2><p>Dieses Inhaltspaket enthält keine Arbeitsvorlagen.</p></div>}
      </div>
    </section>}

    {tab === 'cases' && <section id="portfolio-panel-cases" role="tabpanel" aria-labelledby="portfolio-tab-cases">
      <div className="section-heading"><div><h2>Erkenne den Fehler, bevor er weiterwandert.</h2><p className="muted">{library.practice_test_cases.length} fiktive Fälle aus dokumentenintensiven Projekten. Antworte zuerst selbst, vergleiche dann mit dem erwarteten Verhalten.</p></div><label className="portfolio-filter"><input type="checkbox" checked={openOnly} onChange={event => setOpenOnly(event.target.checked)} />Nur noch offene Fälle</label></div>
      <div className="case-grid">{visibleCases.map(item => {
        const reviewed = progress.practice[`case-${item.id}`]?.checked.includes(0);
        return <button key={item.id} className={`case-card ${currentCase?.id === item.id ? 'active' : ''}`} onClick={() => { setCaseId(item.id); setRevealedCase(null); }} aria-pressed={currentCase?.id === item.id}><span className="section-heading"><span className="eyebrow">FALL {item.id}</span>{reviewed && <CheckCircle2 size={16} aria-label="Selbst geprüft" />}</span><strong>{item.category}</strong><span className={`badge ${item.severity === 'Kritisch' ? 'badge-critical' : 'badge-warning'}`}>{item.severity}</span></button>;
      })}</div>
      {currentCase ? <article className="card case-workspace" key={currentCase.id}><div className="section-heading"><div><p className="eyebrow">{currentCase.id} · {currentCase.category.toLocaleUpperCase('de')}</p><h2>Wie würdest du reagieren?</h2></div><span className={`badge ${currentCase.severity === 'Kritisch' ? 'badge-critical' : 'badge-warning'}`}>{currentCase.severity}</span></div><div className="callout"><strong>Dein Szenario</strong><p>{currentCase.scenario}</p></div><label className="field" htmlFor={`case-response-${currentCase.id}`}><span>Meine Antwort: Prüfung, Entscheidung und nächster Schritt</span><textarea id={`case-response-${currentCase.id}`} rows={5} maxLength={12000} value={casePractice?.text ?? ''} onChange={event => saveResponse(`case-${currentCase.id}`, event.target.value)} placeholder="Was stimmt nicht? Welche Quelle brauchst du? Was darf die KI tun und was muss offen bleiben?" /></label><p className="fine-print">Änderungen werden lokal gespeichert; bei Fehlern erscheint ein Hinweis. Wenn du deine Antwort änderst, wird die Selbstbewertung wieder geöffnet.</p>
        {revealedCase === currentCase.id ? <div className="callout case-solution"><p className="eyebrow">ERWARTETES VERHALTEN</p><p><strong>{currentCase.expected}</strong></p><ul className="rubric-list"><li>Habe ich die Abweichung oder Informationslücke klar erkannt?</li><li>Habe ich unbelegte Annahmen vermieden und passende Nachweise benannt?</li><li>Habe ich den nächsten Schritt und nötige Freigaben beschrieben?</li></ul><p className="muted">Das ist eine eigene Selbstbewertung. Die App beurteilt deinen Freitext nicht automatisch und vergibt dafür kein „Bestanden“.</p><label className="portfolio-check"><input type="checkbox" checked={casePractice?.checked.includes(0) ?? false} disabled={!casePractice?.text.trim()} onChange={() => toggleCheck(`case-${currentCase.id}`, 0)} /><span>Ich habe meine Antwort mit dem erwarteten Verhalten verglichen und offene Punkte erkannt.</span></label>{!casePractice?.text.trim() && <p className="fine-print">Schreibe zuerst deine Antwort, bevor du den Vergleich als erledigt markierst.</p>}</div> : <button className="btn btn-secondary" onClick={() => setRevealedCase(currentCase.id)}><Eye size={17} aria-hidden="true" />Musterlösung zeigen</button>}
        <div className="button-row"><button className="btn btn-secondary" disabled={!casePractice?.text.trim()} onClick={() => { exportMarkdown(`# Mein Prüffall\n\n${caseDocument(currentCase, casePractice?.text ?? '', casePractice?.checked.includes(0) ?? false)}`, `ki-kompass-prueffall-${currentCase.id.toLowerCase()}.md`); notify('Prüffall mit deiner Antwort exportiert.'); }}><Download size={17} aria-hidden="true" />Prüffall exportieren</button><button className="btn btn-ghost" disabled={visibleCases.length < 2} onClick={() => { const index = visibleCases.findIndex(item => item.id === currentCase.id); setCaseId(visibleCases[(index + 1) % visibleCases.length].id); setRevealedCase(null); }}>Nächsten Fall üben</button></div>
      </article> : <div className="card empty-state"><CheckCircle2 size={30} aria-hidden="true" /><h2>Alle Fälle selbst geprüft</h2><p>Du kannst sie jederzeit noch einmal üben. Schalte den Filter aus, um alle Fälle zu sehen.</p><button className="btn btn-secondary" onClick={() => setOpenOnly(false)}>Alle Fälle anzeigen</button></div>}
    </section>}

    {tab === 'capstone' && <section id="portfolio-panel-capstone" role="tabpanel" aria-labelledby="portfolio-tab-capstone">
      <div className="capstone-layout"><aside className="card capstone-brief"><p className="eyebrow">DEIN ABSCHLUSSPROJEKT</p><h2>{capstone.title}</h2><p>{capstone.scope}</p><h3>Datengrundlage</h3><p>{capstone.data}</p><h3>Geplante Funktionen</h3><ul className="rubric-list">{capstone.functions.map(item => <li key={item}>{item}</li>)}</ul><div className="callout"><ShieldCheck size={21} aria-hidden="true" /><strong>Lernprototyp mit klaren Grenzen</strong><p>{capstone.acceptance_note}</p><p>Du erarbeitest und dokumentierst dein Konzept. Diese App verarbeitet keine Projektdokumente mit einem KI-Server und führt keine technische Fachabnahme durch.</p></div><div className="capstone-count"><strong>{completedDeliverables} / {capstone.deliverables.length}</strong><span>Unterlagen selbst als ausgearbeitet markiert</span><div className="progress-track"><span style={{ width: `${capstone.deliverables.length ? completedDeliverables / capstone.deliverables.length * 100 : 0}%` }} /></div></div></aside>
        <article className="card portfolio-fields"><div className="section-heading"><div><p className="eyebrow">DEIN ERGEBNISDOSSIER</p><h2>Belege statt Bauchgefühl.</h2></div><Rocket size={25} aria-hidden="true" /></div><label className="field" htmlFor="capstone-title"><span>Mein Projekttitel</span><input id="capstone-title" maxLength={240} value={project.Projekttitel ?? ''} onChange={event => saveField('capstone', 'Projekttitel', event.target.value)} placeholder="Zum Beispiel: Wissensassistent für Projektübergaben" /></label><label className="field" htmlFor="capstone-scope"><span>Mein Projekt und seine Grenzen</span><small>Beschreibe Nutzer, Problem, freigegebene oder fiktive Daten, Projektumfang und ausgeschlossene Entscheidungen.</small><textarea id="capstone-scope" rows={4} maxLength={12000} value={project.Projektbeschreibung ?? ''} onChange={event => saveField('capstone', 'Projektbeschreibung', event.target.value)} placeholder="Welche Aufgabe löst dein Lernprototyp? Welche Quellen und Freigaben benötigt er?" /></label><h3>Deine {capstone.deliverables.length} Projektunterlagen</h3><p className="muted">Nutze die Vorlagen als Ausgangspunkt. Notiere konkrete Nachweise, Testkennungen und verbleibende Lücken. Die Markierungen sind dein eigener Arbeitsstand.</p>
          {capstone.deliverables.map((item, index) => <div className="capstone-deliverable" key={item}><label className="portfolio-check" htmlFor={`capstone-check-${index}`}><input id={`capstone-check-${index}`} type="checkbox" checked={projectChecks.includes(index)} onChange={() => toggleCheck('capstone', index)} /><span><strong>{index + 1}. {item}</strong><small>Von mir ausgearbeitet und mit Nachweisen versehen</small></span></label><label className="field" htmlFor={`capstone-deliverable-${index}`}><span>Ausarbeitung und Nachweise</span><textarea id={`capstone-deliverable-${index}`} rows={3} maxLength={12000} value={project[`deliverable-${index}`] ?? ''} onChange={event => saveField('capstone', `deliverable-${index}`, event.target.value)} placeholder="Dein Ergebnis, Dokumentbezug, Testlauf und offene Punkte …" /></label></div>)}
          <section className="callout"><h3>Vorgeschlagene Lern- und Pilotkriterien</h3><p>Prüfe diese Kriterien anhand deiner tatsächlichen Testbelege. Ein Haken ist eine Selbstbewertung und keine offizielle Abnahme.</p>{capstone.proposed_learning_acceptance.map((item, index) => <label className="portfolio-check" key={item}><input type="checkbox" checked={projectChecks.includes(capstone.deliverables.length + index)} onChange={() => toggleCheck('capstone', capstone.deliverables.length + index)} /><span>{item}</span></label>)}<p className="fine-print">{capstone.acceptance_note}</p></section><label className="field" htmlFor="capstone-reflection"><span>Meine Auswertung und nächste Schritte</span><small>Was funktioniert nachweislich? Welche kritischen Fehler sind noch offen? Welche Entscheidung lässt sich daraus begründen?</small><textarea id="capstone-reflection" rows={4} maxLength={12000} value={project.Reflexion ?? ''} onChange={event => saveField('capstone', 'Reflexion', event.target.value)} placeholder="Meine wichtigste Erkenntnis, offene Risiken und der nächste Test …" /></label><div className="button-row"><button className="btn btn-primary" onClick={downloadProject}><Download size={17} aria-hidden="true" />Lerndossier exportieren</button><button className="btn btn-secondary" onClick={() => setTab('templates')}><ClipboardList size={16} aria-hidden="true" />Vorlagen bearbeiten</button></div><p className="fine-print">Markdown-Dossier mit Projektunterlagen, ausgearbeiteten Vorlagen und beantworteten Prüffällen. Für die vollständige Übertragung zwischen Geräten sichere zusätzlich deinen Fortschritt in den Einstellungen.</p>
        </article></div>
    </section>}
  </div>;
}
