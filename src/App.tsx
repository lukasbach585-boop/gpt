import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Asterisk, Bell, BookOpen, CalendarDays, Check, ChevronRight, ClipboardCheck, Compass, Download, FolderCheck, LayoutDashboard, Layers, LibraryBig, Menu, NotebookPen, Settings2, Sparkles, Wifi, WifiOff, X } from 'lucide-react';
import { Learning, type LearningContext, type Page } from './context';
import { baseContent } from './data/catalog';
import { addActivity, loadProgress, parseProgress, saveProgress, validateContentPack } from './lib/learning';
import type { ContentPack, Progress } from './types';
import { Dashboard, PathPage, StudioPage } from './components/CorePages';
import { ExamsPage, ExamRunner } from './components/Exams';
import { LessonReader } from './components/LessonReader';
import { LibraryPage, NotesPage, SettingsPage } from './components/SupportPages';
import { PortfolioPage } from './components/PortfolioPage';
import { PlannerPage } from './components/PlannerPage';

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
const CONTENT_KEY = 'ki-kompass-content-v2';
const navItems = [
  { id: 'dashboard', label: 'Übersicht', icon: LayoutDashboard },
  { id: 'path', label: 'Mein Lernpfad', icon: Compass },
  { id: 'planner', label: 'Mein Jahresplan', icon: CalendarDays },
  { id: 'studio', label: 'Wissensstudio', icon: Layers },
  { id: 'exams', label: 'Prüfungstraining', icon: ClipboardCheck },
  { id: 'portfolio', label: 'Mein Portfolio', icon: FolderCheck },
  { id: 'notes', label: 'Meine Notizen', icon: NotebookPen },
] as const;

function initialPage(): Page {
  const hash = window.location.hash.slice(1);
  return [...navItems.map(n => n.id), 'library', 'settings'].includes(hash) ? hash as Page : 'dashboard';
}
function initialContent(): ContentPack {
  try { const stored = localStorage.getItem(CONTENT_KEY); if (stored) return validateContentPack(JSON.parse(stored)); } catch { /* The original stays available for recovery. */ }
  return baseContent;
}

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const progressRef = useRef(progress); progressRef.current = progress;
  const [content, setContent] = useState(initialContent);
  const [page, setPage] = useState<Page>(initialPage);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [exam, setExam] = useState<{ scope: string; key: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [online, setOnline] = useState(navigator.onLine);
  const [offlineReady, setOfflineReady] = useState(false);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const previousFocus = useRef<HTMLElement | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message); window.clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToast(''), 5500);
  }, []);
  const updateProgress = useCallback((change: (current: Progress) => Progress) => {
    try {
      const next = parseProgress(change(progressRef.current));
      const saved = saveProgress(next);
      progressRef.current = next; setProgress(next);
      if (!saved) notify('Speichern ist gerade nicht möglich. Dein Stand bleibt in dieser Sitzung erhalten. Bitte exportiere ihn in den Einstellungen.');
      return saved;
    } catch (error) { notify(error instanceof Error ? error.message : 'Die Änderung konnte nicht gespeichert werden.'); return false; }
  }, [notify]);
  const replaceProgress = useCallback((value: Progress) => {
    try {
      const next = parseProgress(value);
      if (!saveProgress(next, { replaceCorrupt: true })) { notify('Der neue Stand konnte nicht dauerhaft gespeichert werden. Prüfe den Browserspeicher.'); return false; }
      progressRef.current = next; setProgress(next); notify('Dein Lernstand wurde übernommen.'); return true;
    } catch (error) { notify(error instanceof Error ? error.message : 'Ungültiger Lernstand.'); return false; }
  }, [notify]);
  const navigate = useCallback((target: Page) => {
    setPage(target); window.location.hash = target; setMenuOpen(false); setNoticesOpen(false); window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const openLesson = useCallback((id: string) => {
    if (!content.weeks.some(w => w.lessons.some(l => l.id === id))) { notify('Diese Lektion ist in deinem aktuellen Inhaltspaket nicht verfügbar.'); return; }
    previousFocus.current = document.activeElement as HTMLElement;
    setExam(null); setLessonId(id); setMenuOpen(false); setNoticesOpen(false);
  }, [content, notify]);
  const startExam = useCallback((scope: string) => {
    previousFocus.current = document.activeElement as HTMLElement;
    setLessonId(null); setExam({ scope, key: crypto.randomUUID() }); setMenuOpen(false); setNoticesOpen(false);
  }, []);
  function closeOverlay() { setLessonId(null); setExam(null); window.setTimeout(() => previousFocus.current?.focus(), 0); }
  function replaceContent(value: ContentPack) {
    try {
      const next = validateContentPack(value);
      if (!next.library) { notify('Bitte verwende ein aktuelles Inhaltspaket mit Lernbibliothek und 12 Modulen.'); return false; }
      localStorage.setItem(CONTENT_KEY, JSON.stringify(next)); setContent(next); setLessonId(null); setExam(null); notify(`Inhaltsversion ${next.version} wurde übernommen. Dein Fortschritt bleibt erhalten.`); return true;
    } catch (error) { notify(error instanceof Error ? error.message : 'Das Inhaltspaket konnte nicht gespeichert werden.'); return false; }
  }
  function resetContent() {
    try { localStorage.removeItem(CONTENT_KEY); setContent(baseContent); notify('Die ursprüngliche Lernbibliothek wurde wiederhergestellt.'); return true; } catch { notify('Der Browserspeicher ist gerade nicht verfügbar.'); return false; }
  }
  useEffect(() => {
    const hashChange = () => { setPage(initialPage()); window.scrollTo(0, 0); };
    const connectionChange = () => setOnline(navigator.onLine);
    const installPrompt = (event: Event) => { event.preventDefault(); setInstallEvent(event as InstallEvent); };
    window.addEventListener('hashchange', hashChange); window.addEventListener('online', connectionChange); window.addEventListener('offline', connectionChange); window.addEventListener('beforeinstallprompt', installPrompt);
    return () => { window.removeEventListener('hashchange', hashChange); window.removeEventListener('online', connectionChange); window.removeEventListener('offline', connectionChange); window.removeEventListener('beforeinstallprompt', installPrompt); window.clearTimeout(toastTimer.current); };
  }, []);
  useEffect(() => {
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
    let active = true;
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL }).then(async registration => {
      const ready = await navigator.serviceWorker.ready;
      if (active && ready.active) setOfflineReady(true);
      if (active && registration.waiting) setWaitingWorker(registration.waiting);
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => { if (active && worker.state === 'installed' && navigator.serviceWorker.controller) setWaitingWorker(worker); });
      });
    }).catch(() => { if (active) notify('Der Offline-Download konnte nicht abgeschlossen werden. Die App funktioniert weiterhin online.'); });
    return () => { active = false; };
  }, [notify]);
  useEffect(() => {
    const overlay = lessonId !== null || exam !== null;
    document.body.style.overflow = overlay || menuOpen ? 'hidden' : '';
    if (!overlay) return () => { document.body.style.overflow = ''; };
    const node = document.querySelector<HTMLElement>('.reader-overlay');
    node?.querySelector<HTMLElement>('button')?.focus();
    function key(event: KeyboardEvent) {
      // Native image dialogs handle their own Escape, focus trap and focus return.
      if (document.querySelector('dialog[open]')) return;
      if (event.key === 'Escape' && lessonId) closeOverlay();
      if (event.key !== 'Tab') return;
      const items = node?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key); };
  }, [lessonId, exam, menuOpen]);

  const learningActive = !!lessonId || !!exam || ['path', 'planner', 'studio', 'exams', 'portfolio', 'notes'].includes(page);
  useEffect(() => {
    if (!learningActive) return;
    let lastTick = Date.now();
    let lastInteraction = lastTick;
    let visible = document.visibilityState === 'visible';
    function recordTime() {
      const now = Date.now();
      const elapsed = Math.min(60_000, now - lastTick);
      lastTick = now;
      // Count visible learning areas, pause after five minutes without interaction.
      // Never count background tabs or substitute an estimated lesson duration.
      if (visible && now - lastInteraction < 300_000 && elapsed >= 1000) updateProgress(p => addActivity(p, elapsed / 60_000));
    }
    const interaction = () => { lastInteraction = Date.now(); };
    const visibility = () => { recordTime(); visible = document.visibilityState === 'visible'; if (visible) lastInteraction = Date.now(); };
    const timer = window.setInterval(recordTime, 15_000);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pointerdown', interaction); window.addEventListener('keydown', interaction); window.addEventListener('pagehide', recordTime);
    return () => { recordTime(); window.clearInterval(timer); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pointerdown', interaction); window.removeEventListener('keydown', interaction); window.removeEventListener('pagehide', recordTime); };
  }, [learningActive, updateProgress]);

  const context: LearningContext = { progress, content, updateProgress, replaceProgress, replaceContent, resetContent, notify, navigate, openLesson, startExam, offlineReady, installApp: installEvent ? async () => { await installEvent.prompt(); const choice = await installEvent.userChoice; if (choice.outcome === 'accepted') { notify('KI Kompass wurde zur Installation vorgemerkt.'); setInstallEvent(null); } } : null };
  const currentLabel = navItems.find(n => n.id === page)?.label || (page === 'library' ? 'Bibliothek & Updates' : 'Einstellungen');
  const initials = progress.profile.name ? progress.profile.name.slice(0, 1).toUpperCase() : 'DU';
  return <Learning.Provider value={context}><div className="app-shell"><a href="#main-content" className="skip-link">Zum Inhalt</a>{menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />}<aside className={`sidebar ${menuOpen ? 'open' : ''}`}><button className="brand" onClick={() => navigate('dashboard')} aria-label="KI Kompass Übersicht"><span className="brand-mark"><Asterisk size={33} strokeWidth={1.8} /></span><span><strong>KI Kompass<span className="brand-dot">.</span></strong><small>Dein Wissen. Deine Zukunft.</small></span></button><div className="sidebar-section-label">DEIN LERNRAUM</div><nav aria-label="Hauptnavigation">{navItems.map(({ id, label, icon: Icon }) => <button className={`nav-item ${page === id ? 'active' : ''}`} key={id} onClick={() => navigate(id)} aria-current={page === id ? 'page' : undefined}><Icon size={19} strokeWidth={1.7} /><span>{label}</span>{id === 'path' && <span className="nav-count">12</span>}{page === id && <span className="nav-active-dot" />}</button>)}</nav><div className="sidebar-course"><span className="sidebar-course-icon"><Sparkles size={16} /></span><span className="eyebrow">DEIN ZIEL</span><h3>KI-Manager<br />& AI Power User</h3><p>Kompetenz, die im Alltag<br />einen Unterschied macht.</p><button className="text-link" onClick={() => navigate('planner')}>Dein Jahresplan <ArrowRight size={14} /></button><Asterisk className="sidebar-course-decoration" size={90} strokeWidth={1} /></div><div className="sidebar-bottom"><button className={`nav-item ${page === 'library' ? 'active' : ''}`} onClick={() => navigate('library')}><LibraryBig size={19} strokeWidth={1.7} /><span>Bibliothek & Updates</span></button><button className={`nav-item ${page === 'settings' ? 'active' : ''}`} onClick={() => navigate('settings')}><Settings2 size={19} strokeWidth={1.7} /><span>Einstellungen</span></button><button className="profile-button" onClick={() => navigate('settings')}><span className="profile-avatar">{initials}</span><span><strong>{progress.profile.name || 'Dein persönlicher Lernraum'}</strong><small>Neugierig. Jeden Tag ein Stück.</small></span><ChevronRight size={16} /></button></div></aside><div className="main-shell"><header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" aria-label="Navigation öffnen" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button><span className="topbar-breadcrumb">Mein Lernraum <ChevronRight size={13} /><strong>{currentLabel}</strong></span></div><div className="topbar-right">{waitingWorker && <button className="btn btn-ghost update-available" onClick={() => { navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), { once: true }); waitingWorker.postMessage('ACTIVATE_UPDATE'); }}>App-Update laden <Download size={15} /></button>}<button className={`connection-status ${!online ? 'is-offline' : ''}`} aria-label={!online ? 'Offline-Modus' : offlineReady ? 'Offline bereit' : 'Online · lokal gespeichert'} onClick={() => navigate('settings')}>{online ? <Wifi size={14} /> : <WifiOff size={14} />}<span>{!online ? 'Offline-Modus' : offlineReady ? 'Offline bereit' : 'Online · lokal gespeichert'}</span><span className="small-dot" /></button><div className="notice-wrapper"><button className="icon-button notification-button" aria-label="Lernhinweise anzeigen" aria-expanded={noticesOpen} onClick={() => setNoticesOpen(v => !v)}><Bell size={19} /><span className="notification-dot" /></button>{noticesOpen && <div className="notification-panel"><div className="section-heading"><h3>Dein Lernraum</h3><button className="icon-button" onClick={() => setNoticesOpen(false)} aria-label="Hinweise schließen"><X size={16} /></button></div><p><BookOpen size={17} />{progress.completed.length ? `${progress.completed.length} Lektionen geschafft. Zeit, dein Wissen zu festigen.` : 'Deine erste Lektion wartet auf dich. Jeder Weg beginnt mit einem Schritt.'}</p><button className="text-link" onClick={() => navigate(progress.completed.length ? 'studio' : 'path')}>Deinen nächsten Schritt finden <ArrowRight size={14} /></button><div className="notice-divider" /><p><LibraryBig size={17} />Inhaltsversion {content.version} · Basis vom {new Date(content.reviewedAt + 'T12:00:00').toLocaleDateString('de-DE')}</p><button className="text-link" onClick={() => navigate('library')}>Quellen & Updates <ArrowRight size={14} /></button></div>}</div><span className="topbar-divider" /><button className="topbar-avatar" onClick={() => navigate('settings')} aria-label="Profil und Einstellungen">{initials}</button></div></header><main id="main-content" className="main-content">{page === 'dashboard' && <Dashboard />}{page === 'path' && <PathPage />}{page === 'planner' && <PlannerPage />}{page === 'studio' && <StudioPage />}{page === 'exams' && <ExamsPage />}{page === 'portfolio' && <PortfolioPage />}{page === 'notes' && <NotesPage />}{page === 'library' && <LibraryPage />}{page === 'settings' && <SettingsPage />}<footer className="app-footer"><span><Asterisk className="footer-brand" size={15} strokeWidth={1.8} /> Mit Neugier beginnt Veränderung.</span><span>KI Kompass · Dein persönliches Lernstudio</span></footer></main></div></div>{lessonId && <LessonReader key={lessonId} id={lessonId} close={closeOverlay} />}{exam && <ExamRunner key={exam.key} scope={exam.scope} close={closeOverlay} />}{toast && <div className="toast" role="status"><Check size={18} /><span>{toast}</span><button aria-label="Nachricht schließen" onClick={() => setToast('')}><X size={16} /></button></div>}</Learning.Provider>;
}
