import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon.tsx'
import { RichText } from '../components/RichText.tsx'
import { ZettelBox } from '../components/ZettelBox.tsx'
import { store } from '../lib/store.ts'
import { advance, buildDeck, countByFach, fachOf, GOAL, type Fach, type OwnZettel, type ZettelStates } from '../lib/zettel.ts'
import { nextRound, ROUND_SIZE, useZettelBox } from '../lib/zettel-box.ts'
import { plural, tx } from '../lib/i18n.ts'
import type { Lang, Zettel } from '../lib/types.ts'
import { orderedModules, starterZettel } from '../content/index.ts'
import { learningPaths, moduleById } from '../content/course.ts'

const KIND_LABEL: Record<Zettel['kind'], string> = { concept: 'Begriff', trap: 'Prüfungsfalle', takeaway: 'Merksatz', own: 'Eigener Zettel' }
const moduleNumber = new Map(orderedModules.map((m, i) => [m.id, i + 1]))

const ids = (cards: readonly Zettel[]) => cards.map((z) => z.id)
/** Own cards are written in the learner's own words, so they carry no content language. */
const langOf = (z: Zettel, lang: Lang) => (z.kind === 'own' ? undefined : lang)

function FachBadge({ fach }: { fach: Fach }) {
  return <span className={`zk-fach zk-fach--${fach}`}>Fach {fach}</span>
}

function SplitBar({ counts }: { counts: readonly [number, number, number] }) {
  return (
    <span className="zk-split" role="img" aria-label={`Fach 1: ${counts[0]}, Fach 2: ${counts[1]}, Fach 3: ${counts[2]}`}>
      {counts.map((n, i) => (n > 0 ? <span key={i} className={`zk-split__seg zk-split__seg--${i + 1}`} style={{ flexGrow: n }} /> : null))}
    </span>
  )
}

/**
 * "Alle zurück in Fach 1" asks first: it undoes the learner's progress for every card in scope. The question
 * focuses Abbrechen, never the destructive action; afterwards focus returns to the trigger (Abbrechen) or moves
 * to `focusAfter` (Zurücklegen), and a status line says what happened.
 */
function ResetCards({ cardIds, states, focusAfter }: { cardIds: string[]; states: ZettelStates; focusAfter: string }) {
  const [asking, setAsking] = useState(false)
  const [announce, setAnnounce] = useState('')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const moved = cardIds.filter((id) => fachOf(states, id) > 1)
  const status = (
    <p className="sr-only" role="status">
      {announce}
    </p>
  )
  const cancel = () => {
    setAsking(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }
  const reset = () => {
    store.resetZettel(moved)
    setAsking(false)
    setAnnounce(`${moved.length} ${moved.length === 1 ? 'Zettel liegt' : 'Zettel liegen'} wieder in Fach 1.`)
    requestAnimationFrame(() => document.getElementById(focusAfter)?.focus())
  }
  if (!moved.length) return status
  if (!asking) {
    return (
      <>
        {status}
        <button
          ref={triggerRef}
          type="button"
          className="btn btn--subtle btn--large"
          onClick={() => {
            setAnnounce('')
            setAsking(true)
          }}
        >
          <Icon name="reset" size={18} />
          Alle zurück in Fach 1
        </button>
      </>
    )
  }
  return (
    <>
      {status}
      <div className="zk-confirm" role="group" aria-labelledby="zk-confirm-q" onKeyDown={(e) => e.key === 'Escape' && cancel()}>
        <p id="zk-confirm-q" className="zk-confirm__q">
          {plural(moved.length, 'Zettel', 'Zettel')} zurück in Fach 1 legen?
        </p>
        <button type="button" className="btn btn--danger btn--large" onClick={reset}>
          Zurücklegen
        </button>
        <button type="button" className="btn btn--subtle btn--large" autoFocus onClick={cancel}>
          Abbrechen
        </button>
      </div>
    </>
  )
}

/** Fach colours of the split bars, as their legend. */
function FachLegend() {
  return (
    <ul className="zk-legend" aria-label="Farben der Fächer">
      {[1, 2, 3].map((f) => (
        <li key={f}>
          <span className={`zk-legend__swatch zk-split__seg--${f}`} aria-hidden="true" />
          Fach {f}
        </li>
      ))}
    </ul>
  )
}

/* ---------- Editor ---------- */

interface EditorProps {
  initial?: OwnZettel
  defaultModule?: string | null
  onDone: () => void
}

export function ZettelEditor({ initial, defaultModule = null, onDone }: EditorProps) {
  const [front, setFront] = useState(initial?.front ?? '')
  const [back, setBack] = useState(initial?.back ?? '')
  const [module, setModule] = useState(initial?.module ?? defaultModule ?? '')
  const [saved, setSaved] = useState(0)
  const frontRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => frontRef.current?.focus(), [])
  const ready = front.trim().length > 0 && back.trim().length > 0

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!ready) return
    const card = { front: front.trim(), back: back.trim(), module: module || null }
    if (initial) {
      store.updateOwnZettel(initial.id, card)
      onDone()
      return
    }
    store.addOwnZettel(card)
    setFront('')
    setBack('')
    setSaved((n) => n + 1)
    frontRef.current?.focus()
  }

  return (
    <form className="zk-editor" onSubmit={submit} onKeyDown={(e) => e.key === 'Escape' && onDone()}>
      <h2 className="panel__title">{initial ? 'Zettel bearbeiten' : 'Neuer Zettel'}</h2>
      <label className="zk-field">
        <span className="zk-field__label">Vorderseite · Frage</span>
        <textarea ref={frontRef} className="zk-input" rows={3} value={front} onChange={(e) => setFront(e.target.value)} placeholder="Was willst du dich fragen?" required />
      </label>
      <label className="zk-field">
        <span className="zk-field__label">Rückseite · Antwort</span>
        <textarea className="zk-input" rows={4} value={back} onChange={(e) => setBack(e.target.value)} placeholder="Die Antwort, die du wissen willst." required />
      </label>
      <label className="zk-field">
        <span className="zk-field__label">Modul</span>
        <select className="select zk-input" value={module} onChange={(e) => setModule(e.target.value)}>
          <option value="">Ohne Modul</option>
          {learningPaths.map((p) => (
            <optgroup key={p.id} label={p.title}>
              {p.modules.map((id) => (
                <option key={id} value={id}>
                  {moduleNumber.get(id)}. {moduleById.get(id)?.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <p className="zk-editor__hint">Code setzt du in `Backticks`. Neue Zettel starten hinten in Fach 1.</p>
      <div className="zk-editor__actions">
        <button type="submit" className="btn btn--primary" disabled={!ready}>
          {initial ? 'Speichern' : 'In Fach 1 legen'}
        </button>
        <button type="button" className="btn btn--subtle" onClick={onDone}>
          {saved ? 'Fertig' : 'Abbrechen'}
        </button>
        {saved > 0 && (
          <p className="zk-editor__saved" role="status">
            <Icon name="check" size={16} />
            {saved === 1 ? 'Liegt in Fach 1.' : `${saved} Zettel liegen in Fach 1.`}
          </p>
        )}
      </div>
    </form>
  )
}

/* ---------- Overview: the box and the register ---------- */

interface DividerProps {
  to: string
  learnTo: string
  tab: string
  title: string
  cards: readonly Zettel[]
  states: ZettelStates
  slot: number
  /** The next mixed round deals cards from this register. */
  next?: boolean
}

function Divider({ to, learnTo, tab, title, cards, states, slot, next = false }: DividerProps) {
  const counts = countByFach(ids(cards), states)
  const open = counts[0] + counts[1]
  const done = cards.length > 0 && open === 0
  return (
    <li className={`zk-divider${done ? ' is-done' : ''}`} style={{ '--slot': slot } as CSSProperties}>
      <span className="zk-divider__tab" aria-hidden="true">
        {done && <Icon name="check" size={12} />}
        {tab}
      </span>
      <div className="zk-divider__body">
        <div className="zk-divider__text">
          <Link to={to} className="zk-divider__title">
            {title}
          </Link>
          <span className="zk-divider__meta">
            {cards.length ? `${plural(cards.length, 'Zettel', 'Zettel')} · ${counts[2]} vorne` : 'Noch leer'}
            {done && <span className="sr-only"> · alle vorne</span>}
            {next && <span className="tag tag--brand">Nächste Runde</span>}
          </span>
        </div>
        {cards.length > 0 && <SplitBar counts={counts} />}
        {open > 0 ? (
          <Link to={learnTo} className="btn btn--secondary btn--small zk-divider__go" aria-label={`${title}: ${plural(open, 'offenen Zettel', 'offene Zettel')} lernen`}>
            Lernen
          </Link>
        ) : (
          <span className="zk-divider__go zk-divider__state">{done ? 'Alle vorne' : ''}</span>
        )}
      </div>
    </li>
  )
}

/** The divider in front of a learning path's modules: its whole split and a round across the path. */
function PathDivider({ index, pathId, title, cards, states }: { index: number; pathId: string; title: string; cards: readonly Zettel[]; states: ZettelStates }) {
  const counts = countByFach(ids(cards), states)
  const open = counts[0] + counts[1]
  const done = cards.length > 0 && open === 0
  return (
    <div className={`zk-divider zk-divider--path${done ? ' is-done' : ''}`}>
      <span className="zk-divider__tab" aria-hidden="true">
        {done && <Icon name="check" size={12} />}
        Lernpfad {index}
      </span>
      <div className="zk-divider__body">
        <div className="zk-divider__text">
          <h3 className="zk-divider__heading">
            <span className="sr-only">Lernpfad {index}: </span>
            {title}
          </h3>
          <span className="zk-divider__meta">
            {plural(cards.length, 'Zettel', 'Zettel')} · {counts[2]} vorne
          </span>
        </div>
        <SplitBar counts={counts} />
        {open > 0 ? (
          <Link
            to={`/zettel/lernen?pfad=${pathId}`}
            className="btn btn--secondary btn--small zk-divider__go"
            aria-label={`Lernpfad ${index}: Runde mit bis zu ${ROUND_SIZE} offenen Zetteln`}
          >
            Lernen
          </Link>
        ) : (
          <span className="zk-divider__go zk-divider__state">{done ? 'Alle vorne' : ''}</span>
        )}
      </div>
    </div>
  )
}

export function Zettelkasten() {
  const { cards, zettel, lessonsRead, ownZettel } = useZettelBox()
  const { search } = useLocation()
  const [adding, setAdding] = useState(() => new URLSearchParams(search).get('neu') === '1')
  const counts = countByFach(ids(cards), zettel)
  const round = nextRound(cards, zettel, lessonsRead)
  const byModule = useMemo(() => {
    const map = new Map<string, Zettel[]>()
    for (const z of cards) if (z.module) map.set(z.module, [...(map.get(z.module) ?? []), z])
    return map
  }, [cards])
  const own = cards.filter((z) => z.kind === 'own')
  const pct = cards.length ? Math.round((counts[2] / cards.length) * 100) : 0
  const moduleOf = new Map(cards.map((z) => [z.id, z.module]))
  const nextModules = new Set(round.map((id) => moduleOf.get(id)))

  return (
    <div className="page zk">
      <header className="page-head">
        <h1 className="page-title">Zettelkasten</h1>
        <p className="page-sub">
          Vorderseite: Frage, Rückseite: Antwort. Weißt du die Antwort, wandert der Zettel ein Fach nach vorn; weißt du sie nicht, kommt er zurück nach hinten in Fach 1.
          Geschafft ist ein Zettel, wenn er zwei Fächer vorgerückt ist und in Fach 3 steht.
        </p>
      </header>

      <div className="zk__grid">
        <div className="zk__side">
          <section className="panel zk-boxpanel" aria-labelledby="zk-box-h">
            <h2 id="zk-box-h" className="panel__title" tabIndex={-1}>
              Dein Kasten
            </h2>
            <ZettelBox counts={counts} />
            <p className="zk-tally">
              <strong>{counts[2]}</strong> von {cards.length} Zetteln stehen vorne
            </p>
            <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${pct} % der Zettel in Fach 3`}>
              <span className="meter__fill bg-brand" style={{ width: `${pct}%` }} />
            </div>
            <div className="zk-actions">
              {round.length > 0 && (
                <Link to="/zettel/lernen" className="btn btn--primary btn--large">
                  Runde mit {plural(round.length, 'Zettel', 'Zetteln')}
                  <Icon name="arrowRight" size={18} />
                </Link>
              )}
              <button type="button" className="btn btn--secondary btn--large" aria-expanded={adding} aria-controls="zk-editor" onClick={() => setAdding(true)}>
                <Icon name="add" size={18} />
                Neuer Zettel
              </button>
              {round.length === 0 && <ResetCards cardIds={ids(cards)} states={zettel} focusAfter="zk-box-h" />}
            </div>
            <p className="zk-note">
              {round.length > 0
                ? `Eine Runde nimmt bis zu ${ROUND_SIZE} offene Zettel, Module mit gelesener Lektion zuerst, und läuft, bis jeder davon in Fach 3 steht. Im Register siehst du, woher die nächste Runde kommt; ein Modul oder einen Lernpfad übst du über sein Register.`
                : 'Jeder Zettel steht in Fach 3. Leg alle zurück in Fach 1, wenn du den Kasten noch einmal durcharbeiten willst.'}
            </p>
          </section>
          {adding && (
            <section id="zk-editor" className="panel">
              <ZettelEditor onDone={() => setAdding(false)} />
            </section>
          )}
        </div>

        <section className="panel zk-register" aria-labelledby="zk-reg-h">
          <div className="panel__head">
            <h2 id="zk-reg-h" className="panel__title">
              Register
            </h2>
            <FachLegend />
          </div>
          {learningPaths.map((p, pi) => (
            <div key={p.id} className="zk-path">
              <PathDivider index={pi + 1} pathId={p.id} title={p.title} cards={p.modules.flatMap((id) => byModule.get(id) ?? [])} states={zettel} />
              <ol className="zk-dividers" aria-label={`Module in Lernpfad ${pi + 1}`}>
                {p.modules.map((id, i) => (
                  <Divider
                    key={id}
                    to={`/zettel/modul/${id}`}
                    learnTo={`/zettel/lernen?modul=${id}`}
                    tab={`Modul ${moduleNumber.get(id)}`}
                    title={moduleById.get(id)?.title ?? id}
                    cards={byModule.get(id) ?? []}
                    states={zettel}
                    slot={i % 4}
                    next={nextModules.has(id)}
                  />
                ))}
              </ol>
            </div>
          ))}
          <div className="zk-path">
            <h3 className="zk-own__title">Deine eigenen Zettel</h3>
            <ol className="zk-dividers">
              <Divider to="/zettel/eigene" learnTo="/zettel/lernen?eigene=1" tab="Eigene" title="Eigene Zettel" cards={own} states={zettel} slot={0} next={own.some((z) => round.includes(z.id))} />
            </ol>
            {ownZettel.length === 0 && <p className="zk-note">Schreib dir Zettel zu allem, was du dir merken willst; sie landen hier und im Register ihres Moduls.</p>}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ---------- One module's cards (or the own cards) ---------- */

function CardItem({ z, fach, lang }: { z: Zettel; fach: Fach; lang: Lang }) {
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const own = z.kind === 'own' ? store.get().ownZettel.find((o) => o.id === z.id) : undefined
  if (editing && own) {
    return (
      <li className="zk-card is-editing">
        <ZettelEditor initial={own} onDone={() => setEditing(false)} />
      </li>
    )
  }
  const contentLang = langOf(z, lang)
  return (
    <li className="zk-card">
      <div className="zk-card__head">
        <span className="zk-card__kind">{KIND_LABEL[z.kind]}</span>
        <FachBadge fach={fach} />
        {!own && (
          <button type="button" className="icon-btn zk-card__hide" onClick={() => store.setZettelHidden(z.id, true)} aria-label="Aus dem Kasten nehmen" title="Aus dem Kasten nehmen">
            <Icon name="eyeOff" size={16} />
          </button>
        )}
      </div>
      <RichText text={tx(z.front, lang)} className="zk-card__front" lang={contentLang} />
      <details className="zk-card__answer">
        <summary>Antwort</summary>
        {z.term && <p className="zk-card__term">{z.term}</p>}
        <RichText text={tx(z.back, lang)} lang={contentLang} />
      </details>
      {own && (
        <div className="zk-card__actions">
          {confirmDelete ? (
            <>
              <button type="button" className="btn btn--danger btn--small" onClick={() => store.deleteOwnZettel(z.id)}>
                Endgültig löschen
              </button>
              <button type="button" className="btn btn--subtle btn--small" onClick={() => setConfirmDelete(false)}>
                Abbrechen
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn--subtle btn--small" onClick={() => setEditing(true)}>
                <Icon name="edit" size={16} />
                Bearbeiten
              </button>
              <button type="button" className="btn btn--subtle btn--small" onClick={() => setConfirmDelete(true)}>
                <Icon name="trash" size={16} />
                Löschen
              </button>
            </>
          )}
        </div>
      )}
    </li>
  )
}

export function ZettelModule({ own = false }: { own?: boolean }) {
  const { moduleId = '' } = useParams()
  const { cards, zettel, lang, hiddenZettel } = useZettelBox()
  const [adding, setAdding] = useState(false)
  const module = own ? undefined : moduleById.get(moduleId)
  if (!own && !module) {
    return (
      <div className="page">
        <h1 className="page-title">Register nicht gefunden</h1>
        <p className="page-sub">Dieses Modul gibt es nicht.</p>
        <Link to="/zettel" className="btn btn--primary">
          Zum Zettelkasten
        </Link>
      </div>
    )
  }
  const list = own ? cards.filter((z) => z.kind === 'own') : cards.filter((z) => z.module === moduleId)
  const hidden = own ? [] : starterZettel.filter((z) => z.module === moduleId && hiddenZettel.includes(z.id))
  const counts = countByFach(ids(list), zettel)
  const open = counts[0] + counts[1]
  const title = own ? 'Eigene Zettel' : module!.title
  const learnTo = own ? '/zettel/lernen?eigene=1' : `/zettel/lernen?modul=${moduleId}`

  return (
    <div className="page zk-module">
      <nav className="breadcrumb" aria-label="Brotkrumen">
        <Link to="/zettel">Zettelkasten</Link>
        <Icon name="chevronRight" size={16} />
        <span aria-current="page">{own ? 'Eigene Zettel' : `Modul ${moduleNumber.get(moduleId)}`}</span>
      </nav>
      <header className="page-head">
        <h1 id="zk-module-h" className="page-title" tabIndex={-1}>
          {title}
        </h1>
        <p className="page-sub">
          {own
            ? 'Zettel, die du selbst geschrieben hast. Sie stehen auch im Register ihres Moduls.'
            : `${plural(list.length, 'Zettel', 'Zettel')} zu den Begriffen, Prüfungsfallen und Merksätzen der Lektion – plus deine eigenen zu diesem Modul.`}
        </p>
      </header>

      <section className="panel zk-module__box" aria-label="Fächer dieses Registers">
        <ZettelBox counts={counts} variant="compact" />
        <div className="zk-actions">
          {open > 0 && (
            <Link to={learnTo} className="btn btn--primary btn--large">
              {plural(open, 'Zettel', 'Zettel')} lernen
              <Icon name="arrowRight" size={18} />
            </Link>
          )}
          {!own && (
            <Link to={`/lernen/${moduleId}`} className="btn btn--secondary btn--large">
              Zur Lektion
            </Link>
          )}
          <button type="button" className="btn btn--secondary btn--large" aria-expanded={adding} onClick={() => setAdding(true)}>
            <Icon name="add" size={18} />
            Neuer Zettel
          </button>
          <ResetCards cardIds={ids(list)} states={zettel} focusAfter="zk-module-h" />
        </div>
      </section>

      {adding && (
        <section className="panel zk-module__editor">
          <ZettelEditor defaultModule={own ? null : moduleId} onDone={() => setAdding(false)} />
        </section>
      )}

      {list.length > 0 ? (
        <ol className="zk-cards">
          {list.map((z) => (
            <CardItem key={z.id} z={z} fach={fachOf(zettel, z.id)} lang={lang} />
          ))}
        </ol>
      ) : (
        <div className="panel empty">
          <Icon name="zettel" size={28} className="ink-brand" />
          <p>{own ? 'Noch keine eigenen Zettel. Schreib dir den ersten – er startet in Fach 1.' : 'In diesem Register liegt gerade kein Zettel.'}</p>
        </div>
      )}

      {hidden.length > 0 && (
        <details className="panel zk-hidden">
          <summary>Aus dem Kasten genommen ({hidden.length})</summary>
          <ul className="zk-hidden__list">
            {hidden.map((z) => (
              <li key={z.id}>
                <RichText inline text={tx(z.front, lang)} lang={lang} />
                <button type="button" className="btn btn--subtle btn--small" onClick={() => store.setZettelHidden(z.id, false)}>
                  <Icon name="undo" size={16} />
                  Zurücklegen
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}

/* ---------- A round ---------- */

function useReducedMotion() {
  return typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
}

function RoundSession({ search }: { search: string }) {
  const navigate = useNavigate()
  const { cards, zettel, lang } = useZettelBox()
  const params = new URLSearchParams(search)
  const scopeModule = params.get('modul')
  const ownOnly = params.get('eigene') === '1'
  const pathIndex = learningPaths.findIndex((p) => p.id === params.get('pfad'))
  const scopePath = pathIndex >= 0 ? learningPaths[pathIndex] : undefined
  const exitTo = scopeModule ? `/zettel/modul/${scopeModule}` : ownOnly ? '/zettel/eigene' : '/zettel'
  const scopeTitle = scopeModule
    ? `Modul ${moduleNumber.get(scopeModule)} · ${moduleById.get(scopeModule)?.title ?? ''}`
    : ownOnly
      ? 'Eigene Zettel'
      : scopePath
        ? `Lernpfad ${pathIndex + 1} · ${scopePath.title}`
        : 'Gemischte Runde'
  const pool = useMemo(
    () =>
      cards.filter((z) =>
        scopeModule ? z.module === scopeModule : ownOnly ? z.kind === 'own' : scopePath ? z.module !== null && scopePath.modules.includes(z.module) : true,
      ),
    [cards, scopeModule, ownOnly, scopePath],
  )
  // A module (or the own cards) is dealt in full; a learning path or the whole box twenty at a time.
  const [deck] = useState(() => {
    const s = store.get()
    return scopeModule || ownOnly ? buildDeck(pool, s.zettel) : nextRound(pool, s.zettel, s.lessonsRead)
  })
  const [queue, setQueue] = useState(deck)
  const [flipped, setFlipped] = useState(false)
  /** While a card flies into its compartment: where it came from, and the round as it stood before the answer. */
  const [moving, setMoving] = useState<{ from: Fach; counts: [number, number, number] } | null>(null)
  /** Counts dealt cards, so each card on the table is a fresh element (and its flight is never cut short). */
  const [dealt, setDealt] = useState(0)
  const [tally, setTally] = useState({ right: 0, wrong: 0 })
  const [arrival, setArrival] = useState<{ fach: Fach; key: number } | null>(null)
  const [announce, setAnnounce] = useState('')
  const cardRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()
  const byId = useMemo(() => new Map(cards.map((z) => [z.id, z])), [cards])
  const current = queue.length ? byId.get(queue[0]) : undefined
  // The box, the progress bar and the card's badge change when the card lands, together with the flash.
  const roundCounts = moving ? moving.counts : countByFach(deck, zettel)
  const fach = moving ? moving.from : current ? fachOf(zettel, current.id) : 1

  const rate = (knew: boolean) => {
    if (!current || moving) return
    const before = fachOf(store.get().zettel, current.id)
    const countsBefore = countByFach(deck, store.get().zettel)
    store.answerZettel(current.id, knew)
    const after = fachOf(store.get().zettel, current.id)
    setTally((t) => (knew ? { ...t, right: t.right + 1 } : { ...t, wrong: t.wrong + 1 }))
    setAnnounce(
      knew
        ? after === GOAL
          ? 'Gewusst. Der Zettel steht jetzt vorne in Fach 3.'
          : `Gewusst. Der Zettel wandert in Fach ${after}.`
        : 'Nicht gewusst. Der Zettel kommt zurück nach hinten in Fach 1.',
    )
    const land = () => {
      setQueue((q) => advance(q, after))
      setFlipped(false)
      setMoving(null)
      setDealt((d) => d + 1)
      setArrival({ fach: after, key: Date.now() })
    }
    const card = cardRef.current
    const target = boxRef.current?.querySelector(`[data-fach="${after}"]`)
    if (reduceMotion || !card || !target || typeof card.animate !== 'function') {
      land()
      return
    }
    // The one authored motion: the card flies into the compartment it now belongs to.
    setMoving({ from: before, counts: countsBefore })
    const a = card.getBoundingClientRect()
    const b = target.getBoundingClientRect()
    const dx = b.left + b.width / 2 - (a.left + a.width / 2)
    const dy = b.top + b.height / 2 - (a.top + a.height / 2)
    const motion = card.animate(
      [
        { transform: 'none', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.2 },
      ],
      { duration: 460, easing: 'cubic-bezier(0.55, 0, 0.2, 1)', fill: 'forwards' },
    )
    motion.onfinish = land
    motion.oncancel = land
  }

  useEffect(() => {
    cardRef.current?.focus({ preventScroll: true })
  }, [queue, flipped])

  useEffect(() => {
    if (!current) doneRef.current?.focus()
  }, [current])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.closest('button, a, input, textarea, select') || t.isContentEditable) && (e.key === 'Enter' || e.key === ' ')) return
      if (!flipped && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault()
        setFlipped(true)
      } else if (flipped && (e.key === '1' || e.key === 'ArrowLeft')) {
        e.preventDefault()
        rate(false)
      } else if (flipped && (e.key === '2' || e.key === 'ArrowRight')) {
        e.preventDefault()
        rate(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!current) {
    const after = countByFach(ids(pool), zettel)
    const stillOpen = after[0] + after[1]
    return (
      <div className="session-done zk-done">
        <div className="panel session-done__panel">
          <h1 ref={doneRef} tabIndex={-1} className="page-title">
            {deck.length ? 'Runde geschafft' : 'Hier ist alles vorne'}
          </h1>
          <p className="session-done__score">
            {deck.length ? (
              <>
                Alle <strong>{deck.length}</strong> Zettel dieser Runde stehen in Fach 3. Gewusst: {tally.right}, nicht gewusst: {tally.wrong}.
              </>
            ) : (
              'In dieser Auswahl steht schon jeder Zettel in Fach 3.'
            )}
          </p>
          <ZettelBox counts={after} variant="compact" />
          <div className="session-done__actions">
            {stillOpen > 0 && (
              <button type="button" className="btn btn--primary btn--large" onClick={() => navigate(`/zettel/lernen?${new URLSearchParams({ ...Object.fromEntries(params), r: String(Date.now()) })}`)}>
                Nächste Runde
                <Icon name="arrowRight" size={18} />
              </button>
            )}
            <Link to={exitTo} className={`btn ${stillOpen > 0 ? 'btn--secondary' : 'btn--primary'} btn--large`}>
              {scopeModule || ownOnly ? 'Zum Register' : 'Zum Zettelkasten'}
            </Link>
            <Link to="/" className="btn btn--subtle btn--large">
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const contentLang = langOf(current, lang)
  const nextFach = Math.min(GOAL, fach + 1) as Fach
  return (
    <div className="session zk-session">
      <div className="session__top">
        <button type="button" className="icon-btn icon-btn--large" onClick={() => navigate(exitTo)} aria-label="Runde beenden">
          <Icon name="dismiss" size={22} />
        </button>
        <div
          className="session__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={deck.length}
          aria-valuenow={roundCounts[2]}
          aria-label={`${roundCounts[2]} von ${deck.length} Zetteln dieser Runde in Fach 3`}
        >
          <span style={{ width: `${(roundCounts[2] / deck.length) * 100}%` }} />
        </div>
        <span className="session__count">
          {roundCounts[2]}/{deck.length} vorne
        </span>
      </div>
      <p className="zk-session__scope">{scopeTitle}</p>
      <div ref={boxRef} className="zk-session__box">
        <ZettelBox counts={roundCounts} variant="compact" receiving={arrival?.fach ?? null} pulseKey={arrival?.key ?? 0} />
      </div>

      <article
        ref={cardRef}
        key={`${current.id}-${flipped ? 'back' : 'front'}-${dealt}`}
        className={`zk-flip ${flipped ? 'is-back' : 'is-front'}${moving ? ' is-moving' : ''}`}
        tabIndex={-1}
        aria-labelledby="zk-side"
        aria-describedby="zk-content"
        onClick={() => !flipped && !moving && setFlipped(true)}
      >
        <header className="zk-flip__head">
          <span id="zk-side" className="zk-flip__side">
            {flipped ? 'Rückseite · Antwort' : 'Vorderseite · Frage'}
          </span>
          <span className="zk-flip__module">
            {current.module ? `Modul ${moduleNumber.get(current.module)}` : 'Eigener Zettel'} · {KIND_LABEL[current.kind]}
          </span>
          <FachBadge fach={fach} />
        </header>
        {flipped ? (
          <div className="zk-flip__body">
            <RichText text={tx(current.front, lang)} className="zk-flip__asked" lang={contentLang} />
            <div id="zk-content">
              {current.term && <p className="zk-flip__term">{current.term}</p>}
              <RichText text={tx(current.back, lang)} className="zk-flip__answer" lang={contentLang} />
            </div>
          </div>
        ) : (
          <div className="zk-flip__body">
            <div id="zk-content">
              <RichText text={tx(current.front, lang)} className="zk-flip__question" lang={contentLang} />
            </div>
            <p className="zk-flip__tap">Antworte im Kopf, dann dreh den Zettel um.</p>
          </div>
        )}
      </article>
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      <div className={`session__bar zk-bar${moving ? ' is-moving' : ''}`}>
        <div className="session__bar-inner">
          {!flipped ? (
            <>
              <p className="session__hint">
                Noch {plural(queue.length, 'Zettel', 'Zettel')} in dieser Runde <span className="zk-keys">· Leertaste dreht um</span>
              </p>
              <button type="button" className="btn btn--primary btn--large" onClick={() => setFlipped(true)}>
                <Icon name="eye" size={18} />
                Antwort zeigen
              </button>
            </>
          ) : (
            <div className="zk-rate">
              <button type="button" className="btn btn--large zk-rate__btn zk-rate__btn--miss" onClick={() => rate(false)}>
                <Icon name="dismissCircle" size={20} />
                <span className="zk-rate__text">
                  Nicht gewusst
                  <span className="zk-rate__dest">zurück in Fach 1</span>
                </span>
                <kbd className="zk-keys">1</kbd>
              </button>
              <button type="button" className="btn btn--large zk-rate__btn zk-rate__btn--hit" onClick={() => rate(true)}>
                <Icon name="checkCircle" size={20} />
                <span className="zk-rate__text">
                  Gewusst
                  <span className="zk-rate__dest">{fach === GOAL ? 'bleibt in Fach 3' : `weiter in Fach ${nextFach}`}</span>
                </span>
                <kbd className="zk-keys">2</kbd>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ZettelSession() {
  const { search } = useLocation()
  return <RoundSession key={search} search={search} />
}
