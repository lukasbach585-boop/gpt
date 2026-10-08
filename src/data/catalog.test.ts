import { describe, expect, it } from 'vitest';
import { validateContentPack } from '../lib/learning';
import { baseContent, phases } from './catalog';
import sourceLibrary from './source-library.json';
import { earlyLearningVisuals } from './visuals-early';
import { lateLearningVisuals } from './visuals-late';
import { earlyExplanationSections } from './explanations-early';
import { lateExplanationSections } from './explanations-late';

describe('Ausgelieferter Lernkatalog', () => {
  it('validates the complete current catalog including its original source library', () => {
    const pack = validateContentPack(baseContent);
    expect(pack.schemaVersion).toBe(1);
    // The file schema and the expanded learning-content release have independent versions.
    expect(pack.version).toBe('2.2.0');
    expect(pack.library?.schema_version).toBe('1.0');
    expect(pack.weeks).toHaveLength(12);
    expect(pack.weeks.flatMap(week => week.lessons)).toHaveLength(36);
    expect(pack.weeks.flatMap(week => week.questions)).toHaveLength(60);
    expect(pack.library).toEqual(sourceLibrary);
    expect(pack.library?.resources).toHaveLength(69);
    expect(pack.library?.monthly_plan).toHaveLength(12);
  });

  it('contains each module and content identifier once with matching phase navigation', () => {
    expect(baseContent.weeks.map(week => week.id)).toEqual(Array.from({ length: 12 }, (_, index) => index + 1));
    const ids = baseContent.weeks.flatMap(week => [...week.lessons, ...week.questions, ...week.flashcards].map(item => item.id));
    expect(new Set(ids).size).toBe(ids.length);
    expect(phases).toHaveLength(12);
    for (const module of sourceLibrary.modules) {
      const id = Number(module.id.slice(1));
      const phase = phases.find(item => item.id === id);
      expect(phase?.weeks).toEqual([id]);
      expect(phase?.title).toBe(module.title);
      expect(baseContent.weeks.find(week => week.id === id)?.phase).toBe(id);
    }
  });

  it('provides a distinct illustrated learning case for every lesson with no unmatched graphics', () => {
    const lessons = baseContent.weeks.flatMap(week => week.lessons);
    const graphics = { ...earlyLearningVisuals, ...lateLearningVisuals };
    expect(Object.keys(graphics).sort()).toEqual(lessons.map(lesson => lesson.id).sort());
    expect(new Set(lessons.map(lesson => lesson.learningVisual?.title)).size).toBe(36);
    expect(new Set(lessons.map(lesson => lesson.learningVisual?.kind)).size).toBeGreaterThanOrEqual(7);
    for (const lesson of lessons) {
      expect(lesson.learningVisual, lesson.id).toBeDefined();
      expect(lesson.learningVisual?.steps.length, lesson.id).toBeGreaterThanOrEqual(3);
      expect(lesson.learningVisual?.steps.every(step => step.example.trim().length > 0), lesson.id).toBe(true);
    }
  });

  it('gives every lesson readable sections, relevant emphasis and an inline explanation diagram', () => {
    const lessons = baseContent.weeks.flatMap(week => week.lessons);
    const explanations = { ...earlyExplanationSections, ...lateExplanationSections };
    expect(Object.keys(explanations).sort()).toEqual(lessons.map(lesson => lesson.id).sort());
    for (const lesson of lessons) {
      const sections = lesson.explanationSections!;
      expect(sections.length, lesson.id).toBeGreaterThanOrEqual(2);
      expect(sections.length, lesson.id).toBeLessThanOrEqual(5);
      expect(sections.some(section => section.visual), lesson.id).toBe(true);
      for (const section of sections) {
        const text = [...section.paragraphs, ...(section.bullets || [])].join(' ').toLocaleLowerCase('de-DE');
        for (const phrase of section.emphasis) expect(text, `${lesson.id}: ${phrase}`).toContain(phrase.toLocaleLowerCase('de-DE'));
        for (const paragraph of section.paragraphs) expect(paragraph.length, `${lesson.id}: ${section.title}`).toBeLessThanOrEqual(700);
      }
    }
  });

  it('retains source lesson titles, self-checks and portfolio requirements, with the numeric-zero clarification', () => {
    for (const module of sourceLibrary.modules) {
      const week = baseContent.weeks.find(item => item.id === Number(module.id.slice(1)));
      expect(week, module.id).toBeDefined();
      expect(week?.title, module.id).toBe(module.title);
      expect(week?.lessons.map(lesson => lesson.title), module.id).toEqual(module.lessons.map(lesson => lesson[0]));
      expect(week?.outcomes, module.id).toEqual(module.completion_criteria);
      // The source's word "null" is clarified as the number 0 in the quiz,
      // so it cannot be confused with JSON null from the same data lesson.
      const expectedPrompts = module.self_check.map(check => check.question === 'Ist eine fehlende Menge gleich null?' ? 'Ist eine fehlende Menge gleich der Zahl 0?' : check.question);
      expect(week?.questions.map(question => question.prompt), module.id).toEqual(expect.arrayContaining(expectedPrompts));
      expect(week?.challenge.title, module.id).toBe(module.practice_task);
      expect(week?.challenge.rubric, module.id).toEqual(expect.arrayContaining(module.completion_criteria));
      for (const step of module.practice_steps) expect(week?.challenge.task, module.id).toContain(step);
    }
  });

  it('connects every module source ID to its exact original title and HTTPS URL', () => {
    const sources = new Map(sourceLibrary.resources.map(resource => [resource.id, resource]));
    const displayed = baseContent.weeks.flatMap(week => week.resources);
    expect(displayed).toHaveLength(69);
    for (const module of sourceLibrary.modules) {
      const week = baseContent.weeks.find(item => item.id === Number(module.id.slice(1)));
      const expected = module.source_ids.map(id => {
        const source = sources.get(id);
        expect(source, id).toBeDefined();
        return { title: source!.title, url: source!.url };
      });
      expect(week?.resources, module.id).toEqual(expected);
    }
    for (const resource of sourceLibrary.resources) {
      expect(displayed).toContainEqual({ title: resource.title, url: resource.url });
      expect(new URL(resource.url).protocol).toBe('https:');
      expect(new URL(resource.evidence_url).protocol).toBe('https:');
      expect(baseContent.library?.resources.find(source => source.id === resource.id)).toEqual(resource);
    }
  });

  it('exports and imports all content, schedules and source-verification metadata without loss', () => {
    const exported = JSON.stringify(validateContentPack(baseContent));
    const imported = validateContentPack(JSON.parse(exported));
    expect(imported).toEqual(baseContent);
    expect(imported.library?.study_assumptions).toEqual(sourceLibrary.study_assumptions);
    expect(imported.library?.templates).toEqual(sourceLibrary.templates);
    expect(imported.library?.capstone).toEqual(sourceLibrary.capstone);
    expect(imported.library?.resources[0].provider_duration).toBeNull();
    expect(imported.library?.resources[0].verified_on).toBe(sourceLibrary.resources[0].verified_on);
    expect(imported.library?.resources[0].verification_method).toBe(sourceLibrary.resources[0].verification_method);
    expect(imported.library?.resources[3].access_note).toBe('');
  });
});
