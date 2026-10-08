import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookOpen, Check, CheckCircle2, ChevronRight, Clock3, Lightbulb, MessageCircle, Pause, PenLine, Volume2, X } from 'lucide-react';
import { useLearning } from '../context';
import { nextLesson } from '../lib/learning';
import { ConceptVisual } from './Visuals';
import { LessonGraphic } from './LessonGraphic';

export function LessonReader({ id, close }: { id: string; close: () => void }) {
  const { content, progress, updateProgress, notify, openLesson, startExam } = useLearning();
  const week = content.weeks.find(w => w.lessons.some(l => l.id === id))!;
  const lesson = week.lessons.find(l => l.id === id)!;
  const index = week.lessons.findIndex(l => l.id === id);
  const question = week.questions[index % week.questions.length];
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [reflection, setReflection] = useState(progress.notes.find(n => n.id === `lesson-${id}`)?.body || '');
  const [speaking, setSpeaking] = useState(false);
  const [completedNow, setCompletedNow] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const compact = progress.profile.sessionMinutes === 5;
  const focused = progress.profile.sessionMinutes === 45;
  const completed = progress.completed.includes(id);
  const bookmarked = progress.bookmarks.includes(id);
  const steps = [{ title: 'Verstehen', icon: BookOpen }, { title: 'Anwenden', icon: Lightbulb }, { title: 'Erklären', icon: MessageCircle }, { title: 'Wissen prüfen', icon: CheckCircle2 }];
  useEffect(() => {
    dialog.current?.focus();
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, []);
  useEffect(() => { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); setSpeaking(false); } }, [step]);
  function readAloud() {
    if (!('speechSynthesis' in window)) { notify('Dein Browser unterstützt das Vorlesen nicht.'); return; }
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const text = step === 0 ? [lesson.title, ...lesson.concept, ...lesson.keyPoints].join('. ') : step === 1 ? `${lesson.example.title}. ${lesson.example.text}. ${lesson.privateUse}. ${lesson.exercise}` : step === 2 ? lesson.reflection : question.prompt;
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'de-DE'; utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false); utterance.onerror = () => { setSpeaking(false); notify('Vorlesen ist auf diesem Gerät gerade nicht verfügbar.'); };
    window.speechSynthesis.speak(utterance); setSpeaking(true);
  }
  function complete() {
    if (!checked || selection !== question.correct) return;
    const saved = updateProgress(p => ({ ...p, completed: [...new Set([...p.completed, id])], lastLesson: id }));
    if (!saved) return;
    setCompletedNow(true);
  }
  function saveReflection() {
    if (!reflection.trim()) { notify('Schreibe zuerst deine Erklärung auf.'); return; }
    const saved = updateProgress(p => ({ ...p, notes: [...p.notes.filter(n => n.id !== `lesson-${id}`), { id: `lesson-${id}`, title: `Meine Erklärung: ${lesson.title}`.slice(0, 200), body: reflection.trim(), week: week.id, updated: new Date().toISOString() }] }));
    if (saved) notify('Deine Erklärung wurde in deinen Notizen gespeichert.');
  }
  const upcoming = nextLesson(content.weeks, progress);
  return <div className="reader-overlay" role="dialog" aria-modal="true" aria-labelledby="lesson-title" tabIndex={-1} ref={dialog}><header className="reader-header"><button className="btn btn-ghost" onClick={close}><ArrowLeft size={17} /><span>Zurück zum Lernraum</span></button><div className="reader-top-progress"><span>Modul {week.id} · Lektion {index + 1} von {week.lessons.length}</span><div className="progress-track"><span style={{ width: `${(step + 1) / 4 * 100}%` }} /></div></div><button className="icon-button" aria-label="Lektion schließen" onClick={close}><X size={22} /></button></header><div className="reader-layout"><aside className="reader-sidebar"><span className="eyebrow">MODUL {String(week.id).padStart(2, '0')}</span><h3>{week.title}</h3><p>{compact ? 'Deine kompakte Lerneinheit.' : 'Vom Verstehen zur Anwendung.'}</p><nav aria-label="Lernschritte">{steps.map(({ title, icon: Icon }, i) => <button className={step === i ? 'active' : ''} aria-current={step === i ? 'step' : undefined} key={title} onClick={() => setStep(i)}><span>{step > i ? <Check size={16} /> : <Icon size={16} />}</span>{title}<ChevronRight size={14} /></button>)}</nav><div className="reader-tip"><Lightbulb size={20} /><strong>Ein Schritt nach dem anderen.</strong><p>Du musst nicht alles sofort behalten. Gute Fragen sind genauso wertvoll wie gute Antworten.</p></div><span className="meta"><Clock3 size={14} />{compact ? '5 Min. kompakt' : `${lesson.minutes} Min. Orientierung`}</span></aside><main className="reader-content">{completedNow ? <div className="lesson-success"><span className="success-icon"><Check size={38} /></span><span className="eyebrow">EIN SCHRITT WEITER</span><h1 id="lesson-title">Das sitzt schon besser.</h1><p>Du hast „{lesson.title}“ abgeschlossen. Die Karteikarten dieses Moduls stehen jetzt für deine Wiederholung bereit.</p><div className="button-row"><button className="btn btn-primary" onClick={() => { if (upcoming) openLesson(upcoming.lesson.id); else close(); }}>{upcoming ? 'Nächste Lektion' : 'Zurück zum Lernraum'}<ArrowRight size={17} /></button>{focused && <button className="btn btn-secondary" onClick={() => startExam(`week:${week.id}`)}>Modulwissen vertiefen <CheckCircle2 size={17} /></button>}<button className="btn btn-secondary" onClick={close}>Für heute geschafft</button></div><p className="fine-print">Eine Pause hilft deinem Gedächtnis. Du lernst in deinem Tempo.</p></div> : <><div className="reader-content-top"><span className="badge badge-sage">{compact ? 'KOMPAKTMODUS · ' : focused ? 'FOKUSMODUS · ' : ''}{steps[step].title.toUpperCase()}</span><div className="button-row"><button className={`icon-button ${bookmarked ? 'active' : ''}`} aria-label={bookmarked ? 'Lesezeichen entfernen' : 'Lesezeichen speichern'} onClick={() => updateProgress(p => ({ ...p, bookmarks: bookmarked ? p.bookmarks.filter(v => v !== id) : [...p.bookmarks, id] }))}><Bookmark size={19} fill={bookmarked ? 'currentColor' : 'none'} /></button><button className="btn btn-ghost" onClick={readAloud}>{speaking ? <Pause size={17} /> : <Volume2 size={17} />}<span>{speaking ? 'Anhalten' : 'Vorlesen'}</span></button></div></div><h1 id="lesson-title">{lesson.title}</h1><p className="reader-intro">{lesson.summary}</p>
      {step === 0 && <>
        {lesson.learningVisual ? <LessonGraphic visual={lesson.learningVisual} compact={compact} /> : <ConceptVisual kind={lesson.visual} />}
        {focused && <div className="callout focus-plan"><strong>Dein 45-Minuten-Lernblock</strong><p>10 Minuten verstehen · 15 Minuten ausprobieren · 10 Minuten erklären · 10 Minuten für den Modultest. Nutze die Aufteilung als Orientierung und nimm dir für schwierige Themen mehr Zeit.</p></div>}
        <details className="lesson-explanation" open={!compact} key={`${id}-${compact}`}><summary><BookOpen size={17} aria-hidden="true" />Die Grafik in Worten erklärt<ChevronRight size={16} aria-hidden="true" /></summary><div className="lesson-prose">{(compact ? lesson.concept.slice(0, 1) : lesson.concept).map((p, i) => <p key={i}>{p}</p>)}</div></details>
        <section className="key-points"><span className="eyebrow"><SparkleMark /> DAS NIMMST DU MIT</span><ul>{lesson.keyPoints.map(p => <li key={p}><CheckCircle2 size={17} />{p}</li>)}</ul></section>{compact && <button className="text-link" onClick={() => updateProgress(p => ({ ...p, profile: { ...p.profile, sessionMinutes: 15 } }))}>Mehr Zeit? Vollständige Erklärung lesen <ArrowRight size={15} /></button>}
      </>}
      {step === 1 && <>
        <section className="example-block"><span className="eyebrow">IM UNTERNEHMEN</span><h2>{lesson.example.title}</h2>{lesson.learningVisual && <LessonGraphic visual={lesson.learningVisual} compact />}<p>{lesson.example.text}</p></section>
        {progress.profile.focus !== 'business' && <section className="private-block"><span className="eyebrow">AUCH PRIVAT NÜTZLICH</span><p>{lesson.privateUse}</p></section>}<section className="exercise-block"><span className="phase-icon peach"><PenLine size={23} /></span><h2>Jetzt bist du dran.</h2><p>{lesson.exercise}</p><label className="field"><span>Deine Beobachtung oder dein Ergebnis</span><textarea rows={4} maxLength={20000} value={progress.practice[id]?.text || ''} onChange={e => updateProgress(p => ({ ...p, practice: { ...p.practice, [id]: { text: e.target.value, checked: [] } } }))} placeholder="Was hast du beobachtet? Was würdest du anders machen?" /></label><span className="fine-print">Automatisch gespeichert. Für externe KI-Tests nur freigegebene Daten verwenden.</span></section>
      </>}
      {step === 2 && <>
        {lesson.learningVisual && <LessonGraphic visual={lesson.learningVisual} compact={compact} recall />}
        <section className="explain-block"><span className="phase-icon sage"><MessageCircle size={25} /></span><h2>Kannst du es einfach erklären?</h2><p className="reflection-question">{lesson.reflection}</p><div className="callout"><strong>Die 60-Sekunden-Methode</strong><p>Erkläre das Konzept laut oder schreibe es auf. Verwende ein konkretes Beispiel und nenne eine Grenze. Du kannst einen Timer auf deinem Handy verwenden.</p></div><label className="field"><span>Deine Erklärung in eigenen Worten</span><textarea rows={6} maxLength={20000} value={reflection} onChange={e => setReflection(e.target.value)} placeholder="Stell dir vor, ein Kollege hat noch nie davon gehört …" /></label><button className="btn btn-secondary" onClick={saveReflection}><PenLine size={16} />Als Lernnotiz speichern</button></section>
      </>}
      {step === 3 && <section className="lesson-check"><span className="eyebrow">EIN KURZER WISSENSCHECK</span><h2>{question.prompt}</h2><div className="question-options">{question.options.map((option, i) => <button key={i} disabled={checked} className={`question-option ${selection === i ? 'selected' : ''} ${checked && i === question.correct ? 'correct' : ''} ${checked && selection === i && i !== question.correct ? 'incorrect' : ''}`} onClick={() => setSelection(i)}><span>{String.fromCharCode(65 + i)}</span>{option}{checked && i === question.correct && <Check size={19} />}</button>)}</div>{checked && <div className={`answer-feedback ${selection === question.correct ? 'positive' : 'negative'}`}><strong>{selection === question.correct ? 'Richtig eingeordnet.' : 'Hier lohnt sich ein zweiter Blick.'}</strong><p>{question.explanation}</p></div>}{!checked ? <button className="btn btn-primary" disabled={selection === null} onClick={() => setChecked(true)}>Antwort prüfen <ArrowRight size={16} /></button> : selection !== question.correct ? <button className="btn btn-secondary" onClick={() => { setChecked(false); setSelection(null); }}>Noch einmal versuchen <RotateIcon /></button> : <button className="btn btn-primary" onClick={complete}>{completed ? 'Wiederholung abschließen' : 'Lektion abschließen'}<Check size={18} /></button>}</section>}
      <footer className="reader-footer"><button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(v => v - 1)}><ArrowLeft size={16} />Zurück</button><span>{step + 1} / 4 Lernschritte</span>{step < 3 ? <button className="btn btn-primary" onClick={() => setStep(v => v + 1)}>{steps[step + 1].title}<ArrowRight size={16} /></button> : <span className="meta">{completed && <><Check size={14} />Bereits gelernt</>}</span>}</footer>
    </>}</main></div></div>;
}
function SparkleMark() { return <span>✦</span>; }
function RotateIcon() { return <ArrowLeft size={16} />; }
