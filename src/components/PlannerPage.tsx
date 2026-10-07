import { useState } from 'react';
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock3, FileCheck2, Flag, Layers, Target } from 'lucide-react';
import { useLearning } from '../context';
import sourceLibrary from '../data/source-library.json';

export function PlannerPage() {
  const { content, progress, updateProgress, openLesson, navigate, startExam } = useLearning();
  const library = content.library || sourceLibrary;
  const plans = library.monthly_plan;
  const assumptions = library.study_assumptions;
  const hours = (n: number) => Number(n.toFixed(1));
  const firstOpen = plans.find(p => (progress.practice[`plan-month-${p.month}`]?.checked.length || 0) < 4)?.month || 12;
  const [selected, setSelected] = useState(firstOpen);
  const [expanded, setExpanded] = useState<number | null>(0);
  const plan = plans.find(p => p.month === selected)!;
  const work = progress.practice[`plan-month-${selected}`] || { text: '', checked: [] };
  const completedMonths = plans.filter(p => (progress.practice[`plan-month-${p.month}`]?.checked.length || 0) === 4).length;
  const completedWeeks = plans.reduce((sum, p) => sum + (progress.practice[`plan-month-${p.month}`]?.checked.length || 0), 0);
  const weeks = Array.from({ length: 4 }, (_, i) => ({
    week: (plan.month - 1) * 4 + i + 1,
    title: ['Verstehen & einordnen', 'Anwenden & dokumentieren', 'Testen & verbessern', 'Erklären & nachweisen'][i],
    learning: selected === 1 ? library.start_30_days[i].learning : [
      `Lies die ausgewählten Abschnitte aus ${plan.source_ids.slice(0, 2).join(' und ')}. Halte zentrale Begriffe und offene Fragen fest.`,
      `Vertiefe ${plan.module_ids.join(', ')} anhand der Quellen und des ersten Praxisentwurfs.`,
      'Vergleiche deinen Entwurf mit den Abschlusskriterien der zugehörigen Module. Prüfe schwierige Fälle.',
      `Wiederhole die Begriffe, erkläre das Thema ohne Nachschlagen und beantworte: ${plan.review}`,
    ][i],
    practice: selected === 1 ? library.start_30_days[i].practice : [
      `Beschreibe Ziel, Daten und Grenzen für dein Monatsergebnis: ${plan.artifact}.`,
      `Erarbeite einen ersten Entwurf: ${plan.artifact}. Nutze passende Portfolio-Vorlagen.`,
      'Teste den Entwurf an typischen Fällen, Widersprüchen und Informationslücken. Halte Fehler und Korrekturen fest.',
      `Überarbeite dein Ergebnis, ordne die Belege zu und prüfe: ${plan.review}`,
    ][i],
    proof: selected === 1 ? library.start_30_days[i].proof : [
      'Notizen, ausgewählte Quellen und eine begründete Aufgabenbeschreibung',
      `Erster Entwurf: ${plan.artifact}`,
      'Prüfprotokoll mit Ergebnissen, Fehlern und Verbesserungen',
      plan.artifact,
    ][i],
    theory: hours(plan.theory_hours * [0.5, 1 / 3, 1 / 6, 0][i]), practiceHours: hours(plan.practice_hours * [2 / 14, 3 / 14, 4 / 14, 5 / 14][i]), review: hours(plan.review_hours / 4),
  }));
  return <><div className="page-heading"><div className="eyebrow">VOM WISSEN ZUM NACHWEIS</div><h1>Ein Jahr. Dein eigener Lernrhythmus.</h1><p className="page-description">{assumptions.planned_weeks} Lernwochen und {assumptions.annual_buffer_weeks} Pufferwochen. Plane längere Praxiszeiten und nutze kleine Pausen zum Wiederholen.</p></div><div className="plan-stats"><div className="card"><CalendarDays size={22} /><strong>{completedMonths}<span> / 12</span></strong><p>Monate selbst überprüft</p></div><div className="card"><Layers size={22} /><strong>{completedWeeks}<span> / 48</span></strong><p>Lernwochen dokumentiert</p></div><div className="card"><Clock3 size={22} /><strong>{assumptions.weekly_hours}<span> h / Woche</span></strong><p>Planwert · individuell anpassbar</p></div><div className="card"><FileCheck2 size={22} /><strong>{assumptions.planned_hours}<span> Stunden</span></strong><p>{plan.theory_hours} h Theorie · {plan.practice_hours} h Praxis · {plan.review_hours} h Review diesen Monat</p></div></div><div className="month-selector" aria-label="Lernmonat auswählen">{plans.map(p => <button className={`${selected === p.month ? 'active' : ''} ${(progress.practice[`plan-month-${p.month}`]?.checked.length || 0) === 4 ? 'done' : ''}`} key={p.month} onClick={() => { setSelected(p.month); setExpanded(0); }}><span>MONAT</span><strong>{String(p.month).padStart(2, '0')}</strong>{(progress.practice[`plan-month-${p.month}`]?.checked.length || 0) === 4 && <Check size={12} />}</button>)}</div><section className="card month-detail"><div className="month-detail-heading"><div><span className="eyebrow">MONAT {selected} · LERNWOCHEN {(selected - 1) * 4 + 1}–{selected * 4}</span><h2>{plan.focus}</h2><p>Dein Ergebnis: <strong>{plan.artifact}</strong></p></div><span className="badge badge-sage">{work.checked.length} / 4 Wochen überprüft</span></div><div className="plan-modules">{plan.module_ids.map(id => { const module = content.weeks.find(w => w.id === Number(id.slice(1))); return module && <button className="btn btn-secondary" key={id} onClick={() => openLesson(module.lessons[0].id)}><BookIcon />{id} · {module.title}<ArrowRight size={14} /></button>; })}</div><div className="weekly-plan">{weeks.map((w, i) => <article className={`plan-week ${work.checked.includes(i) ? 'done' : ''}`} key={w.week}><div className="plan-week-header"><label className="plan-week-check"><input type="checkbox" checked={work.checked.includes(i)} onChange={() => updateProgress(p => ({ ...p, practice: { ...p.practice, [`plan-month-${selected}`]: { ...work, checked: work.checked.includes(i) ? work.checked.filter(v => v !== i) : [...work.checked, i] } } }))} aria-label={`Woche ${w.week} selbst überprüft`} /></label><button aria-expanded={expanded === i} onClick={() => setExpanded(expanded === i ? null : i)}><span className="week-chip">W{String(w.week).padStart(2, '0')}</span><span><strong>{w.title}</strong><small>{w.theory} h Theorie · {w.practiceHours} h Praxis · {w.review} h Review</small></span><ChevronDown size={19} className={expanded === i ? 'rotated' : ''} /></button></div>{expanded === i && <div className="plan-week-body"><div><span className="eyebrow">LERNEN</span><p>{w.learning}</p></div><div><span className="eyebrow">AUSPROBIEREN</span><p>{w.practice}</p></div><div><span className="eyebrow">DEIN NACHWEIS</span><p>{w.proof}</p></div><div className="button-row"><button className="text-link" onClick={() => navigate('portfolio')}>Im Portfolio ausarbeiten <ArrowRight size={14} /></button><button className="text-link" onClick={() => startExam(`month:${plan.month}`)}>Wissen prüfen <ArrowRight size={14} /></button></div></div>}</article>)}</div><div className="callout month-review"><Target size={21} /><div><strong>Dein Review zum Monatsabschluss</strong><p>{plan.review}</p></div></div><label className="field"><span>Was habe ich erreicht? Welche Fragen bleiben offen?</span><textarea rows={4} value={work.text} maxLength={20000} onChange={e => updateProgress(p => ({ ...p, practice: { ...p.practice, [`plan-month-${selected}`]: { ...work, text: e.target.value } } }))} placeholder="Dein Monatsrückblick. Belege kannst du in den Portfolio-Vorlagen dokumentieren." /></label><p className="fine-print">Die Wochenaufteilung ist eine didaktische Ergänzung zur gelieferten Monatsplanung. Checkmarks dokumentieren deine Selbstbewertung; sie ersetzen keine externe Abnahme.</p></section><div className="callout plan-buffer"><Flag size={22} /><div><strong>{assumptions.annual_buffer_weeks} Pufferwochen gehören dazu.</strong><p>Nutze sie für Urlaub, Nacharbeit und Wiederholung. Der Plan gibt eine Richtung vor. Du musst kein Kalenderdatum einhalten – und kannst dein Wochenziel in den Einstellungen ändern.</p></div></div></>;
}
function BookIcon() { return <Layers size={16} />; }
