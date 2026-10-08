import { useId, useMemo } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ExplanationSection, Lesson } from '../types';
import { mediaForSection } from '../data/learning-media';
import { LessonMedia } from './LessonMedia';

const coreTerms = [
  'Künstliche Intelligenz', 'Maschinelles Lernen', 'Generative KI', 'Deep Learning',
  'Large Language Model', 'Kontextfenster', 'Modellparameter', 'Modellwissen',
  'Context Engineering', 'Prompt Injection', 'Golden Set', 'Machine Learning',
  'Informationslücke', 'fachliche Prüfung', 'personenbezogene Daten', 'Datenbank',
  'Sprachmodell', 'Projektzugriff', 'Quellenbeleg', 'Versionsstand', 'Berechtigung',
  'Nacharbeit', 'Fehlerfolgen', 'Freigabe', 'Workflow', 'Agent', 'Inferenz',
  'Retrieval', 'Precision', 'Recall', 'Baseline', 'Token', 'Prompt', 'RAG', 'KI',
];

function escapeRegExp(value: string): string { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/** Plain-text highlighting: every character is rendered by React, never interpreted as markup. */
export function EmphasizedText({ text, emphasis }: { text: string; emphasis?: string[] }) {
  const phrases = [...new Set((emphasis ?? []).map(value => value.trim()).filter(Boolean))].sort((a, b) => b.length - a.length);
  if (!phrases.length) return <>{text}</>;
  const expression = new RegExp(phrases.map(escapeRegExp).join('|'), 'giu');
  const pieces: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(expression)) {
    const start = match.index;
    const value = match[0];
    const end = start + value.length;
    const firstIsWord = /^[\p{L}\p{N}]/u.test(value);
    const lastIsWord = /[\p{L}\p{N}]$/u.test(value);
    if ((firstIsWord && /[\p{L}\p{N}]/u.test(text[start - 1] ?? '')) || (lastIsWord && /[\p{L}\p{N}]/u.test(text[end] ?? ''))) continue;
    if (start > cursor) pieces.push(text.slice(cursor, start));
    pieces.push(<strong key={`phrase-${start}`}>{value}</strong>);
    cursor = end;
  }
  if (cursor < text.length) pieces.push(text.slice(cursor));
  return <>{pieces}</>;
}

function readableParagraphs(text: string): string[] {
  const originals = text.split(/\n\s*\n|\r\n\s*\r\n/).map(value => value.trim()).filter(Boolean);
  return originals.flatMap(original => {
    if (original.length < 280 || !('Segmenter' in Intl)) return [original];
    const sentences = Array.from(new Intl.Segmenter('de', { granularity: 'sentence' }).segment(original), item => item.segment.trim()).filter(Boolean);
    const paragraphs: string[] = [];
    let current = '';
    for (const sentence of sentences) {
      if (current && current.length + sentence.length > 300) { paragraphs.push(current); current = ''; }
      current = current ? `${current} ${sentence}` : sentence;
    }
    if (current) paragraphs.push(current);
    return paragraphs.length ? paragraphs : [original];
  });
}

function headingFrom(text: string): string {
  const beginning = text.slice(0, 170);
  const topic = coreTerms.find(term => beginning.toLocaleLowerCase('de').includes(term.toLocaleLowerCase('de')));
  if (topic) return topic;
  const phrase = beginning.split(/[.!?;:]/)[0].trim();
  const words = phrase.split(/\s+/);
  let title = '';
  for (const word of words) {
    if (title && `${title} ${word}`.length > 64) break;
    title = title ? `${title} ${word}` : word;
  }
  return title || text.slice(0, 64).trim();
}

function fallbackSections(lesson: Lesson): ExplanationSection[] {
  let groups = lesson.concept.filter(text => text.trim()).map(text => readableParagraphs(text));
  if (groups.length === 1 && groups[0].length > 1) {
    const middle = Math.ceil(groups[0].length / 2);
    groups = [groups[0].slice(0, middle), groups[0].slice(middle)];
  }
  if (groups.length > 4) {
    const size = Math.ceil(groups.length / 4);
    groups = Array.from({ length: Math.ceil(groups.length / size) }, (_, index) => groups.slice(index * size, (index + 1) * size).flat());
  }
  return groups.map(paragraphs => ({
    title: headingFrom(paragraphs[0]),
    paragraphs,
    emphasis: coreTerms.filter(term => paragraphs.some(paragraph => paragraph.toLocaleLowerCase('de').includes(term.toLocaleLowerCase('de')))).slice(0, 9),
  }));
}

type InlineDiagram = NonNullable<ExplanationSection['visual']>;

function HierarchyBranch({ items, emphasis, index = 0 }: { items: InlineDiagram['items']; emphasis: string[]; index?: number }) {
  const item = items[index];
  if (!item) return null;
  return <li><div className="lesson-reading-branch"><strong>{item.label}</strong><p><EmphasizedText text={item.text} emphasis={emphasis} /></p></div>{index + 1 < items.length && <ol><HierarchyBranch items={items} emphasis={emphasis} index={index + 1} /></ol>}</li>;
}

function InlineExplanation({ visual, emphasis }: { visual: InlineDiagram; emphasis: string[] }) {
  if (!visual.items.length) return null;
  if (visual.kind === 'hierarchy') return <figure className="lesson-reading-inline lesson-reading-inline-hierarchy"><figcaption>Ebenen im Zusammenhang</figcaption><ol className="lesson-reading-tree"><HierarchyBranch items={visual.items} emphasis={emphasis} /></ol></figure>;
  if (visual.kind === 'comparison') return <figure className="lesson-reading-inline lesson-reading-inline-comparison"><figcaption>Im direkten Vergleich</figcaption><dl className="lesson-reading-compare" style={{ '--items': visual.items.length } as CSSProperties}>{visual.items.map((item, index) => <div key={index}><dt>{item.label}</dt><dd><EmphasizedText text={item.text} emphasis={emphasis} /></dd></div>)}</dl></figure>;
  if (visual.kind === 'equation') return <figure className="lesson-reading-inline lesson-reading-inline-equation"><figcaption>Der Rechenweg</figcaption><ol className="lesson-reading-equation">{visual.items.map((item, index) => {
    const parts = item.label.match(/^([+\-−×*\/÷=])\s+(.+)$/u);
    return <li key={index}>{parts && <span className="lesson-reading-operator">{parts[1]}</span>}<div><strong>{parts ? parts[2] : item.label}</strong><p><EmphasizedText text={item.text} emphasis={emphasis} /></p></div></li>;
  })}</ol></figure>;
  return <figure className="lesson-reading-inline lesson-reading-inline-flow"><figcaption>Schritt für Schritt</figcaption><ol className="lesson-reading-flow" style={{ '--items': visual.items.length } as CSSProperties}>{visual.items.map((item, index) => <li key={index}><div className="lesson-reading-flow-node"><span className="lesson-reading-flow-number" aria-hidden="true">{index + 1}</span><strong>{item.label}</strong><p><EmphasizedText text={item.text} emphasis={emphasis} /></p></div>{index + 1 < visual.items.length && <ArrowRight className="lesson-reading-connector" size={20} aria-hidden="true" />}</li>)}</ol></figure>;
}

export function LessonExplanation({ lesson, compact = false }: { lesson: Lesson; compact?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const sections = useMemo(() => lesson.explanationSections?.length ? lesson.explanationSections : fallbackSections(lesson), [lesson]);
  if (!sections.length) return null;

  function jumpTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
  }

  return <div className={`lesson-reading ${compact ? 'lesson-reading-compact' : ''}`}>
    <nav className="lesson-reading-toc" aria-labelledby={`${uid}-overview`}><p id={`${uid}-overview`} className="lesson-reading-toc-title">Das lernst du in dieser Lektion</p><ol>{sections.map((section, index) => <li key={index}><a href={`#${uid}-section-${index}`} onClick={event => jumpTo(event, `${uid}-section-${index}`)}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.title}<ArrowRight size={16} aria-hidden="true" /></a></li>)}</ol>{compact && <p className="lesson-reading-compact-note">Kompakt lesen: Die Kernabsätze sind sichtbar. Du kannst jeden Abschnitt vollständig aufklappen.</p>}</nav>
    {sections.map((section, index) => {
      const media = mediaForSection(lesson, section.title);
      const paragraphs = section.paragraphs.flatMap(readableParagraphs);
      const shown = compact ? paragraphs.slice(0, 1) : paragraphs;
      const more = compact ? paragraphs.slice(1) : [];
      return <section key={index} id={`${uid}-section-${index}`} className="lesson-reading-section" tabIndex={-1} aria-labelledby={`${uid}-section-title-${index}`}><div className="lesson-reading-section-header"><span className="lesson-reading-section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h2 className="lesson-reading-heading" id={`${uid}-section-title-${index}`}>{section.title}</h2></div><div className="lesson-reading-text">{shown.map((paragraph, paragraphIndex) => <p key={paragraphIndex}><EmphasizedText text={paragraph} emphasis={section.emphasis} /></p>)}{more.length > 0 && <details className="lesson-reading-more"><summary>Abschnitt vollständig lesen<ArrowRight size={16} aria-hidden="true" /></summary>{more.map((paragraph, paragraphIndex) => <p key={paragraphIndex}><EmphasizedText text={paragraph} emphasis={section.emphasis} /></p>)}</details>}{!!section.bullets?.length && <ul className="lesson-reading-bullets">{section.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}><EmphasizedText text={bullet} emphasis={section.emphasis} /></li>)}</ul>}</div>{section.visual && <InlineExplanation visual={section.visual} emphasis={section.emphasis} />}{media && <LessonMedia media={media} compact={compact} />}</section>;
    })}
  </div>;
}
