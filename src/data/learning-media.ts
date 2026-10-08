import type { Lesson } from '../types';

export const mediaSourceCommit = 'd8ec07e31c4b32bd283d565c1abd9b58bb5cf2e8';
const sourceRoot = `https://github.com/microsoft/generative-ai-for-beginners/blob/${mediaSourceCommit}/`;

export type LearningMedia = {
  id: string;
  title: string;
  file: string;
  alt: string;
  sourcePath: string;
  creator: string;
  readingGuide: string[];
  recallQuestion: string;
};

export const learningMedia: LearningMedia[] = [
  {
    id: 'tokens', title: 'Ein Satz wird zu Token', file: 'tokens.png',
    alt: 'Der englische Satz What is a tokenizer? ist in sechs farbige Token mit sechs numerischen Kennungen zerlegt.',
    sourcePath: '01-introduction-to-genai/images/tokenizer-example.png', creator: 'Microsoft Corporation',
    readingGuide: ['Die Farben zeigen einzelne Token. Ein Token kann ein Wortteil oder ein Satzzeichen sein.', 'Darunter stehen numerische Token-Kennungen. Sie hängen vom verwendeten Tokenizer ab.', 'Die sechs Token gelten für dieses konkrete Beispiel; daraus folgt keine feste Wort-Token-Regel.'],
    recallQuestion: 'Warum kannst du die Tokenzahl eines deutschen Satzes nicht einfach aus seiner Wortzahl ableiten?',
  },
  {
    id: 'prompt-map', title: 'Prompting als visuelle Landkarte', file: 'prompt-map.png',
    alt: 'Illustrierte Übersicht zu Token, Kontext, Promptaufbau, Beispielen, Vorlagen und wiederholtem Prüfen von Prompts.',
    sourcePath: '04-prompt-engineering-fundamentals/images/04-prompt-engineering-sketchnote.png', creator: 'Microsoft Corporation · Sketchnote: Nitya',
    readingGuide: ['Suche „Prompt Construction“: Auftrag und Kontext beeinflussen das Ergebnis.', 'Suche „Primary Content“: Beispiele und wiederverwendbare Vorlagen geben Orientierung.', 'Bei „Best Practices“ gehört das wiederholte Prüfen dazu. Modellnamen in der historischen Illustration sind Beispiele, keine aktuelle Empfehlung.'],
    recallQuestion: 'Welche drei Angaben fehlen einem Arbeitsauftrag wie „Prüfe dieses Angebot“?',
  },
  {
    id: 'function-calling', title: 'Vom Auftrag zum Werkzeug und zurück', file: 'function-calling.png',
    alt: 'Ein Nutzerauftrag geht an ein Sprachmodell, das Parameter für eine Kurssuche vorbereitet. Das Funktionsergebnis geht an das Modell und als Antwort zurück zum Nutzer.',
    sourcePath: '11-integrating-with-function-calling/images/Function-Flow.png', creator: 'Microsoft Corporation',
    readingGuide: ['User → LLM: Der Auftrag wird in benötigte Angaben übersetzt.', 'LLM → Function: Die Anwendung prüft Parameter und führt das erlaubte Werkzeug aus; der Modellvorschlag allein ist keine Ausführung.', 'Function → LLM → User: Das echte Werkzeugergebnis bildet die Antwortbasis. Das Kursbeispiel illustriert den Ablauf, keine Prüfungsempfehlung.'],
    recallQuestion: 'An welcher Stelle würdest du Projektberechtigung, Parameter und eine notwendige Freigabe prüfen?',
  },
  {
    id: 'rag', title: 'RAG: vom Dokument zur belegbaren Antwort', file: 'rag.png',
    alt: 'Skizze mit Dokumentaufbereitung, Embeddings, Vektordatenbank, Nutzeranfrage, abgerufenem Kontext und Antworterzeugung durch ein Sprachmodell.',
    sourcePath: '15-rag-and-vector-databases/images/how-rag-works.png', creator: 'Microsoft Corporation',
    readingGuide: ['Unten beginnt die Vorbereitung: Dokumente werden aufgeteilt und für die Suche erschlossen.', 'In der Mitte läuft die Anfrage: Die Suche liefert passende Abschnitte als Kontext.', 'Oben entsteht die Antwort aus Auftrag und Kontext. Projektzugriff, gültige Version und Quellenprüfung ergänzt du als eigene Kontrollen.'],
    recallQuestion: 'Wo entsteht ein Fehler, wenn die Antwort sprachlich gut ist, aber aus einer veralteten Dokumentversion stammt?',
  },
  {
    id: 'risk-cycle', title: 'Risiken werden im Betrieb erneut geprüft', file: 'risk-cycle.png',
    alt: 'Vier Pfeile verbinden Identifizieren, Messen, Begrenzen und Betreiben in einem wiederkehrenden Kreislauf.',
    sourcePath: '03-using-generative-ai-responsibly/images/mitigate-cycle.png', creator: 'Microsoft Corporation',
    readingGuide: ['Identify: Beschreibe mögliche Schäden und betroffene Personen.', 'Measure → Mitigate: Prüfe das Risiko und die Wirkung passender Kontrollen.', 'Operate: Beobachte reale Fehler und Änderungen. Daraus beginnt die nächste Prüfung; diese Grafik ist ein Lernmodell, keine Rechtsklassifizierung.'],
    recallQuestion: 'Welche Änderung an deinem Dokumentenassistenten würde einen neuen Review auslösen?',
  },
  {
    id: 'defense-layers', title: 'Schutz wirkt an mehreren Stellen', file: 'defense-layers.png',
    alt: 'Verschachtelte Schichten zeigen Modell, Sicherheitssystem, Metaprompt und Benutzeroberfläche als verschiedene Ansatzpunkte für Schutzmaßnahmen.',
    sourcePath: '03-using-generative-ai-responsibly/images/mitigation-layers.png', creator: 'Microsoft Corporation',
    readingGuide: ['Die Schichten zeigen verschiedene Ansatzpunkte, keine Garantie durch eine einzelne Maßnahme.', 'Ein Metaprompt kann Verhalten beeinflussen. Er ersetzt keine technische Projektberechtigung oder Werkzeuggrenze.', 'Prüfe zusätzlich Datenzugriff, Parameter, Freigaben und Fehlerwege an ihren konkreten Übergängen.'],
    recallQuestion: 'Welche unerlaubte Aktion muss technisch verhindert werden, auch wenn das Modell eine fremde Anweisung befolgt?',
  },
  {
    id: 'red-team', title: 'Angriffstests betrachten das ganze System', file: 'red-team.png',
    alt: 'Fünf Symbole erläutern breitere KI-Angriffstests, bösartige und normale Nutzerfälle, sich verändernde Systeme, wiederholte Versuche und mehrere Schutzschichten.',
    sourcePath: '13-securing-ai-applications/images/13-AI-red-team.png', creator: 'Microsoft Corporation',
    readingGuide: ['Teste sowohl Angriffsversuche als auch erlaubte Nutzung, damit Schutz nicht jede hilfreiche Antwort blockiert.', 'Variiere Eingaben und wiederhole Versuche: Ein einzelner erfolgreicher Test beweist keine dauerhafte Sicherheit.', 'Beobachte erreichbare Daten und tatsächlich ausgeführte Werkzeuge. Neue Komponenten oder Rechte erfordern neue Tests.'],
    recallQuestion: 'Was würdest du messen, wenn ein System vertrauliche Daten kurz abruft und erst danach eine Antwort verweigert?',
  },
  {
    id: 'evaluation-loop', title: 'Testen, verbessern, erneut testen', file: 'evaluation-loop.png',
    alt: 'Ablaufdiagramm verbindet Problemfindung, Testläufe mit kleinen und größeren Datenbeständen, Bewertung, Rücksprünge zur Verbesserung und anschließenden Betrieb.',
    sourcePath: '14-the-generative-ai-application-lifecycle/images/03-llm-stage-flows.png', creator: 'Microsoft Corporation',
    readingGuide: ['Links beginnt die Idee mit einem konkreten Unternehmensproblem und passenden Daten.', 'In der Mitte führen Test und Bewertung bei Fehlern zurück zur Verbesserung. „Satisfied?“ braucht vorher festgelegte Kriterien.', 'Rechts stehen Bereitstellung, Überwachung und Integration. Ein größerer Testbestand ersetzt keine kritischen Grenzfälle.'],
    recallQuestion: 'Welche Soll-Werte und Abbruchkriterien brauchst du vor einem Test, damit „zufrieden“ überprüfbar wird?',
  },
  {
    id: 'ai-lifecycle', title: 'Eine KI-Anwendung über ihren Lebenszyklus führen', file: 'ai-lifecycle.png',
    alt: 'Drei verbundene Kreisläufe zeigen Ideenfindung, Entwicklung mit RAG und Evaluation sowie Betrieb mit Kostensteuerung, Monitoring und Rückmeldungen.',
    sourcePath: '14-the-generative-ai-application-lifecycle/images/02-llmops.png', creator: 'Microsoft Corporation',
    readingGuide: ['Blau: Unternehmensbedarf, Hypothese und erste Versuche klären.', 'Rosa: Lösung, Ausnahmen und Qualität iterativ prüfen; RAG und Fine-Tuning sind mögliche Bausteine.', 'Violett: Betrieb, Kosten, Monitoring und kontrollierte Änderungen organisieren. Rückmeldungen können die frühere Entscheidung verändern.'],
    recallQuestion: 'Welche Kosten und Verantwortlichkeiten fehlen, wenn du nur Modellaufrufe und den ersten Prototyp planst?',
  },
  {
    id: 'feedback', title: 'Hilfreiches Feedback sichtbar machen', file: 'feedback.png',
    alt: 'Zwei Chatbeispiele zeigen eine erkennbare Anwendungsgrenze und eine Antwort mit positiven oder negativen Rückmeldemöglichkeiten.',
    sourcePath: '12-designing-ux-for-ai-applications/images/feedback-loops.png', creator: 'Microsoft Corporation',
    readingGuide: ['Links wird eine Anwendungsgrenze sichtbar. Das Beispiel ist keine technische Garantie für die behauptete Trainingsgrenze.', 'Rechts können Nutzer eine Antwort bewerten. Ergänze konkrete Fehlerkategorien und den relevanten Vorgang.', 'Ein Daumen allein misst weder Faktenrichtigkeit noch Zeitgewinn: Verbinde Rückmeldungen mit Qualitäts- und Aufwandsdaten.'],
    recallQuestion: 'Welche Zusatzangabe braucht ein negatives Feedback, damit das Team daraus eine prüfbare Verbesserung ableiten kann?',
  },
  {
    id: 'ux', title: 'Gute KI hilft Menschen bei ihrer Aufgabe', file: 'ux.png',
    alt: 'Vier zusammenhängende Teile nennen Nutzbarkeit, Zugänglichkeit, Zuverlässigkeit und ein angenehmes Nutzungserlebnis.',
    sourcePath: '12-designing-ux-for-ai-applications/images/uxinai.png', creator: 'Microsoft Corporation',
    readingGuide: ['Usability: Eine konkrete Aufgabe muss gut durchführbar sein.', 'Accessibility: Verschiedene Fähigkeiten und Nutzungssituationen berücksichtigen.', 'Reliability und Pleasantness: Ergebnisqualität und verständliche Bedienung gehören zusammen. Ein angenehm formulierter Fehler bleibt ein Fehler.'],
    recallQuestion: 'Wie würdest du Erfolg für eine fachliche Nutzerrolle messen, die mit KI Angebote prüft?',
  },
  {
    id: 'agent', title: 'Ein Agent verbindet Planung, Zustand und Werkzeuge', file: 'agent.png',
    alt: 'Ein Sprachmodell ist mit Zustand und Werkzeugen verbunden. Zustand hält Kontext und Ergebnisse, Werkzeuge erschließen externe Systeme.',
    sourcePath: '17-ai-agents/images/what-agent.png', creator: 'Microsoft Corporation',
    readingGuide: ['LLM: Innerhalb des erlaubten Rahmens können nächste Schritte ausgewählt werden.', 'State: Frühere Eingaben, Ergebnisse und der aktuelle Vorgang bleiben nachvollziehbar.', 'Tools: Werkzeuge öffnen einen begrenzten Handlungsspielraum. Rechte, Kostenlimits und Abbruchbedingungen werden außerhalb freier Modelltexte durchgesetzt.'],
    recallQuestion: 'Was muss der Zustand enthalten, damit ein Timeout keine doppelte externe Aktion auslöst?',
  },
];

type Binding = { id: string; sectionTitle: string };
const mediaBindings: Record<string, Binding> = {
  'w1-l2': { id: 'tokens', sectionTitle: 'Von Token zur Antwort' },
  'w1-l3': { id: 'function-calling', sectionTitle: 'Aufgaben sinnvoll verteilen' },
  'w2-l1': { id: 'prompt-map', sectionTitle: 'Ein Prompt ist ein Arbeitsauftrag' },
  'w2-l2': { id: 'rag', sectionTitle: 'Kontext bewusst zusammenstellen' },
  'w2-l3': { id: 'evaluation-loop', sectionTitle: 'Varianten fair vergleichen' },
  'w3-l3': { id: 'function-calling', sectionTitle: 'Anfrage und Antwort verstehen' },
  'w4-l2': { id: 'rag', sectionTitle: 'RAG: erst finden, dann antworten' },
  'w5-l1': { id: 'evaluation-loop', sectionTitle: 'Ein Golden Set braucht Soll-Werte' },
  'w5-l3': { id: 'evaluation-loop', sectionTitle: 'Änderungen gegen Kontrollen prüfen' },
  'w6-l1': { id: 'ux', sectionTitle: 'Nutzerproblem statt Toolwunsch' },
  'w6-l2': { id: 'ai-lifecycle', sectionTitle: 'Den kleinsten aussagekräftigen Pilot wählen' },
  'w6-l3': { id: 'evaluation-loop', sectionTitle: 'Pilot, Stop-Regeln und Rückfallweg' },
  'w7-l1': { id: 'agent', sectionTitle: 'Workflow: Der Weg steht vorher fest' },
  'w7-l2': { id: 'function-calling', sectionTitle: 'Lesen, entwerfen und verändern getrennt erlauben' },
  'w7-l3': { id: 'agent', sectionTitle: 'Der Zustand erklärt den nächsten erlaubten Schritt' },
  'w8-l3': { id: 'risk-cycle', sectionTitle: 'Änderung oder Vorfall löst neue Prüfung aus' },
  'w9-l1': { id: 'red-team', sectionTitle: 'Bedrohungen vom möglichen Schaden her denken' },
  'w9-l2': { id: 'defense-layers', sectionTitle: 'Mehrere Kontrollen schützen unterschiedliche Übergänge' },
  'w9-l3': { id: 'red-team', sectionTitle: 'Angriffstests und zulässige Fälle gemeinsam wiederholen' },
  'w10-l2': { id: 'ai-lifecycle', sectionTitle: 'Der Nenner sind brauchbare Geschäftsergebnisse' },
  'w11-l2': { id: 'feedback', sectionTitle: 'Adoption gemeinsam mit Qualität und Aufwand messen' },
  'w11-l3': { id: 'ai-lifecycle', sectionTitle: 'Fehlermeldung, Begrenzung und Wiederaufnahme organisieren' },
  'w12-l1': { id: 'ai-lifecycle', sectionTitle: 'Nachweise machen die Wirkung nachvollziehbar' },
  'w12-l2': { id: 'evaluation-loop', sectionTitle: 'Problem, Wirkung und schwierigen Fall zusammen zeigen' },
};

export function mediaForSection(lesson: Lesson, sectionTitle: string): LearningMedia | undefined {
  const binding = mediaBindings[lesson.id];
  // A renamed or replacement imported section must not silently inherit an unrelated image.
  if (!binding || binding.sectionTitle !== sectionTitle) return undefined;
  return learningMedia.find(media => media.id === binding.id);
}

export function mediaSourceUrl(media: LearningMedia): string { return sourceRoot + media.sourcePath; }
