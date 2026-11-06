import { useCallback, useEffect, useId, useMemo, useState, type KeyboardEvent } from 'react'
import type { Diagram as DiagramData, DiagramNode, Lang, Tone } from '../lib/types.ts'
import { edgePoints, labelRect, midpoint, type Rect } from '../lib/geometry.ts'
import { tx } from '../lib/i18n.ts'
import { renderInline } from './inline.tsx'
import { Icon } from './Icon.tsx'

const TONES: Tone[] = ['user', 'app', 'foundry', 'model', 'data', 'tool', 'safety', 'external', 'neutral']
const TONE_LABEL: Record<Tone, { de: string; en: string }> = {
  user: { de: 'Person', en: 'Person' },
  app: { de: 'Deine App / SDK', en: 'Your app / SDK' },
  foundry: { de: 'Foundry-Plattform', en: 'Foundry platform' },
  model: { de: 'Modell', en: 'Model' },
  data: { de: 'Daten / Index', en: 'Data / index' },
  tool: { de: 'Tool / Funktion', en: 'Tool / function' },
  safety: { de: 'Sicherheit / Guardrail', en: 'Safety / guardrail' },
  external: { de: 'Externes System', en: 'External system' },
  neutral: { de: 'Sonstiges', en: 'Other' },
}

function NodeShape({ n }: { n: DiagramNode }) {
  const { x, y, w, h } = n
  switch (n.shape) {
    case 'pill':
      return <rect className="dg-shape" x={x} y={y} width={w} height={h} rx={h / 2} />
    case 'store': {
      const e = Math.min(9, h / 5)
      return (
        <g>
          <path className="dg-shape" d={`M${x},${y + e} a${w / 2},${e} 0 0 1 ${w},0 v${h - 2 * e} a${w / 2},${e} 0 0 1 ${-w},0 z`} />
          <path className="dg-shape-line" d={`M${x},${y + e} a${w / 2},${e} 0 0 0 ${w},0`} />
        </g>
      )
    }
    case 'doc': {
      const f = 14
      return (
        <g>
          <path className="dg-shape" d={`M${x},${y} h${w - f} l${f},${f} v${h - f} h${-w} z`} />
          <path className="dg-shape-line" d={`M${x + w - f},${y} v${f} h${f}`} />
        </g>
      )
    }
    case 'diamond': {
      const p = 14
      return <path className="dg-shape" d={`M${x + p},${y} h${w - 2 * p} l${p},${h / 2} l${-p},${h / 2} h${-(w - 2 * p)} l${-p},${-h / 2} z`} />
    }
    default:
      return <rect className="dg-shape" x={x} y={y} width={w} height={h} rx={8} />
  }
}

function NodeText({ n, lang }: { n: DiagramNode; lang: Lang }) {
  const label = tx(n.label, lang).split('\n')
  const sub = n.sub ? tx(n.sub, lang).split('\n') : []
  const actorPad = n.shape === 'actor' ? 26 : 0
  const cx = n.x + actorPad / 2 + n.w / 2
  const lineH = 18
  const subH = 16
  const blockH = label.length * lineH + sub.length * subH
  const top = n.y + n.h / 2 - blockH / 2 + 13
  return (
    <g>
      {n.shape === 'actor' && (
        <g className="dg-actor" transform={`translate(${n.x + 12} ${n.y + n.h / 2 - 11})`}>
          <circle cx="9" cy="6" r="5" />
          <path d="M0,22 a9,8 0 0 1 18,0 z" />
        </g>
      )}
      {label.map((l, i) => (
        <text key={`l${i}`} className="dg-label" x={cx} y={top + i * lineH} textAnchor="middle">
          {l}
        </text>
      ))}
      {sub.map((s, i) => (
        <text key={`s${i}`} className="dg-sub" x={cx} y={top + label.length * lineH + i * subH - 2} textAnchor="middle">
          {s}
        </text>
      ))}
    </g>
  )
}

interface DiagramProps {
  diagram: DiagramData
  lang: Lang
  /** Static thumbnail: no controls, no captions. */
  mini?: boolean
}

export function Diagram({ diagram, lang, mini = false }: DiagramProps) {
  const uid = useId().replace(/:/g, '')
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const steps = diagram.steps
  const active = step >= 0 ? steps[step] : null
  const focus = useMemo(() => new Set(active?.focus ?? []), [active])

  const rects = useMemo(() => {
    const m = new Map<string, Rect>()
    for (const g of diagram.groups ?? []) m.set(g.id, g)
    for (const n of diagram.nodes) m.set(n.id, n)
    return m
  }, [diagram])

  const go = useCallback(
    (next: number) => {
      setStep(Math.max(-1, Math.min(steps.length - 1, next)))
    },
    [steps.length],
  )

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      if (step >= steps.length - 1) setPlaying(false)
      else go(step + 1)
    }, step < 0 ? 600 : 4200)
    return () => clearTimeout(t)
  }, [playing, step, steps.length, go])

  const cls = (id: string, base: string) => {
    if (!active) return base
    return focus.has(id) ? `${base} is-focus` : `${base} is-dim`
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(step + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(step - 1)
    } else if (e.key === 'Escape') go(-1)
  }

  const usedTones = TONES.filter((t) => diagram.nodes.some((n) => n.tone === t))
  const title = tx(diagram.title, lang)

  const svg = (
    <svg
      className="dg-svg"
      viewBox={`0 0 ${diagram.width} ${diagram.height}`}
      role="img"
      aria-labelledby={`${uid}-t ${uid}-d`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${uid}-t`}>{title}</title>
      <desc id={`${uid}-d`}>{steps.map((s, i) => `${i + 1}. ${tx(s.title, lang)}: ${tx(s.text, lang)}`).join(' ')}</desc>
      <defs>
        <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="dg-arrowhead" />
        </marker>
        <marker id={`${uid}-arrow-on`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="dg-arrowhead is-on" />
        </marker>
      </defs>
      {(diagram.groups ?? []).map((g) => (
        <g key={g.id} className={cls(g.id, `dg-group tone-${g.tone ?? 'neutral'}`)}>
          <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={12} />
          <text x={g.x + 14} y={g.y + 20} className="dg-group-label">
            {tx(g.label, lang)}
          </text>
        </g>
      ))}
      {diagram.edges.map((e) => {
        const pts = edgePoints(e, rects)
        if (!pts) return null
        const on = active ? focus.has(e.id) : false
        const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
        return (
          <path
            key={e.id}
            d={d}
            className={cls(e.id, `dg-edge${e.dashed ? ' is-dashed' : ''}`)}
            markerEnd={`url(#${uid}-${on ? 'arrow-on' : 'arrow'})`}
            markerStart={e.bidir ? `url(#${uid}-${on ? 'arrow-on' : 'arrow'})` : undefined}
          />
        )
      })}
      {diagram.nodes.map((n) => (
        <g key={n.id} className={cls(n.id, `dg-node tone-${n.tone}`)}>
          <NodeShape n={n} />
          <NodeText n={n} lang={lang} />
        </g>
      ))}
      {diagram.edges.map((e) => {
        if (!e.label) return null
        const pts = edgePoints(e, rects)
        if (!pts) return null
        const [mx, my] = midpoint(pts)
        const text = tx(e.label, lang)
        const box = labelRect(text, [mx, my])
        return (
          <g key={`${e.id}-label`} className={cls(e.id, 'dg-edge-label')}>
            <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={10} />
            <text x={mx} y={my + 4} textAnchor="middle">
              {text}
            </text>
          </g>
        )
      })}
    </svg>
  )

  if (mini) return <div className="dg dg--mini">{svg}</div>

  return (
    <figure className="dg" aria-label={title}>
      <figcaption className="dg-head">
        <h3 className="dg-title">{title}</h3>
        {diagram.caption && <p className="dg-caption">{tx(diagram.caption, lang)}</p>}
      </figcaption>
      <div className={`dg-canvas${active ? ' has-focus' : ''}`} tabIndex={0} onKeyDown={onKey} aria-label={`${title} – Pfeiltasten wechseln die Schritte`}>
        {svg}
      </div>
      <div className="dg-controls">
        <button type="button" className="btn btn--secondary btn--small" onClick={() => go(step - 1)} disabled={step < 0}>
          <Icon name="chevronLeft" size={16} />
          Zurück
        </button>
        <ol className="dg-steps" aria-label="Schritte">
          {steps.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                className={`dg-step-dot${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
                aria-current={i === step ? 'step' : undefined}
                aria-label={`Schritt ${i + 1}: ${tx(s.title, lang)}`}
                onClick={() => {
                  setPlaying(false)
                  go(i)
                }}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn--primary btn--small" onClick={() => go(step + 1)} disabled={step >= steps.length - 1}>
          {step < 0 ? 'Schritt für Schritt' : 'Weiter'}
          <Icon name="chevronRight" size={16} />
        </button>
        <button
          type="button"
          className="btn btn--subtle btn--small"
          onClick={() => {
            if (!playing && step >= steps.length - 1) setStep(-1)
            setPlaying((p) => !p)
          }}
          aria-pressed={playing}
        >
          <Icon name={playing ? 'pause' : 'play'} size={16} />
          {playing ? 'Pause' : 'Abspielen'}
        </button>
        {step >= 0 && (
          <button type="button" className="btn btn--subtle btn--small" onClick={() => { setPlaying(false); go(-1) }}>
            Gesamtbild
          </button>
        )}
      </div>
      <div className="dg-narration" aria-live="polite">
        {active ? (
          <>
            <p className="dg-narration__title">
              <span className="dg-narration__num">{step + 1}</span>
              {tx(active.title, lang)}
            </p>
            <p className="dg-narration__text">{renderInline(tx(active.text, lang))}</p>
          </>
        ) : (
          <p className="dg-narration__text dg-narration__text--hint">
            {steps.length} Schritte. Starte mit „Schritt für Schritt“ oder nutze die Pfeiltasten im Diagramm.
          </p>
        )}
      </div>
      <ul className="dg-legend" aria-label="Legende">
        {usedTones.map((t) => (
          <li key={t}>
            <span className={`dg-swatch tone-${t}`} aria-hidden="true" />
            {TONE_LABEL[t][lang]}
          </li>
        ))}
      </ul>
    </figure>
  )
}
