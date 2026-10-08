import { useId, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minus, Plus, X } from 'lucide-react';
import { mediaSourceUrl } from '../data/learning-media';
import type { LearningMedia } from '../data/learning-media';

export function LessonMedia({ media, compact = false }: { media: LearningMedia; compact?: boolean }) {
  const uid = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(100);
  const imageUrl = `${import.meta.env.BASE_URL}media/${media.file}`;
  function enlarge() { setZoom(100); dialog.current?.showModal(); }
  return <figure className="lesson-media" aria-labelledby={`${uid}-title`}>
    <figcaption><span className="lesson-media-label">SCHULUNGSGRAFIK · ORIGINAL AUF ENGLISCH</span><h3 id={`${uid}-title`}>{media.title}</h3></figcaption>
    <button type="button" className="lesson-media-preview" onClick={enlarge} aria-label={`Grafik vergrößern: ${media.title}`}><img src={imageUrl} alt={media.alt} loading="lazy" decoding="async" /><span><Maximize2 size={16} aria-hidden="true" />Zum Vergrößern antippen</span></button>
    <div className="lesson-media-guide"><h4>So liest du die Grafik</h4><ol>{(compact ? media.readingGuide.slice(0, 1) : media.readingGuide).map(tip => <li key={tip}>{tip}</li>)}</ol>{compact && <details><summary>Alle Lesehinweise anzeigen</summary><ol start={2}>{media.readingGuide.slice(1).map(tip => <li key={tip}>{tip}</li>)}</ol></details>}<details className="lesson-media-recall"><summary>Kurze Denkfrage zur Grafik</summary><p>{media.recallQuestion}</p></details></div>
    <div className="lesson-media-credit"><span>{media.creator}</span><a href={mediaSourceUrl(media)} target="_blank" rel="noreferrer">Originalquelle <ExternalLink size={13} aria-hidden="true" /></a><a href={`${import.meta.env.BASE_URL}media/LICENSE-Microsoft.txt`} target="_blank" rel="noreferrer">MIT-Lizenz</a></div>
    <dialog ref={dialog} className="lesson-media-dialog" aria-labelledby={`${uid}-zoom-title`}><header><h2 id={`${uid}-zoom-title`}>{media.title}</h2><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Grafikansicht schließen"><X size={22} /></button></header><div className="lesson-media-tools"><button type="button" onClick={() => setZoom(value => Math.max(100, value - 50))} disabled={zoom === 100} aria-label="Grafik verkleinern"><Minus size={18} /></button><output aria-live="polite">{zoom} %</output><button type="button" onClick={() => setZoom(value => Math.min(300, value + 50))} disabled={zoom === 300} aria-label="Grafik weiter vergrößern"><Plus size={18} /></button><button type="button" onClick={() => setZoom(100)}>Einpassen</button><span>Vergrößern und zum Lesen seitlich scrollen.</span></div><div className="lesson-media-zoom"><img src={imageUrl} alt={media.alt} style={{ width: `${zoom}%` }} /></div></dialog>
  </figure>;
}
