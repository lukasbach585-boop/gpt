import { useEffect, useId, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Lightbulb, Pause, Play, RotateCcw } from 'lucide-react';
import type { LearningVisual } from '../types';

type VisualStep = LearningVisual['steps'][number];
type DrawingProps = { visual: LearningVisual; selected: number; recall: boolean; revealed: number | null; uid: string };

const palette = { ink: '#365d48', pale: '#edf4e8', sage: '#aec9a5', cream: '#faf6e9', line: '#b7c9b1', muted: '#82937e' };

function labelLines(value: string, width = 18): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of value.trim().split(/\s+/)) {
    if (!word) continue;
    if (line && `${line} ${word}`.length > width) { lines.push(line); line = ''; }
    if (word.length > width) {
      if (line) { lines.push(line); line = ''; }
      lines.push(`${word.slice(0, width - 1)}…`);
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  if (lines.length > 2) return [lines[0], `${lines[1].replace(/…$/, '').slice(0, width - 1)}…`];
  return lines;
}

function SvgLabel({ text, x, y, width = 18, connector = false }: { text: string; x: number; y: number; width?: number; connector?: boolean }) {
  const lines = labelLines(text, width);
  return <text x={x} y={y} textAnchor="middle" className={connector ? 'lesson-graphic-connector-label' : 'lesson-graphic-svg-label'}>{lines.map((line, index) => <tspan key={index} x={x} dy={index ? 15 : 0}>{line}</tspan>)}</text>;
}

/** Illustrated objects, drawn at the origin. These are intentionally larger than UI icons. */
function SceneObject({ icon, active = false }: { icon: VisualStep['icon']; active?: boolean }) {
  const stroke = active ? palette.ink : '#80957a';
  const fill = active ? '#dbeacf' : '#ecf2e5';
  const common = { stroke, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (icon) {
    case 'brain': return <g {...common}>
      <path d="M0-25c-12-11-27 0-23 13-16 0-18 21-5 26-4 13 14 22 25 13L0 23l3 4c11 9 29 0 25-13 13-5 11-26-5-26 4-13-11-24-23-13Z" fill={fill} />
      <path d="M0-25v48M-14-18c-8 1-9 11-2 15M-22 8c10-4 15 4 10 12M14-18c8 1 9 11 2 15M22 8c-10-4-15 4-10 12" fill="none" />
      <path d="m-10-2 20 7m-20 8 20-21" strokeOpacity=".35" /><circle cx="-10" cy="-2" r="3" fill={stroke} /><circle cx="10" cy="5" r="3" fill={stroke} /><circle cx="-10" cy="13" r="3" fill={stroke} /><circle cx="10" cy="-8" r="3" fill={stroke} />
    </g>;
    case 'document': return <g {...common}>
      <path d="M-18-27H9l12 12v43h-39Z" fill="#fffdf5" /><path d="M9-27v12h12" fill={fill} /><path d="M-9-9H9M-9-1H9M-9 7H3" /><rect x="-10" y="14" width="18" height="5" rx="2" fill={fill} stroke="none" /><path d="m-26-21-6 5v43h13" strokeOpacity=".4" fill="none" />
    </g>;
    case 'database': return <g {...common}>
      <path d="M-26-16v37c0 15 52 15 52 0v-37" fill={fill} /><ellipse cy="-16" rx="26" ry="10" fill="#fafdf5" /><path d="M-26-4c0 15 52 15 52 0M-26 9c0 15 52 15 52 0" fill="none" /><circle cx="15" cy="13" r="2" fill={stroke} /><circle cx="15" cy="0" r="2" fill={stroke} />
    </g>;
    case 'search': return <g {...common}>
      <path d="M-30-23h30v39h-30Z" fill="#fffdf5" strokeOpacity=".45" /><path d="M-23-14h16M-23-7h11M-23 0h8" strokeOpacity=".45" /><circle cx="2" cy="-3" r="21" fill={fill} fillOpacity=".85" /><path d="m18 13 16 16" strokeWidth="7" /><path d="m-7-3 7 7 12-13" fill="none" />
    </g>;
    case 'spark': return <g {...common}>
      <circle r="27" fill={fill} /><path d="m0-22 6 16 16 6-16 6-6 16-6-16-16-6 16-6Z" fill="#fffdf3" /><path d="M29-27v10m-5-5h10M-29 18v8m-4-4h8" strokeOpacity=".65" /><circle cx="-28" cy="-22" r="2" fill={stroke} />
    </g>;
    case 'shield': return <g {...common}>
      <path d="M0-29 25-19v17C25 16 8 28 0 32-8 28-25 16-25-2v-17Z" fill={fill} /><path d="m-12 0 9 9 16-19" strokeWidth="3" fill="none" /><path d="m0-20 15 6" strokeOpacity=".3" />
    </g>;
    case 'check': return <g {...common}>
      <circle r="27" fill={fill} /><circle r="20" strokeOpacity=".2" fill="none" /><path d="m-13 0 9 9 18-20" strokeWidth="3.5" fill="none" /><path d="M23-27v8m-4-4h8" strokeOpacity=".6" />
    </g>;
    case 'person': return <g {...common}>
      <circle cy="-14" r="12" fill="#f4e8cc" /><path d="M-28 29v-7C-28-1 28-1 28 22v7Z" fill={fill} /><path d="M-13 27V14m26 13V14" strokeOpacity=".4" /><path d="M-8-17q8-9 16 0" strokeOpacity=".4" />
    </g>;
    case 'chart': return <g {...common}>
      <rect x="-28" y="-25" width="56" height="52" rx="5" fill="#fffdf5" /><path d="M-28-10h56M-9-10v37M10-10v37M-28 8h56" strokeOpacity=".45" /><path d="M-21-18h14m6 0h13m6 0h10M-21-1h6m-6 18h6m11-18h6m-6 18h6" strokeOpacity=".5" /><path d="m15 15 3 3 5-6" fill="none" /><rect x="-27" y="-24" width="54" height="12" rx="3" fill={fill} stroke="none" />
    </g>;
    case 'target': return <g {...common}>
      <circle r="27" fill={fill} /><circle r="18" fill="#fffdf5" /><circle r="8" fill={fill} /><path d="M0 0 27-27m-8 0h8v8" strokeWidth="2.5" fill="none" />
    </g>;
    case 'settings': return <g {...common}>
      <path d="m-7-29 14 0 3 9 9 4 9-3 6 12-7 7 0 10 7 7-6 12-9-3-9 4-3 9H-7l-3-9-9-4-9 3-6-12 7-7V0l-7-7 6-12 9 3 9-4Z" transform="translate(0 -4) scale(.9)" fill={fill} /><circle r="11" fill="#fffdf5" /><circle r="4" fill={fill} />
    </g>;
    case 'clock': return <g {...common}>
      <circle r="27" fill="#fffdf5" /><path d="M0-21v4M21 0h-4M0 21v-4M-21 0h4" strokeOpacity=".45" /><path d="M0-13V0l11 7" strokeWidth="3" fill="none" /><circle r="3" fill={fill} /><path d="m19-24 5-6M-19-24l-5-6" strokeOpacity=".5" />
    </g>;
  }
}

function Paper({ x, y, width, height, selected = 0, answer = false, excerpt }: { x: number; y: number; width: number; height: number; selected?: number; answer?: boolean; excerpt?: string }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M7 9H${width + 7}V${height + 9}H7Z`} fill="#e5e9dc" opacity=".6" />
    <path d={`M0 0H${width - 22}L${width} 22V${height}H0Z`} fill="#fffdf5" stroke="#c5d2bb" strokeWidth="1.7" />
    <path d={`M${width - 22} 0v22h22`} fill="#edf1e3" stroke="#c5d2bb" strokeWidth="1.7" />
    <rect x="15" y="20" width="39" height="5" rx="2" fill="#bbcbae" />
    {[0, 1, 2, 3].map(row => <g key={row}>
      {selected % 5 === row && <rect x="11" y={39 + row * 21} width={width - 23} height="17" rx="3" fill="#e2edce" />}
      <path d={`M16 ${47 + row * 21}h${width - 39}`} stroke={selected % 5 === row ? '#789267' : '#d2dbc7'} strokeWidth="3" strokeLinecap="round" />
      <path d={`M16 ${54 + row * 21}h${(width - 39) * .7}`} stroke="#dce3d3" strokeWidth="2" strokeLinecap="round" />
    </g>)}
    {excerpt && <g className="lesson-graphic-document-excerpt"><rect x="11" y={height - 63} width={width - 22} height="37" rx="4" fill="#eff4e4" /><SvgLabel text={excerpt.length > 40 ? `${excerpt.slice(0, 39)}…` : excerpt} x={width / 2} y={height - 49} width={21} /></g>}
    {answer && <g transform={`translate(${width - 36} ${height - 25})`}><circle r="11" fill="#e4eed6" /><path d="m-5 0 3 3 7-7" stroke="#6f8d60" strokeWidth="2" fill="none" /><path d="M-5-3h6" stroke="#6f8d60" strokeWidth="1" /></g>}
  </g>;
}

function stageX(index: number, count: number, left = 80, right = 560): number {
  return count === 1 ? (left + right) / 2 : left + index * (right - left) / (count - 1);
}

function Drawing({ visual, selected, recall, revealed, uid }: DrawingProps) {
  const count = visual.steps.length;
  const showLabel = (index: number) => !recall || (index === selected && revealed === index);
  const connector = (index: number, x: number, y: number) => !recall && visual.connections?.[index] ? <SvgLabel key={`connection-${index}`} text={visual.connections[index]} x={x} y={y} width={17} connector /> : null;
  const number = (index: number, x: number, y: number) => <g transform={`translate(${x} ${y})`}><circle r="10" fill={selected === index ? '#355d45' : '#fffdf5'} stroke={selected === index ? '#355d45' : '#c6d3bc'} /><text textAnchor="middle" dy="3.5" className="lesson-graphic-step-number" fill={selected === index ? '#fff' : '#607452'}>{index + 1}</text></g>;
  const object = (index: number, x: number, y: number, scale = 1) => <g className={`lesson-graphic-object ${selected === index ? 'lesson-graphic-object-active' : ''}`} transform={`translate(${x} ${y})`}><g transform={`scale(${scale})`}><SceneObject icon={visual.steps[index].icon} active={selected === index} /></g></g>;
  const label = (index: number, x: number, y: number, width = 18) => showLabel(index) ? <SvgLabel text={visual.steps[index].title} x={x} y={y} width={width} /> : null;
  const marker = `url(#${uid}-arrow)`;

  switch (visual.kind) {
    case 'flow': return <>
      <path d="M30 145Q75 87 147 111T289 113T433 110T610 142V217Q560 252 480 233T308 235T161 231T30 217Z" fill="#f0f3e7" />
      {visual.steps.slice(0, -1).map((_, index) => {
        const from = stageX(index, count), to = stageX(index + 1, count);
        const offset = Math.min(49, (to - from) * .35);
        return <g key={index}><path d={`M${from + offset} 151H${to - offset}`} markerEnd={marker} className={`lesson-graphic-path ${index === selected ? 'lesson-graphic-path-active' : ''}`} />{connector(index, (from + to) / 2, 104)}</g>;
      })}
      {visual.steps.map((_, index) => { const x = stageX(index, count); return <g key={index}><circle cx={x} cy="151" r={count > 5 ? 35 : 43} fill={selected === index ? '#e2edcf' : '#fffdf5'} stroke={selected === index ? '#9fb98e' : '#d5dfc9'} strokeWidth="1.4" />{object(index, x, 151, count > 5 ? .75 : 1)}{number(index, x, 207)}{label(index, x, 239, count > 4 ? 14 : 18)}</g>; })}
    </>;
    case 'comparison': {
      if (count === 4 && visual.connections?.length === 2) return <>
        <path d="M320 30v283" stroke="#d4dfc8" strokeDasharray="4 6" />
        {visual.steps.map((_, index) => {
          const x = index % 2 ? 469 : 172, y = index < 2 ? 92 : 230;
          return <g key={index}>
            <ellipse cx={x} cy={y + 22} rx="75" ry="31" fill={selected === index ? '#dce9cd' : '#edf2e4'} />
            {index < 2 && <path d={`M${x} ${y + 43}V${y + 87}`} className="lesson-graphic-path" markerEnd={marker} />}
            <circle cx={x} cy={y} r="38" fill={selected === index ? '#e0ebcf' : '#fffdf5'} stroke="#c5d7b7" />{object(index, x, y, .83)}{number(index, x + 38, y - 25)}{label(index, x, y + 58, 25)}
          </g>;
        })}
        {connector(0, 320, 92)}{connector(1, 320, 229)}
      </>;
      return <>
      <path d="M37 281H603" stroke="#d5dfc8" strokeWidth="2" />
      {visual.steps.map((_, index) => {
        const x = stageX(index, count, 82, 558);
        const half = Math.min(74, 230 / Math.max(1, count - 1));
        return <g key={index}>
          <path d={`M${x - half} 241l${half} 19 ${half}-19-${half}-19Z`} fill={selected === index ? '#dbe9cd' : '#e8eedf'} stroke="#cbd8be" />
          <path d={`M${x - 19} 45h27l11 11v36h-38Z`} fill="#fffdf5" stroke="#c6d3bb" strokeWidth="1.5" /><path d={`M${x - 10} 62h17m-17 8h17m-17 8h12`} stroke="#c3d0b7" strokeWidth="2" />
          <path d={`M${x} 97v24M${x} 188v21`} markerEnd={marker} className={`lesson-graphic-path ${selected === index ? 'lesson-graphic-path-active' : ''}`} />
          <circle cx={x} cy="157" r="34" fill={selected === index ? '#e1edcd' : '#f5f7ed'} stroke="#cddbbe" />{object(index, x, 157, count > 4 ? .75 : .9)}
          <g transform={`translate(${x - 24} 216)`}><rect width="48" height="32" rx="4" fill="#fffdf5" stroke="#c5d3b8" /><path d="M8 9h31M8 16h24M8 23h28" stroke={selected === index ? '#9eba85' : '#d4dfc8'} strokeWidth="3" strokeLinecap="round" /></g>
          {number(index, x, 281)}{label(index, x, 310, count > 3 ? 15 : 20)}
        </g>;
      })}
      </>;
    }
    case 'layers': return <>
      <ellipse cx="321" cy="284" rx="204" ry="24" fill="#dbe3cc" opacity=".35" />
      {visual.steps.map((_, index) => {
        const y = 62 + index * Math.min(46, 204 / Math.max(1, count - 1));
        const active = selected === index;
        return <g key={index}>
          <path d={`M102 ${y + 10} 322 ${y - 29} 536 ${y + 15}v11L315 ${y + 70} 102 ${y + 21}Z`} fill={active ? '#acc998' : '#d9e3cc'} stroke={active ? '#8ea87c' : '#c5d2b8'} strokeWidth="1.5" />
          <path d={`M102 ${y + 10} 322 ${y - 29} 536 ${y + 15} 315 ${y + 59}Z`} fill={active ? '#edf4de' : ['#f9f5e8', '#f0f4e8', '#eef3e2', '#e8efdc'][index % 4]} stroke={active ? '#8eac78' : '#c6d4b9'} strokeWidth={active ? 2 : 1.2} />
          {object(index, 178, y + 11, .6)}{number(index, 234, y + 18)}{label(index, 371, y + 19, 25)}
        </g>;
      })}
    </>;
    case 'document': return <>
      <Paper x={51} y={76} width={145} height={191} selected={selected} excerpt={!recall ? visual.steps[0].example : undefined} />
      <Paper x={432} y={64} width={156} height={206} selected={selected} answer excerpt={!recall || revealed === selected ? visual.steps[selected].example : undefined} />
      <path d={`M186 ${123 + selected % 5 * 21}C265 30 371 31 440 ${111 + selected % 5 * 21}`} fill="none" markerEnd={marker} className="lesson-graphic-path lesson-graphic-path-active" />
      <path d="M435 272C369 314 254 314 187 270" fill="none" stroke="#c0d1b0" strokeWidth="1.4" strokeDasharray="4 6" />
      <circle cx="313" cy="160" r="44" fill="#e8f0da" stroke="#c6d9b2" /><circle cx="313" cy="160" r="32" fill="#fffdf5" stroke="#91ad7c" strokeWidth="2" /><path d="m337 184 19 19" stroke="#91ad7c" strokeWidth="7" strokeLinecap="round" />
      {object(selected, 313, 160, .65)}
      <path d="M93 247h56M473 247h64" stroke="#b5c7a3" strokeWidth="2" />
      {!recall && <><SvgLabel text="Quelle mit Fundstelle" x={124} y={293} width={21} /><SvgLabel text="Aussage mit Beleg" x={511} y={293} width={21} /></>}
      {visual.steps.map((_, index) => { const x = stageX(index, count, 232, 394); return <g key={index}>{number(index, x, 251)}</g>; })}
      {label(selected, 313, 44, 28)}
      {!recall && visual.connections?.[Math.min(selected, Math.max(0, count - 2))] && <SvgLabel text={visual.connections[Math.min(selected, Math.max(0, count - 2))]} x={313} y={301} width={24} connector />}
    </>;
    case 'matrix': return <>
      <rect x="110" y="38" width="429" height="246" rx="12" fill="#fffdf5" stroke="#d2ddc6" />
      <path d="M324 39v244M111 160h427" stroke="#d1ddc2" strokeWidth="1.2" strokeDasharray="5 5" />
      <path d="M94 290V35M106 300H551" className="lesson-graphic-path" markerEnd={marker} />
      {!recall && <>{visual.connections?.[0] && <SvgLabel text={visual.connections[0]} x={324} y={325} width={29} connector />}{visual.connections?.[1] && <text transform="translate(73 164) rotate(-90)" textAnchor="middle" className="lesson-graphic-connector-label">{visual.connections[1].slice(0, 32)}</text>}</>}
      {visual.steps.map((_, index) => {
        const quadrant = index % 4;
        const column = quadrant % 2, row = Math.floor(quadrant / 2);
        const siblings = Math.ceil((count - quadrant) / 4);
        const x = 217 + column * 214 + (Math.floor(index / 4) - (siblings - 1) / 2) * 69;
        const y = row ? 221 : 98;
        return <g key={index}><ellipse cx={x} cy={y + 12} rx={count > 4 ? 33 : 64} ry="38" fill={selected === index ? '#e3eed3' : '#f0f4e8'} />{object(index, x, y, count > 4 ? .65 : .83)}{number(index, x + 34, y - 27)}{count <= 4 && label(index, x, y + 53, 22)}</g>;
      })}
    </>;
    case 'scorecard': return <>
      <path d="M166 35h334v272H166Z" fill="#e4ead9" opacity=".55" />
      <rect x="153" y="24" width="334" height="278" rx="12" fill="#fffdf5" stroke="#c6d6b8" strokeWidth="1.6" />
      <rect x="260" y="13" width="121" height="23" rx="6" fill="#dfeacd" stroke="#b2c69e" /><path d="M301 22h39" stroke="#9cb985" strokeWidth="3" strokeLinecap="round" />
      {visual.steps.map((_, index) => {
        const height = 227 / count;
        const y = 52 + index * height;
        return <g key={index}>
          <rect x="169" y={y} width="302" height={height - 6} rx="7" fill={selected === index ? '#edf4e2' : '#fafbf6'} stroke={selected === index ? '#bbd0a8' : '#eef1e7'} />
          {object(index, 200, y + (height - 6) / 2, Math.min(.6, height / 76))}{label(index, 330, y + (height - 6) / 2 + 3, 28)}{number(index, 446, y + (height - 6) / 2)}
        </g>;
      })}
    </>;
    case 'cycle': {
      const center = { x: 320, y: 164 }, radius = 104;
      const angle = (index: number) => -Math.PI / 2 + index * Math.PI * 2 / count;
      const point = (theta: number, distance = radius) => ({ x: center.x + Math.cos(theta) * distance, y: center.y + Math.sin(theta) * distance });
      return <>
        <circle cx={center.x} cy={center.y} r="141" fill="#f1f4e9" />
        <circle cx={center.x} cy={center.y} r="104" fill="none" stroke="#d9e3ca" strokeWidth="16" />
        {visual.steps.map((_, index) => {
          const startAngle = angle(index) + .39, endAngle = angle(index + 1) - .39;
          const start = point(startAngle), end = point(endAngle);
          const node = count === 1 ? { x: center.x, y: center.y - radius } : point(angle(index));
          const text = point(angle(index), 156);
          const connectionPoint = point((angle(index) + angle(index + 1)) / 2, 145);
          return <g key={index}><path d={`M${start.x} ${start.y}A${radius} ${radius} 0 ${endAngle - startAngle > Math.PI ? 1 : 0} 1 ${end.x} ${end.y}`} className={`lesson-graphic-path ${selected === index ? 'lesson-graphic-path-active' : ''}`} markerEnd={marker} /><circle cx={node.x} cy={node.y} r={count > 5 ? 32 : 39} fill={selected === index ? '#e0eccc' : '#fffdf5'} stroke={selected === index ? '#adc697' : '#ccdabd'} />{object(index, node.x, node.y, count > 5 ? .67 : .8)}{number(index, node.x + 27, node.y + 26)}{label(index, text.x, text.y + (text.y < center.y ? -4 : 9), 17)}{connector(index, connectionPoint.x, connectionPoint.y)}</g>;
        })}
        <path d="M292 156c7-19 44-21 55-4m-5-8 5 8-9 1M348 174c-7 19-44 21-55 4m5 8-5-8 9-1" fill="none" stroke="#b4c89e" strokeWidth="2.5" strokeLinecap="round" />
      </>;
    }
    case 'timeline': return <>
      <path d="M35 119Q126 75 229 113T436 107T606 118V252H35Z" fill="#f1f5e9" />
      <path d="M42 185H605" stroke="#c8d8b9" strokeWidth="4" strokeLinecap="round" markerEnd={marker} />
      <path d={`M42 185H${stageX(selected, count)}`} stroke="#8faa77" strokeWidth="4" strokeLinecap="round" />
      {visual.steps.map((_, index) => {
        const x = stageX(index, count);
        return <g key={index}><path d={`M${x} 146v28`} stroke="#b8cca5" strokeWidth="2" strokeDasharray="3 4" /><circle cx={x} cy="111" r="40" fill={selected === index ? '#e0edcb' : '#fffdf5'} stroke="#d1dfc0" />{object(index, x, 111, count > 5 ? .7 : .85)}<circle cx={x} cy="185" r="16" fill="#f7f9f0" stroke={selected === index ? '#789864' : '#c0d2ab'} strokeWidth="2" />{number(index, x, 185)}{label(index, x, 226, count > 4 ? 14 : 20)}{index < count - 1 && connector(index, (x + stageX(index + 1, count)) / 2, 273)}</g>;
      })}
    </>;
  }
}

export function LessonGraphic({ visual, compact = false, recall = false }: { visual: LearningVisual; compact?: boolean; recall?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState<number | null>(null);
  const [takeawayRevealed, setTakeawayRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = Math.min(selected, Math.max(0, visual.steps.length - 1));
  const step = visual.steps[active];
  const hidden = recall && revealed !== active;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => { setSelected(0); setPlaying(false); setRevealed(null); setTakeawayRevealed(false); }, [visual, recall]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setRevealed(null);
      if (active >= visual.steps.length - 1) { setPlaying(false); return; }
      setSelected(active + 1);
    }, reducedMotion ? 6000 : 4800);
    return () => window.clearInterval(timer);
  }, [playing, active, visual.steps.length, reducedMotion]);

  useEffect(() => {
    const pauseWhenHidden = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden);
  }, []);

  function select(index: number) { setSelected(index); setPlaying(false); setRevealed(null); }
  function togglePlay() {
    if (playing) { setPlaying(false); return; }
    if (active >= visual.steps.length - 1) { setSelected(0); setRevealed(null); }
    setPlaying(true);
  }

  if (!step) return <section className="lesson-graphic lesson-graphic-empty"><h3>{recall ? 'Bildhilfe zum Wissensabruf' : visual.title}</h3><p>Diese Grafik enthält noch keine erklärenden Schritte. Nutze den Lerntext und die Leitfragen dieser Lektion.</p></section>;

  return <section className={`lesson-graphic ${compact ? 'lesson-graphic-compact' : ''} ${playing ? 'lesson-graphic-playing' : ''} ${reducedMotion ? 'lesson-graphic-reduced' : ''} ${recall ? 'lesson-graphic-recall' : ''}`} aria-labelledby={`${uid}-heading`}>
    <header className="lesson-graphic-header"><div><span className="lesson-graphic-eyebrow">{recall ? 'BILDGESTÜTZTER WISSENSABRUF' : 'ZUSAMMENHÄNGE SICHTBAR MACHEN'}</span><h3 id={`${uid}-heading`}>{recall ? 'Erkläre den Zusammenhang im Bild.' : visual.title}</h3></div><span className="lesson-graphic-counter" aria-label={`Schritt ${active + 1} von ${visual.steps.length}`}>{String(active + 1).padStart(2, '0')}<span>/{String(visual.steps.length).padStart(2, '0')}</span></span></header>
    {!recall && <p className="lesson-graphic-caption">{visual.caption}</p>}
    {recall && <p className="lesson-graphic-caption">Erkläre den Zusammenhang zunächst aus dem Bild. Wähle einen Schritt und decke die Erklärung erst nach deinem eigenen Versuch auf.</p>}
    <figure className="lesson-graphic-figure"><svg className="lesson-graphic-svg" viewBox="0 -16 640 376" role="img" aria-labelledby={`${uid}-svg-title ${uid}-svg-description`}>
      <title id={`${uid}-svg-title`}>{recall ? 'Bildhilfe für den Wissensabruf' : visual.title}</title><desc id={`${uid}-svg-description`}>{hidden ? `Bildhilfe für den Wissensabruf. Baustein ${active + 1} ist hervorgehoben. Die Beschriftungen sind verborgen.` : `Bildhafte Darstellung. Schritt ${active + 1}: ${step.title}. Die ausführliche Erklärung und ein Beispiel stehen unter der Grafik.`}</desc>
      <defs><marker id={`${uid}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth"><path d="M.5.5 6 3.5.5 6.5" fill="none" stroke="#91aa7a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></marker></defs>
      <Drawing visual={visual} selected={active} recall={recall} revealed={revealed} uid={uid} />
    </svg>{!recall && <figcaption className="lesson-graphic-figure-caption">{visual.kind === 'scorecard' ? 'Prüffelder einzeln betrachten und mit Belegen bewerten.' : 'Wähle einen Bildschritt, um seine Bedeutung und ein konkretes Beispiel zu sehen.'}</figcaption>}</figure>
    {!recall && !!visual.connections?.length && <div className="lesson-graphic-connections" aria-label={visual.kind === 'matrix' ? 'Beschriftungen der Vergleichsachsen' : 'Verbindungen im Lernbild'}><span>{visual.kind === 'matrix' ? 'Vergleichsachsen' : 'Verbindungen im Lernbild'}</span>{visual.connections.map((connection, index) => <p key={index}>{connection}</p>)}</div>}
    <div className="lesson-graphic-step-picker" role="group" aria-label="Bildschritt auswählen">{visual.steps.map((item, index) => <button type="button" key={index} className={`lesson-graphic-step ${index === active ? 'lesson-graphic-step-active' : ''}`} aria-pressed={index === active} aria-label={recall && (revealed !== index || active !== index) ? `Schritt ${index + 1} auswählen` : `Schritt ${index + 1}: ${item.title}`} onClick={() => select(index)}><span>{index + 1}</span><strong>{recall && (revealed !== index || active !== index) ? `Schritt ${index + 1}` : item.title}</strong></button>)}</div>
    <div className="lesson-graphic-controls"><button type="button" className="lesson-graphic-button" disabled={active === 0} onClick={() => select(active - 1)}><ChevronLeft size={17} aria-hidden="true" />Zurück</button><button type="button" className={`lesson-graphic-button lesson-graphic-play ${playing ? 'lesson-graphic-play-active' : ''}`} aria-pressed={playing} disabled={visual.steps.length < 2} onClick={togglePlay}>{playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{playing ? 'Pause' : 'Schrittweise ansehen'}</button><button type="button" className="lesson-graphic-button" disabled={active === visual.steps.length - 1} onClick={() => select(active + 1)}>Weiter<ChevronRight size={17} aria-hidden="true" /></button><button type="button" className="lesson-graphic-replay" aria-label="Grafik von vorn ansehen" title="Von vorn ansehen" onClick={() => { select(0); setTakeawayRevealed(false); }}><RotateCcw size={17} aria-hidden="true" /></button></div>
    {playing && <p className="lesson-graphic-play-note" role="status">Die Bildschritte wechseln alle {reducedMotion ? 'sechs' : 'knapp fünf'} Sekunden. Pausiere, um die Erklärung in Ruhe zu lesen.</p>}
    <div className="lesson-graphic-detail" aria-live={playing ? 'off' : 'polite'} aria-atomic="true" id={`${uid}-detail`}>{hidden ? <div className="lesson-graphic-recall-prompt"><span className="lesson-graphic-detail-number">{String(active + 1).padStart(2, '0')}</span><div><h4>Was passiert an dieser Stelle?</h4><p>Beschreibe die Aufgabe, einen konkreten Anwendungsfall und eine mögliche Grenze. Das Bild ist deine Gedächtnishilfe.</p><button type="button" className="lesson-graphic-button lesson-graphic-reveal" onClick={() => { setPlaying(false); setRevealed(active); }}><Eye size={16} aria-hidden="true" />Diesen Schritt aufdecken</button></div></div> : <><div className="lesson-graphic-detail-heading"><span className="lesson-graphic-detail-number">{String(active + 1).padStart(2, '0')}</span><h4>{step.title}</h4></div><p>{step.detail}</p><div className="lesson-graphic-example"><h3>So sieht das in der Praxis aus</h3><p>{step.example}</p></div>{recall && <button type="button" className="lesson-graphic-button" onClick={() => setRevealed(null)}>Erklärung wieder verbergen</button>}</>}</div>
    {!recall || takeawayRevealed ? <div className="lesson-graphic-takeaway"><Lightbulb size={18} aria-hidden="true" /><p><strong>Dein Merksatz</strong>{visual.takeaway}</p></div> : <button type="button" className="lesson-graphic-takeaway-reveal" onClick={() => { setPlaying(false); setTakeawayRevealed(true); }}><Lightbulb size={17} aria-hidden="true" />Merksatz aufdecken</button>}
    {reducedMotion && <p className="lesson-graphic-motion-note">Bewegungseffekte sind gemäß deinen Geräteeinstellungen ausgeschaltet.</p>}
  </section>;
}
