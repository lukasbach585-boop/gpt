import type { ContentPack, Phase } from '../types';
import { earlyWeeks } from './weeks-early';
import { lateWeeks } from './weeks-late';
import { earlyLearningVisuals } from './visuals-early';
import { lateLearningVisuals } from './visuals-late';
import { earlyExplanationSections } from './explanations-early';
import { lateExplanationSections } from './explanations-late';
import sourceLibrary from './source-library.json';

export const phases: Phase[] = [
  { id: 1, title: 'KI und Sprachmodelle verstehen', short: 'KI-Grundlagen', description: 'Ein belastbares Verständnis statt großer Versprechen.', weeks: [1], color: 'sage', icon: 'brain' },
  { id: 2, title: 'Prompts und Projektkontext gestalten', short: 'Prompting & Kontext', description: 'Klare Arbeitsaufträge und überprüfbare Ergebnisse.', weeks: [2], color: 'peach', icon: 'sparkles' },
  { id: 3, title: 'Daten und Schnittstellen beherrschen', short: 'Daten & APIs', description: 'Kennungen, Formate und Schnittstellen richtig einordnen.', weeks: [3], color: 'blue', icon: 'link' },
  { id: 4, title: 'Eine verlässliche Dokumentenwissensbasis bauen', short: 'Dokumente & RAG', description: 'Richtige Quellen, gültige Versionen, kontrollierter Zugriff.', weeks: [4], color: 'lilac', icon: 'database' },
  { id: 5, title: 'Qualität messen und Fehler erklären', short: 'Evaluation', description: 'Testsets, kritische Fehler und nachvollziehbare Reviews.', weeks: [5], color: 'blue', icon: 'sliders' },
  { id: 6, title: 'KI Produkte und Prozesse planen', short: 'Produkt & Pilot', description: 'Ein messbares Problem, ein begründeter erster Schritt.', weeks: [6], color: 'peach', icon: 'workflow' },
  { id: 7, title: 'Agenten und Automationen begrenzen', short: 'Workflows & Agenten', description: 'Rechte, Zustände, Freigaben und sichere Fehlerwege.', weeks: [7], color: 'sage', icon: 'workflow' },
  { id: 8, title: 'Governance und Datenschutz operationalisieren', short: 'Governance', description: 'Verantwortung und Kontrollen im Alltag verankern.', weeks: [8], color: 'lilac', icon: 'shield' },
  { id: 9, title: 'Sicherheit für KI Systeme planen', short: 'Security', description: 'Angriffe verstehen, Zugriff begrenzen, Schutz testen.', weeks: [9], color: 'sage', icon: 'shield' },
  { id: 10, title: 'Nutzen Kosten und Anbieter bewerten', short: 'Business Case', description: 'Mit akzeptierten Ergebnissen und echten Gesamtkosten rechnen.', weeks: [10], color: 'peach', icon: 'matrix' },
  { id: 11, title: 'Menschen befähigen und den Betrieb organisieren', short: 'Adoption & Betrieb', description: 'Rollen, Schulung, Feedback und laufende Verbesserung.', weeks: [11], color: 'blue', icon: 'brain' },
  { id: 12, title: 'Ein überprüfbares Portfolio vorlegen', short: 'Dein Capstone', description: 'Business, Technik, Qualität und Verantwortung verbinden.', weeks: [12], color: 'lilac', icon: 'award' },
];

const learningVisuals = { ...earlyLearningVisuals, ...lateLearningVisuals };
const explanationSections = { ...earlyExplanationSections, ...lateExplanationSections };

export const baseContent: ContentPack = {
  schemaVersion: 1,
  version: '2.2.0',
  reviewedAt: '2026-10-07',
  title: 'KI-Management · 12 Module, 48 Lernwochen',
  weeks: [...earlyWeeks, ...lateWeeks].map(week => ({
    ...week,
    lessons: week.lessons.map(lesson => ({ ...lesson, learningVisual: learningVisuals[lesson.id], explanationSections: explanationSections[lesson.id] })),
  })),
  library: sourceLibrary,
};

export const certificateRoutes = [
  { title: 'OpenAI Academy', subtitle: 'AI Foundations', text: 'KI-Grundlagen und praktische Anwendung vertiefen. Aktuelle Assessments und Badge-Bedingungen direkt beim Anbieter prüfen.', url: 'https://academy.openai.com/public/courses/ai-foundations-dnq5w', tag: 'Grundlagen' },
  { title: 'Google AI Essentials', subtitle: 'KI im Arbeitsalltag', text: 'Die Anwendung von KI, Prompting und verantwortliche Nutzung. Kurszugang, Kosten und Leistungsnachweise beim Anbieter prüfen.', url: 'https://www.coursera.org/specializations/ai-essentials-google', tag: 'Anwendung' },
  { title: 'AI for Everyone', subtitle: 'DeepLearning.AI', text: 'KI-Strategie und Projektlogik für Entscheider. Als Ergänzung zu deinem persönlichen Lernpfad geeignet.', url: 'https://www.deeplearning.ai/courses/ai-for-everyone', tag: 'Management' },
];

export const methods = [
  { title: 'Active Recall', text: 'Erst aus dem Gedächtnis antworten, dann nachsehen. Abrufen stärkt Wissen mehr als wiederholtes Lesen.' },
  { title: 'Spaced Repetition', text: 'Schwierige Karten kommen früher zurück. Sichere Karten nach zunehmend längeren Abständen.' },
  { title: 'Feynman-Methode', text: 'Erkläre ein Konzept in 60 Sekunden, ohne Fachwörter. Eine Lücke in deiner Erklärung ist dein nächster Lernschritt.' },
  { title: 'Lernen durch Transfer', text: 'Wende ein Konzept auf einen konkreten Unternehmensfall an. Vergleiche danach mit der Musterlösung.' },
];
