export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
};
export type LearningVisual = {
  kind: 'flow' | 'comparison' | 'layers' | 'document' | 'matrix' | 'scorecard' | 'cycle' | 'timeline';
  title: string;
  caption: string;
  steps: {
    title: string;
    detail: string;
    example: string;
    icon: 'brain' | 'document' | 'database' | 'search' | 'spark' | 'shield' | 'check' | 'person' | 'chart' | 'target' | 'settings' | 'clock';
  }[];
  connections?: string[];
  takeaway: string;
};
export type ExplanationSection = {
  title: string;
  paragraphs: string[];
  emphasis: string[];
  bullets?: string[];
  visual?: {
    kind: 'flow' | 'comparison' | 'equation' | 'hierarchy';
    items: { label: string; text: string }[];
  };
};
export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  concept: string[];
  keyPoints: string[];
  example: { title: string; text: string };
  privateUse: string;
  exercise: string;
  reflection: string;
  visual: 'hierarchy' | 'tokens' | 'workflow' | 'rag' | 'compare' | 'shield' | 'loop' | 'matrix';
  learningVisual?: LearningVisual;
  explanationSections?: ExplanationSection[];
};
export type Flashcard = { id: string; front: string; back: string; week: number };
export type Week = {
  id: number;
  phase: number;
  title: string;
  subtitle: string;
  outcomes: string[];
  lessons: Lesson[];
  questions: Question[];
  flashcards: Flashcard[];
  challenge: { title: string; scenario: string; task: string; rubric: string[]; sample: string };
  resources: { title: string; url: string }[];
};
export type Phase = { id: number; title: string; short: string; description: string; weeks: number[]; color: string; icon: string };
export type SourceLibrary = typeof import('./data/source-library.json');
export type ContentPack = { schemaVersion: 1; version: string; reviewedAt: string; title: string; weeks: Week[]; library?: SourceLibrary };
export type ReviewState = { due: string; interval: number; ease: number; repetitions: number };
export type ExamAttempt = { id: string; date: string; label: string; scope: string; correct: number; total: number; minutes: number; wrongIds: string[] };
export type Note = { id: string; title: string; body: string; week: number; updated: string };
export type Progress = {
  schemaVersion: 1;
  completed: string[];
  bookmarks: string[];
  reviews: Record<string, ReviewState>;
  notes: Note[];
  attempts: ExamAttempt[];
  activity: Record<string, number>;
  profile: { name: string; goalMinutes: number; sessionMinutes: number; focus: 'business' | 'private' | 'both'; startDate: string };
  lastLesson: string | null;
  practice: Record<string, { text: string; checked: number[] }>;
};
