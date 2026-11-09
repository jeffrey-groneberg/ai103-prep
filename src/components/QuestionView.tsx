import { useMemo, useState, type DragEvent } from 'react'
import { Link } from 'react-router-dom'
import type {
  CaseStudy,
  ChoiceOption,
  CodeQuestion,
  Lang,
  MatchQuestion,
  MultiQuestion,
  OrderQuestion,
  Question,
  SingleQuestion,
} from '../lib/types.ts'
import type { Answer } from '../lib/scoring.ts'
import { scoreQuestion } from '../lib/scoring.ts'
import { createRng, hashSeed, shuffle, shuffleAwayFrom } from '../lib/random.ts'
import { orderChoices, type ChoiceSet } from '../lib/choices.ts'
import { DIFFICULTY_LABEL, QUESTION_TYPE_LABEL, tx } from '../lib/i18n.ts'
import { sourceLabel } from '../content/sources.ts'
import { bulletById } from '../content/domains.ts'
import { moduleById } from '../content/course.ts'
import { RichText } from './RichText.tsx'
import { renderInline } from './inline.tsx'
import { CodeBlock } from './CodeBlock.tsx'
import { highlightPython } from './highlight.tsx'
import { Icon } from './Icon.tsx'
import { FeedbackLink } from './Feedback.tsx'

const LETTERS = 'ABCDEFGH'

interface QuestionViewProps {
  question: Question
  lang: Lang
  answer: Answer
  onChange: (a: Answer) => void
  revealed: boolean
  seed: number
  caseStudy?: CaseStudy
  /** Hide skill/module meta (exam mode). */
  examMode?: boolean
}

/** Feedback for one question; the issue names the question, its module and skill, and quotes the stem. */
export function QuestionFeedback({ q }: { q: Question }) {
  return (
    <FeedbackLink
      about="zu dieser Frage"
      compact
      target={{
        subject: `Frage ${q.id}`,
        details: [
          ['Modul', q.module],
          ['Skill', q.skill],
          ['Fragetyp', QUESTION_TYPE_LABEL[q.type]],
        ],
        excerpt: q.stem,
      }}
    />
  )
}

export function QuestionMeta({ q }: { q: Question }) {
  const bullet = bulletById.get(q.skill)
  return (
    <div className="q-meta">
      <span className={`domain-chip domain-${q.domain}`}>{q.domain}</span>
      <span className="q-meta__item">{QUESTION_TYPE_LABEL[q.type]}</span>
      <span className="q-meta__item">{DIFFICULTY_LABEL[q.difficulty]}</span>
      {bullet && (
        <span className="q-meta__item" title={bullet.en}>
          Skill {q.skill}
        </span>
      )}
      <QuestionFeedback q={q} />
    </div>
  )
}

export function ChoiceList({
  q,
  lang,
  answer,
  onChange,
  revealed,
  seed,
  ownText = false,
}: {
  q: ChoiceSet | SingleQuestion | MultiQuestion
  lang: Lang
  answer: Answer
  onChange: (a: Answer) => void
  revealed: boolean
  seed: number
  /** The learner wrote these options: they carry no content language. */
  ownText?: boolean
}) {
  const options = useMemo(() => orderChoices(q, seed), [q, seed])
  const multi = q.type === 'multi'
  const need = multi ? q.options.filter((o) => o.correct).length : 1
  const textLang = ownText ? undefined : lang
  const chosen = new Set(answer.type === 'single' ? (answer.choice ? [answer.choice] : []) : answer.type === 'multi' ? answer.choices : [])
  const name = `q-${q.id}`

  const toggle = (o: ChoiceOption) => {
    if (revealed) return
    if (!multi) {
      onChange({ type: 'single', choice: o.id })
      return
    }
    const next = new Set(chosen)
    if (next.has(o.id)) next.delete(o.id)
    else if (next.size < need) next.add(o.id)
    onChange({ type: 'multi', choices: [...next] })
  }

  return (
    <fieldset className="choices">
      <legend className="sr-only">{multi ? `Wähle ${need} Antworten` : 'Wähle eine Antwort'}</legend>
      {multi && !revealed && (
        <p className="choices__hint">
          Wähle {need} Antworten · {chosen.size}/{need} gewählt
        </p>
      )}
      {options.map((o, i) => {
        const picked = chosen.has(o.id)
        let state = ''
        if (revealed) {
          if (o.correct && picked) state = 'is-correct'
          else if (o.correct) state = 'is-missed'
          else if (picked) state = 'is-wrong'
          else state = 'is-neutral'
        }
        const disabled = revealed || (multi && !picked && chosen.size >= need)
        return (
          <div key={o.id} className={`choice ${picked ? 'is-picked' : ''} ${state}`}>
            <label className="choice__main">
              <input
                type={multi ? 'checkbox' : 'radio'}
                name={name}
                checked={picked}
                disabled={disabled && !picked}
                onChange={() => toggle(o)}
                readOnly={revealed}
              />
              <span className="choice__letter" aria-hidden="true">
                {LETTERS[i]}
              </span>
              <span className="choice__text" lang={textLang}>
                {renderInline(tx(o.text, lang))}
              </span>
              {revealed && (o.correct || picked) && (
                <span className="choice__verdict">
                  <Icon name={o.correct ? 'checkCircle' : 'dismissCircle'} size={20} />
                  <span className="sr-only">{o.correct ? 'richtig' : 'falsch'}</span>
                </span>
              )}
            </label>
            {revealed && tx(o.why, lang) && (
              <p className="choice__why" lang={textLang}>
                {renderInline(tx(o.why, lang))}
              </p>
            )}
          </div>
        )
      })}
    </fieldset>
  )
}

function BuildList({
  q,
  lang,
  answer,
  onChange,
  revealed,
  seed,
}: {
  q: OrderQuestion
  lang: Lang
  answer: Answer
  onChange: (a: Answer) => void
  revealed: boolean
  seed: number
}) {
  const shuffled = useMemo(() => shuffleAwayFrom(q.items, createRng(hashSeed(q.id) ^ seed)), [q, seed])
  const order = answer.type === 'order' ? answer.order : []
  const byId = new Map(q.items.map((i) => [i.id, i]))
  const pool = shuffled.filter((i) => !order.includes(i.id))
  const [dragId, setDragId] = useState<string | null>(null)

  const set = (next: string[]) => onChange({ type: 'order', order: next })
  const add = (id: string) => !revealed && set([...order, id])
  const remove = (id: string) => !revealed && set(order.filter((x) => x !== id))
  const move = (idx: number, delta: number) => {
    if (revealed) return
    const j = idx + delta
    if (j < 0 || j >= order.length) return
    const next = order.slice()
    ;[next[idx], next[j]] = [next[j], next[idx]]
    set(next)
  }
  const dropOnAnswer = (e: DragEvent, beforeId?: string) => {
    e.preventDefault()
    if (revealed || !dragId) return
    const next = order.filter((x) => x !== dragId)
    const at = beforeId ? next.indexOf(beforeId) : next.length
    next.splice(at < 0 ? next.length : at, 0, dragId)
    set(next)
    setDragId(null)
  }

  return (
    <div className="build-list">
      <div className="build-list__col">
        <h4 className="build-list__head">Aktionen</h4>
        <ul className="build-list__pool" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); if (dragId) remove(dragId); setDragId(null) }}>
          {pool.length === 0 && <li className="build-list__empty">Alle Schritte eingeordnet.</li>}
          {pool.map((item) => (
            <li key={item.id} className="bl-item" draggable={!revealed} onDragStart={() => setDragId(item.id)}>
              <Icon name="drag" size={16} className="bl-item__grip" />
              <span className="bl-item__text" lang={lang}>
                {renderInline(tx(item.text, lang))}
              </span>
              <button type="button" className="icon-btn" onClick={() => add(item.id)} disabled={revealed} aria-label="In den Antwortbereich verschieben">
                <Icon name="arrowRight" size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="build-list__col">
        <h4 className="build-list__head">Antwortbereich (Reihenfolge)</h4>
        <ol className="build-list__answer" onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropOnAnswer(e)}>
          {order.length === 0 && <li className="build-list__empty">Ziehe Schritte hierher oder nutze die Pfeil-Schaltflächen.</li>}
          {order.map((id, idx) => {
            const item = byId.get(id)
            if (!item) return null
            const right = revealed && q.items[idx]?.id === id
            return (
              <li
                key={id}
                className={`bl-item bl-item--placed${revealed ? (right ? ' is-correct' : ' is-wrong') : ''}`}
                draggable={!revealed}
                onDragStart={() => setDragId(id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.stopPropagation()
                  dropOnAnswer(e, id)
                }}
              >
                <span className="bl-item__num">{idx + 1}</span>
                <span className="bl-item__text" lang={lang}>
                  {renderInline(tx(item.text, lang))}
                </span>
                {!revealed && (
                  <span className="bl-item__actions">
                    <button type="button" className="icon-btn" onClick={() => move(idx, -1)} disabled={idx === 0} aria-label="Nach oben">
                      <Icon name="arrowUp" size={16} />
                    </button>
                    <button type="button" className="icon-btn" onClick={() => move(idx, 1)} disabled={idx === order.length - 1} aria-label="Nach unten">
                      <Icon name="arrowDown" size={16} />
                    </button>
                    <button type="button" className="icon-btn" onClick={() => remove(id)} aria-label="Zurück zu den Aktionen">
                      <Icon name="dismiss" size={16} />
                    </button>
                  </span>
                )}
                {revealed && <Icon name={right ? 'checkCircle' : 'dismissCircle'} size={20} className="bl-item__verdict" />}
              </li>
            )
          })}
        </ol>
      </div>
      {revealed && (
        <div className="reveal-block">
          <h4>Richtige Reihenfolge</h4>
          <ol className="reveal-list">
            {q.items.map((item) => (
              <li key={item.id} lang={lang}>
                <strong>{renderInline(tx(item.text, lang))}</strong>
                <span>{renderInline(tx(item.why, lang))}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function MatchArea({
  q,
  lang,
  answer,
  onChange,
  revealed,
  seed,
}: {
  q: MatchQuestion
  lang: Lang
  answer: Answer
  onChange: (a: Answer) => void
  revealed: boolean
  seed: number
}) {
  const targets = useMemo(() => shuffle(q.targets, createRng(hashSeed(q.id) ^ seed)), [q, seed])
  const pairs = answer.type === 'match' ? answer.pairs : {}
  const targetById = new Map(q.targets.map((t) => [t.id, t]))
  const [dragTarget, setDragTarget] = useState<string | null>(null)
  const setPair = (promptId: string, targetId: string | null) => {
    if (revealed) return
    onChange({ type: 'match', pairs: { ...pairs, [promptId]: targetId } })
  }

  return (
    <div className="match">
      <div className="match__values">
        <h4 className="build-list__head">Werte</h4>
        <ul className="match__chips">
          {targets.map((t) => (
            <li key={t.id} className="match-chip" draggable={!revealed} onDragStart={() => setDragTarget(t.id)}>
              <Icon name="drag" size={14} className="bl-item__grip" />
              <span className="match-chip__text" lang={lang}>
                {renderInline(tx(t.text, lang))}
              </span>
            </li>
          ))}
        </ul>
        <p className="match__note">Ziehe einen Wert in den Antwortbereich oder wähle ihn dort aus. Ein Wert kann einmal, mehrfach oder gar nicht passen.</p>
      </div>
      <div className="match__answer">
        <h4 className="build-list__head">Antwortbereich</h4>
        <ul className="match__rows">
          {q.prompts.map((p) => {
            const value = pairs[p.id] ?? null
            const ok = revealed && value === p.answer
            return (
              <li key={p.id} className={`match-row${revealed ? (ok ? ' is-correct' : ' is-wrong') : ''}`}>
                <div className="match-row__prompt" lang={lang}>
                  {renderInline(tx(p.prompt, lang))}
                </div>
                <div
                  className={`match-slot${value ? ' is-filled' : ''}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (dragTarget) setPair(p.id, dragTarget)
                    setDragTarget(null)
                  }}
                >
                  <label className="sr-only" htmlFor={`${q.id}-${p.id}`}>
                    Wert für: {tx(p.prompt, lang)}
                  </label>
                  <select id={`${q.id}-${p.id}`} value={value ?? ''} disabled={revealed} onChange={(e) => setPair(p.id, e.target.value || null)}>
                    <option value="">Wert wählen …</option>
                    {targets.map((t) => (
                      <option key={t.id} value={t.id} lang={lang}>
                        {tx(t.text, lang).replace(/`/g, '')}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" size={16} className="match-slot__chev" />
                </div>
                {revealed && (
                  <p className="match-row__why">
                    {!ok && (
                      <>
                        Richtig: <strong lang={lang}>{renderInline(tx(targetById.get(p.answer)?.text, lang))}</strong>.{' '}
                      </>
                    )}
                    <span lang={lang}>{renderInline(tx(p.why, lang))}</span>
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function CodeCompletion({
  q,
  lang,
  answer,
  onChange,
  revealed,
  seed,
}: {
  q: CodeQuestion
  lang: Lang
  answer: Answer
  onChange: (a: Answer) => void
  revealed: boolean
  seed: number
}) {
  const blanks = answer.type === 'code' ? answer.blanks : {}
  const blankById = new Map(q.blanks.map((b) => [b.id, b]))
  const shuffled = useMemo(
    () => new Map(q.blanks.map((b) => [b.id, shuffle(b.options, createRng(hashSeed(q.id + b.id) ^ seed))])),
    [q, seed],
  )
  const parts = q.template.split(/(\{\{[a-z0-9]+\}\})/g)
  let blankIndex = 0
  return (
    <div className="code-q">
      <figure className="code-block">
        <div className="code-block__bar">
          <span className="code-block__lang">Python · Lücken ergänzen</span>
        </div>
        <pre>
          <code>
            {parts.map((part, i) => {
              const m = part.match(/^\{\{([a-z0-9]+)\}\}$/)
              if (!m) return <span key={i}>{highlightPython(part)}</span>
              const b = blankById.get(m[1])
              if (!b) return <span key={i}>{part}</span>
              blankIndex++
              const value = blanks[b.id] ?? ''
              const correctOpt = b.options.find((o) => o.correct)
              const state = revealed ? (value === correctOpt?.id ? ' is-correct' : ' is-wrong') : ''
              return (
                <select
                  key={i}
                  className={`code-blank${state}`}
                  value={value}
                  disabled={revealed}
                  aria-label={`Lücke ${blankIndex}`}
                  onChange={(e) => onChange({ type: 'code', blanks: { ...blanks, [b.id]: e.target.value || null } })}
                >
                  <option value="">{`▾ Lücke ${blankIndex}`}</option>
                  {shuffled.get(b.id)!.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.code}
                    </option>
                  ))}
                </select>
              )
            })}
          </code>
        </pre>
      </figure>
      {revealed && (
        <div className="reveal-block">
          <h4>Auflösung</h4>
          <ol className="reveal-list">
            {q.blanks.map((b, i) => {
              const correctOpt = b.options.find((o) => o.correct)!
              const pick = b.options.find((o) => o.id === blanks[b.id])
              return (
                <li key={b.id}>
                  <strong>
                    Lücke {i + 1}: <code>{correctOpt.code}</code>
                  </strong>
                  <span lang={lang}>{renderInline(tx(correctOpt.why, lang))}</span>
                  {pick && !pick.correct && (
                    <span className="reveal-list__wrong">
                      Deine Wahl <code>{pick.code}</code>: <span lang={lang}>{renderInline(tx(pick.why, lang))}</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  )
}

export function CasePanel({ caseStudy, lang }: { caseStudy: CaseStudy; lang: Lang }) {
  return (
    <aside className="case-panel" aria-label="Fallstudie">
      <h3 className="case-panel__title">
        <Icon name="document" size={20} />
        <span>
          Fallstudie: <span lang={lang}>{tx(caseStudy.title, lang)}</span>
        </span>
      </h3>
      <RichText text={tx(caseStudy.scenario, lang)} className="case-panel__body" lang={lang} />
    </aside>
  )
}

export function QuestionView({ question: q, lang, answer, onChange, revealed, seed, caseStudy, examMode }: QuestionViewProps) {
  return (
    <div className={`question${caseStudy ? ' question--case' : ''}`}>
      {caseStudy && <CasePanel caseStudy={caseStudy} lang={lang} />}
      <div className="question__main">
        {examMode ? (
          <div className="q-meta q-meta--exam">
            <QuestionFeedback q={q} />
          </div>
        ) : (
          <QuestionMeta q={q} />
        )}
        <RichText text={tx(q.stem, lang)} className="question__stem" lang={lang} />
        {q.code && <CodeBlock code={q.code} />}
        {(q.type === 'single' || q.type === 'multi') && <ChoiceList q={q} lang={lang} answer={answer} onChange={onChange} revealed={revealed} seed={seed} />}
        {q.type === 'order' && <BuildList q={q} lang={lang} answer={answer} onChange={onChange} revealed={revealed} seed={seed} />}
        {q.type === 'match' && <MatchArea q={q} lang={lang} answer={answer} onChange={onChange} revealed={revealed} seed={seed} />}
        {q.type === 'code' && <CodeCompletion q={q} lang={lang} answer={answer} onChange={onChange} revealed={revealed} seed={seed} />}
      </div>
    </div>
  )
}

export function Explanation({ q, lang, answer }: { q: Question; lang: Lang; answer: Answer }) {
  const r = scoreQuestion(q, answer)
  const mod = moduleById.get(q.module)
  return (
    <div className="explanation">
      <p className="explanation__score">
        {r.correct ? 'Vollständig richtig.' : r.score > 0 ? `Teilweise richtig: ${r.partsCorrect} von ${r.parts} Teilen.` : 'Nicht richtig.'}
      </p>
      <RichText text={tx(q.explanation, lang)} className="explanation__text" lang={lang} />
      <div className="explanation__links">
        {mod && (
          <Link to={`/lernen/${mod.id}`} className="link-inline">
            <Icon name="book" size={16} />
            Lektion: {mod.title}
          </Link>
        )}
        {q.sources.map((s) => (
          <a key={s} href={s} target="_blank" rel="noreferrer" className="link-inline" title={s}>
            <Icon name="open" size={16} />
            {sourceLabel(s)}
          </a>
        ))}
      </div>
    </div>
  )
}
