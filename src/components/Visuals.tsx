import { useId, useState } from 'react';
import { ArrowRight, BrainCircuit, Check, Database, FileText, Layers3, RefreshCw, Search, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import type { Lesson } from '../types';

export function HeroArtwork() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg className="hero-artwork" viewBox="0 0 380 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-cover`} x1="84" y1="188" x2="284" y2="243" gradientUnits="userSpaceOnUse"><stop stopColor="#83CBAE" /><stop offset="1" stopColor="#379877" /></linearGradient>
        <linearGradient id={`${uid}-page`} x1="103" y1="128" x2="215" y2="227" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFDF3" /><stop offset="1" stopColor="#E7EBDD" /></linearGradient>
        <linearGradient id={`${uid}-right`} x1="199" y1="143" x2="310" y2="218" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFEF5" /><stop offset="1" stopColor="#F0F1E5" /></linearGradient>
        <linearGradient id={`${uid}-orb`} x1="233" y1="51" x2="274" y2="93" gradientUnits="userSpaceOnUse"><stop stopColor="#D3EEE0" /><stop offset="1" stopColor="#6DB899" /></linearGradient>
        <filter id={`${uid}-shadow`} x="0" y="0" width="380" height="300" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>
      <circle cx="195" cy="145" r="125" fill="#F2EEDC" />
      <circle cx="195" cy="145" r="110" stroke="#E8E3CE" strokeDasharray="3 8" />
      <ellipse cx="195" cy="245" rx="100" ry="11" fill="#315C4A" opacity=".13" filter={`url(#${uid}-shadow)`} />
      <path d="M72 182 173 221Q189 219 198 230L305 189V210Q252 230 198 250Q184 240 174 243L72 201Z" fill={`url(#${uid}-cover)`} />
      <path d="M77 178 177 216Q190 215 198 225L300 185V203L198 242Q188 232 177 235L77 196Z" fill="#FAF8EB" />
      <path d="m80 185 97 38q13-1 21 9l97-37M80 190l97 38q13-1 21 9l97-37" stroke="#D1DCCB" strokeWidth="1.3" />
      <path d="M77 139Q129 134 198 164V233Q151 204 77 194Z" fill={`url(#${uid}-page)`} />
      <path d="M198 164Q253 116 301 131V194Q250 197 198 233Z" fill={`url(#${uid}-right)`} />
      <path d="M77 139Q137 134 198 164Q252 119 301 131M198 164V233" stroke="#C9D4C3" strokeWidth="1.5" />
      <path d="M92 154q48 4 87 22M92 166q48 4 87 22M92 178q41 4 71 17" stroke="#B8CABA" strokeWidth="2" strokeLinecap="round" />
      <path d="M218 166q29-20 65-20M218 178q29-20 65-20M218 190q24-16 51-18" stroke="#BECFBD" strokeWidth="2" strokeLinecap="round" />
      <path d="M187 229v17l10 4v-17" fill="#276C53" opacity=".6" />
      <path d="M238 209v27l8-8 7 2v-25" fill="#C6B25F" />
      <path d="M117 110C94 81 126 59 169 64S271 102 259 143M116 109c39 39 151 36 183-10" stroke="#91BFA5" strokeWidth="1.3" strokeDasharray="4 5" />
      <path d="M157 156c-7-38 15-74 44-79s49 17 38 37" stroke="#D0B874" strokeWidth="1.2" strokeDasharray="3 6" />
      <g className="orbit-float">
        <path d="m236 65 20-12 20 12v24l-20 12-20-12Z" fill={`url(#${uid}-orb)`} />
        <path d="m236 65 20 12 20-12m-20 12v24" stroke="#4B9E7D" strokeWidth="1.2" />
        <circle cx="255" cy="69" r="3" fill="#F4FFF4" />
        <path d="m256 77-1-8" stroke="#F4FFF4" strokeWidth="1.3" />
      </g>
      <g className="orbit-float" style={{ animationDelay: '-2s' }}>
        <path d="M108 96c-10-21-4-38 12-49 14 20 10 39-12 49Z" fill="#71B292" />
        <path d="M110 99q1-25 11-45" stroke="#35765C" strokeWidth="1.5" />
        <path d="M110 101q-24-2-28-24 23-3 28 24Z" fill="#AED2AF" />
        <path d="m91 84 19 17" stroke="#659473" strokeWidth="1.2" />
      </g>
      <g className="orbit-float" style={{ animationDelay: '-4s' }}>
        <path d="m168 54 27-6 12 37-28 7Z" fill="#FFFCF0" stroke="#D5CFAF" />
        <path d="m177 63 16-3m-14 11 16-3m-13 11 12-2" stroke="#87AF94" strokeWidth="2" strokeLinecap="round" />
        <circle cx="296" cy="108" r="9" fill="#D7B978" /><circle cx="296" cy="108" r="3" fill="#FFF7DB" />
      </g>
      <circle cx="154" cy="109" r="4" fill="#73A888" />
      <circle cx="216" cy="48" r="3" fill="#D7B978" />
      <circle cx="86" cy="124" r="2.5" fill="#D7B978" />
      <path d="M286 61v10m-5-5h10M137 42v8m-4-4h8M319 155v9m-4.5-4.5h9" stroke="#ADBA95" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const hierarchy = [
  { title: 'Künstliche Intelligenz', icon: BrainCircuit, text: 'Der Oberbegriff: Systeme lösen Aufgaben, die intelligentes Verhalten erfordern. Dazu gehören auch regelbasierte Systeme, die nichts aus Daten lernen.', example: 'Beispiel: Eine regelbasierte Expertenlösung prüft technische Grenzwerte.' },
  { title: 'Machine Learning', icon: Workflow, text: 'Ein Teilgebiet der KI: Das Modell lernt Muster aus Beispielen. Menschen legen Aufgabe, Daten und Bewertung fest.', example: 'Beispiel: Ein Modell prognostiziert den Bedarf aus vergangenen Bestellungen.' },
  { title: 'Deep Learning', icon: Layers3, text: 'Eine Methode des Machine Learning mit mehrschichtigen neuronalen Netzen. Sie wird unter anderem für Sprache, Bilder und Audio eingesetzt.', example: 'Beispiel: Ein neuronales Netz erkennt Mängel auf Produktfotos.' },
  { title: 'Generative KI', icon: Sparkles, text: 'Sie erzeugt neue Inhalte wie Text oder Bilder. Moderne Sprachmodelle nutzen meist Deep Learning. „Generativ“ beschreibt das Ergebnis; es ist keine eigene Lernmethode.', example: 'Beispiel: Ein Sprachmodell entwirft aus Stichpunkten eine Kundenantwort.' },
];

function HierarchyVisual() {
  const [selected, setSelected] = useState(0);
  const current = hierarchy[selected];
  return <div className="concept-visual">
    <span className="visual-label">Vom Oberbegriff zur Anwendung</span>
    <div className="hierarchy-diagram">
      {hierarchy.map((item, index) => <button key={item.title} className={`hierarchy-level ${selected === index ? 'active' : ''}`} style={{ marginInlineStart: `${index * 8}px` }} onClick={() => setSelected(index)} aria-pressed={selected === index}>
        <item.icon size={19} aria-hidden="true" /><span>{item.title}</span><span className="hierarchy-number">0{index + 1}</span>
      </button>)}
    </div>
    <div className="visual-caption" aria-live="polite"><strong>{current.title}</strong><p>{current.text}</p><p>{current.example}</p></div>
  </div>;
}

function TokenVisual() {
  const [input, setInput] = useState('KI hilft mir, besser zu lernen.');
  const id = useId();
  const tokens = input.match(/[\p{L}\p{N}]+|[^\s\p{L}\p{N}]/gu) ?? [];
  return <div className="concept-visual">
    <span className="visual-label">Wie wird aus Text eine Eingabe?</span>
    <label htmlFor={id} className="token-input-label">Probiere einen eigenen Satz</label>
    <textarea id={id} className="token-input" rows={2} maxLength={280} value={input} onChange={event => setInput(event.target.value)} />
    <div className="token-list" aria-label="Simulierte Textbausteine">{tokens.map((token, index) => <span className="token-chip" key={`${index}-${token}`}><small>{index + 1}</small>{token}</span>)}{!tokens.length && <span className="visual-caption">Schreibe einen Satz, um die Zerlegung zu sehen.</span>}</div>
    <div className="visual-caption" aria-live="polite"><strong>{tokens.length} simulierte Bausteine · {input.length} Zeichen</strong><p>Didaktische Simulation: Hier trennen wir Wörter und Satzzeichen. Echte Tokenizer zerlegen auch Wortteile und behandeln Leerzeichen anders. Die tatsächliche Tokenzahl hängt vom Modell ab.</p><p>Das Kontextfenster begrenzt die verarbeitbare Menge. Deine Eingabe, Dokumente und die Antwort benötigen gemeinsam Platz.</p></div>
    <div className="visual-controls"><button className="btn btn-secondary" onClick={() => setInput('Wassernebelanlage: Prüfbericht zusammenfassen!')}>Fachwort ausprobieren</button><button className="btn btn-secondary" onClick={() => setInput('KI hilft mir, besser zu lernen.')}>Zurücksetzen</button></div>
  </div>;
}

type PipelineKind = 'workflow' | 'rag' | 'loop';
const pipelines = {
  workflow: {
    label: 'Ein verlässlicher KI-Arbeitsablauf',
    steps: [
      { title: 'Aufgabe klären', icon: FileText, text: 'Definiere Ziel, Zielgruppe und Erfolgskriterium, bevor du ein Tool auswählst.', example: '„Entwirf eine sachliche Antwort auf die Lieferanfrage. Nutze ausschließlich die vorgegebenen Lieferdaten.“' },
      { title: 'Daten vorbereiten', icon: Database, text: 'Nutze passende, freigegebene Informationen. Entferne nicht benötigte persönliche und vertrauliche Daten.', example: 'Übergebe Produkt, bestätigten Termin und gewünschte Tonalität. Eine vollständige Kundendatenbank ist dafür unnötig.' },
      { title: 'KI anwenden', icon: Sparkles, text: 'Gib Kontext, Aufgabe, Grenzen und Ausgabeformat vor. Das Ergebnis ist zunächst ein Entwurf.', example: 'Bitte um eine kurze E-Mail mit Betreff und um eine Markierung fehlender Informationen.' },
      { title: 'Ergebnis prüfen', icon: Check, text: 'Vergleiche Aussagen mit den Quellen. Prüfe Zahlen, Tonalität und Freigaben vor der Verwendung.', example: 'Ein Mensch bestätigt den Liefertermin und gibt die E-Mail zum Versand frei.' },
    ],
  },
  rag: {
    label: 'RAG: Antworten mit passendem Wissen',
    steps: [
      { title: 'Frage stellen', icon: FileText, text: 'Die Nutzerfrage startet die Suche. Zugriffsrechte müssen für die gesamte Verarbeitung gelten.', example: '„Welche Reisekosten kann ich für meine Dienstreise abrechnen?“' },
      { title: 'Quellen suchen', icon: Search, text: 'Das System sucht passende Abschnitte in einer freigegebenen Wissenssammlung, beispielsweise über eine semantische Suche.', example: 'Es findet die aktuelle Reiserichtlinie und die gültigen Erstattungsregeln.' },
      { title: 'Kontext ergänzen', icon: Database, text: 'Relevante Fundstellen werden zusammen mit der Frage an das Sprachmodell übergeben. Dabei werden die Modellgewichte nicht neu trainiert.', example: 'Der Prompt enthält die Frage, ausgewählte Richtlinienabschnitte und ihre Quellenangaben.' },
      { title: 'Antwort prüfen', icon: Check, text: 'Das Modell formuliert die Antwort. Quellenverweise und ein Abgleich helfen bei der Prüfung; RAG garantiert keine fehlerfreie Antwort.', example: 'Prüfe, ob die zitierte Regel wirklich zutrifft und ob die Richtlinie noch gültig ist.' },
    ],
  },
  loop: {
    label: 'Mit Feedback gezielt besser werden',
    steps: [
      { title: 'Ziel setzen', icon: FileText, text: 'Lege fest, was eine gute Antwort leisten soll. Verwende überprüfbare Kriterien.', example: 'Ein Meetingprotokoll soll Beschlüsse, Aufgaben, Verantwortliche und Fristen enthalten.' },
      { title: 'Ausprobieren', icon: Sparkles, text: 'Teste den Prompt an einem typischen Fall und auch an einem schwierigen Fall.', example: 'Nutze ein klares Gespräch und eines, in dem keine eindeutige Frist genannt wird.' },
      { title: 'Bewerten', icon: Check, text: 'Prüfe das Ergebnis anhand deiner Kriterien und der Ausgangsdaten. Selbsteinschätzungen der KI allein reichen nicht aus.', example: 'Erfundene Verantwortliche sind ein Fehler. Nicht genannte Fristen müssen als offen erscheinen.' },
      { title: 'Verbessern', icon: RefreshCw, text: 'Ändere eine Stellschraube und teste erneut. Halte wirksame Anpassungen fest.', example: 'Ergänze: „Erfinde keine Zuständigkeiten. Markiere fehlende Angaben mit offen.“ Vergleiche dann beide Versionen.' },
    ],
  },
};

function PipelineVisual({ kind }: { kind: PipelineKind }) {
  const [step, setStep] = useState(0);
  const pipeline = pipelines[kind];
  const current = pipeline.steps[step];
  return <div className="concept-visual">
    <span className="visual-label">{pipeline.label}</span>
    <div className="diagram-flow">
      {pipeline.steps.map((item, index) => <div className="flow-step" key={item.title}>
        <button className={`diagram-node ${index === step ? 'active' : ''}`} onClick={() => setStep(index)} aria-pressed={index === step}><item.icon size={22} aria-hidden="true" /><small>Schritt {index + 1}</small><strong>{item.title}</strong></button>
        {index < pipeline.steps.length - 1 && <ArrowRight size={17} className="flow-arrow" aria-hidden="true" />}
      </div>)}
    </div>
    <div className="visual-caption" aria-live="polite"><strong>{current.title}</strong><p>{current.text}</p><p className="visual-example">{current.example}</p></div>
    <div className="visual-controls"><span className="visual-step-count">{step + 1} / {pipeline.steps.length}</span><button className="btn btn-secondary" onClick={() => setStep((step + 1) % pipeline.steps.length)}>{step === pipeline.steps.length - 1 ? 'Noch einmal durchgehen' : 'Nächster Schritt'}<ArrowRight size={15} aria-hidden="true" /></button></div>
  </div>;
}

const approaches = [
  { title: 'Prompting', icon: FileText, heading: 'Die Aufgabe besser beschreiben', description: 'Du steuerst das vorhandene Modell mit Anweisungen, Beispielen und Kontext.', knowledge: 'Wissen aus dem Modell und aus deiner Eingabe.', use: 'Texte entwerfen, Formate vorgeben, Aufgaben präzisieren.', example: '„Fasse diesen Text in fünf Stichpunkten für die Geschäftsführung zusammen.“', limit: 'Ein besserer Prompt ersetzt keine fehlenden oder aktuellen Fakten.' },
  { title: 'RAG', icon: Search, heading: 'Passende Quellen dazuholen', description: 'Eine Suche ergänzt relevante Dokumentabschnitte im Kontext der Anfrage.', knowledge: 'Eine gepflegte externe Wissenssammlung.', use: 'Aktuelle Richtlinien, interne Dokumente und belegbare Wissensantworten.', example: 'Eine Frage zu Reisekosten wird mit der aktuell gültigen internen Richtlinie beantwortet.', limit: 'Suchqualität, Berechtigungen und Quellenprüfung bleiben erforderlich.' },
  { title: 'Fine-Tuning', icon: Layers3, heading: 'Das Modell gezielt anpassen', description: 'Zusätzliches Training verändert Modellparameter anhand ausgewählter Beispiele.', knowledge: 'Trainingsbeispiele beeinflussen Verhalten, Stil oder Aufgabenleistung.', use: 'Einheitliche Ausgabeformate oder spezialisierte Aufgaben bei ausreichend guten Beispieldaten.', example: 'Viele geprüfte Supportfälle trainieren ein konsistentes Antwortformat.', limit: 'Kein verlässlicher Ersatz für eine aktualisierbare Faktendatenbank. Qualität muss separat gemessen werden.' },
];

function CompareVisual() {
  const [selected, setSelected] = useState(0);
  const item = approaches[selected];
  return <div className="concept-visual">
    <span className="visual-label">Drei Ansätze, drei verschiedene Hebel</span>
    <div className="diagram-options">{approaches.map((approach, index) => <button key={approach.title} className={`choice ${selected === index ? 'active' : ''}`} onClick={() => setSelected(index)} aria-pressed={selected === index}><approach.icon size={17} aria-hidden="true" />{approach.title}</button>)}</div>
    <div className="visual-caption" aria-live="polite"><strong>{item.heading}</strong><p>{item.description}</p><dl className="visual-facts"><div><dt>Wissensbasis</dt><dd>{item.knowledge}</dd></div><div><dt>Geeignet für</dt><dd>{item.use}</dd></div><div><dt>Beispiel</dt><dd>{item.example}</dd></div></dl><p>{item.limit}</p></div>
    <p className="visual-footnote">Die Ansätze lassen sich kombinieren: Auch ein RAG-System braucht einen guten Prompt.</p>
  </div>;
}

function ShieldVisual() {
  const [approved, setApproved] = useState(true);
  const [personal, setPersonal] = useState(false);
  const [reviewed, setReviewed] = useState(true);
  const settings = [
    { title: 'Freigegebener Unternehmenszugang', value: approved, toggle: () => setApproved(!approved), detail: 'Tool und Verarbeitung sind intern geprüft.' },
    { title: 'Personenbezogene Daten enthalten', value: personal, toggle: () => setPersonal(!personal), detail: 'Zum Beispiel Namen, E-Mails oder Kundendaten.' },
    { title: 'Mensch prüft die Ausgabe', value: reviewed, toggle: () => setReviewed(!reviewed), detail: 'Inhalt und Folgen werden vor der Nutzung geprüft.' },
  ];
  const status = !approved ? 'Erst den Zugang klären' : personal ? 'Zusätzliche Datenschutzprüfung nötig' : !reviewed ? 'Prüfung vor Nutzung einplanen' : 'Gute Voraussetzungen für einen Pilot';
  const explanation = !approved ? 'Nutze vorerst keine internen oder vertraulichen Inhalte. Kläre den freigegebenen Zugang, Verarbeitung und Unternehmensregeln.' : personal ? 'Die Toolfreigabe allein erlaubt nicht jede Datenverarbeitung. Prüfe Zweck, Rechtsgrundlage, Datenminimierung, Anbieterbedingungen und erforderliche Freigaben. Anonymisiere, wo möglich.' : !reviewed ? 'Falsche Aussagen können auch ohne personenbezogene Daten Schaden anrichten. Lege eine verantwortliche Person und konkrete Prüfkriterien fest.' : 'Teste mit passenden, nicht vertraulichen Beispieldaten. Prüfe weiterhin Datenrechte, Richtigkeit, Sicherheit und die Auswirkungen deines konkreten Anwendungsfalls.';
  return <div className="concept-visual">
    <span className="visual-label">Was ändert sich bei der Freigabe?</span>
    <div className="permission-list">{settings.map(setting => <button key={setting.title} className={`permission-row ${setting.value ? 'enabled' : ''}`} role="switch" aria-checked={setting.value} onClick={setting.toggle}><span><strong>{setting.title}</strong><small>{setting.detail}</small></span><span className="permission-toggle" aria-hidden="true"><span /></span></button>)}</div>
    <div className={`visual-caption shield-result ${approved && !personal && reviewed ? 'ready' : 'review'}`} aria-live="polite"><ShieldCheck size={22} aria-hidden="true" /><div><strong>{status}</strong><p>{explanation}</p></div></div>
    <p className="visual-footnote">Lernszenario: Die Schalter ersetzen keine rechtliche oder betriebliche Freigabe.</p>
  </div>;
}

const useCases = [
  { title: 'Protokolle zusammenfassen', quadrant: 0, text: 'Häufige Aufgabe, begrenzter Einführungsaufwand: ein guter Pilot, wenn Datenschutz und Qualität passen. Miss gesparte Zeit und korrigierte Fehler.' },
  { title: 'Interne Dokumentensuche', quadrant: 1, text: 'Hoher möglicher Nutzen, aber mehr Arbeit für Datenaufbereitung, Berechtigungen und Evaluation. Starte mit einer begrenzten, gepflegten Sammlung.' },
  { title: 'Einmalige Bildidee', quadrant: 2, text: 'Ein kleiner Versuch kann sinnvoll sein. Bei seltenem Bedarf rechtfertigt er meist kein großes Einführungsprojekt. Prüfe Nutzungsrechte.' },
  { title: 'Sonderlösung für seltene Fälle', quadrant: 3, text: 'Großer Aufwand bei seltenem Bedarf: prüfe Standardwerkzeuge oder einen manuellen Ablauf, bevor du ein eigenes System entwickeln lässt.' },
];
const quadrants = [
  { title: 'Pilot starten', note: 'Hoher Nutzen · kleiner Aufwand', symbol: '↗' },
  { title: 'Gezielt planen', note: 'Hoher Nutzen · großer Aufwand', symbol: '◎' },
  { title: 'Klein ausprobieren', note: 'Niedriger Nutzen · kleiner Aufwand', symbol: '✦' },
  { title: 'Priorität prüfen', note: 'Niedriger Nutzen · großer Aufwand', symbol: '↘' },
];

function MatrixVisual() {
  const [selected, setSelected] = useState(0);
  const item = useCases[selected];
  return <div className="concept-visual">
    <span className="visual-label">Welcher KI-Anwendungsfall lohnt sich zuerst?</span>
    <div className="diagram-options">{useCases.map((useCase, index) => <button key={useCase.title} className={`choice ${selected === index ? 'active' : ''}`} onClick={() => setSelected(index)} aria-pressed={selected === index}>{useCase.title}</button>)}</div>
    <div className="matrix-diagram" aria-label="Nutzen-Aufwand-Matrix"><div className="matrix-column-labels"><span>Aufwand klein</span><span>Aufwand groß</span></div><div className="matrix-grid">{quadrants.map((quadrant, index) => <button key={quadrant.title} className={`matrix-cell ${item.quadrant === index ? 'active' : ''}`} onClick={() => setSelected(useCases.findIndex(useCase => useCase.quadrant === index))} aria-pressed={item.quadrant === index}><span aria-hidden="true">{quadrant.symbol}</span><strong>{quadrant.title}</strong><small>{quadrant.note}</small></button>)}</div></div>
    <div className="visual-caption" aria-live="polite"><strong>{item.title}</strong><p>{item.text}</p></div>
    <p className="visual-footnote">Beispielhafte Einschätzungen. Bewerte Nutzen und Aufwand in deinem Betrieb. Risiken, Datenrechte und Sicherheit sind zusätzliche Entscheidungskriterien.</p>
  </div>;
}

export function ConceptVisual({ kind }: { kind: Lesson['visual'] }) {
  switch (kind) {
    case 'hierarchy': return <HierarchyVisual />;
    case 'tokens': return <TokenVisual />;
    case 'workflow':
    case 'rag':
    case 'loop': return <PipelineVisual key={kind} kind={kind} />;
    case 'compare': return <CompareVisual />;
    case 'shield': return <ShieldVisual />;
    case 'matrix': return <MatrixVisual />;
  }
}
