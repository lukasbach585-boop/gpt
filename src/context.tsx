import { createContext, useContext } from 'react';
import type { ContentPack, Progress } from './types';

export type Page = 'dashboard' | 'path' | 'planner' | 'studio' | 'exams' | 'portfolio' | 'notes' | 'library' | 'settings';
export type LearningContext = {
  progress: Progress;
  content: ContentPack;
  updateProgress: (change: (current: Progress) => Progress) => boolean;
  replaceProgress: (value: Progress) => boolean;
  replaceContent: (value: ContentPack) => boolean;
  resetContent: () => boolean;
  notify: (message: string) => void;
  navigate: (page: Page) => void;
  openLesson: (id: string) => void;
  startExam: (scope: string) => void;
  offlineReady: boolean;
  installApp: (() => void) | null;
};

export const Learning = createContext<LearningContext | null>(null);
export function useLearning() {
  const value = useContext(Learning);
  if (!value) throw new Error('Lernkontext fehlt');
  return value;
}
