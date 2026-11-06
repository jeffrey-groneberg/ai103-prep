import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Icon } from './components/Icon.tsx'
import type { IconName } from './components/icons.generated.ts'
import { store, useProgress } from './lib/store.ts'
import { dueQuestions } from './lib/progress.ts'
import { questions } from './content/index.ts'
import { Home } from './pages/Home.tsx'
import { Learn } from './pages/Learn.tsx'
import { LessonPage } from './pages/LessonPage.tsx'
import { Practice } from './pages/Practice.tsx'
import { Exam } from './pages/Exam.tsx'
import { Review } from './pages/Review.tsx'
import { ProgressPage } from './pages/ProgressPage.tsx'
import { Coverage } from './pages/Coverage.tsx'
import { Resources } from './pages/Resources.tsx'
import { NotFound } from './pages/NotFound.tsx'

interface NavItem {
  to: string
  label: string
  icon: IconName
  activeIcon: IconName
  mobile?: boolean
}

const NAV: NavItem[] = [
  { to: '/', label: 'Start', icon: 'home', activeIcon: 'homeFilled', mobile: true },
  { to: '/lernen', label: 'Lernen', icon: 'book', activeIcon: 'bookFilled', mobile: true },
  { to: '/ueben', label: 'Üben', icon: 'practice', activeIcon: 'practiceFilled', mobile: true },
  { to: '/pruefung', label: 'Prüfung', icon: 'exam', activeIcon: 'examFilled', mobile: true },
  { to: '/wiederholen', label: 'Wiederholen', icon: 'review', activeIcon: 'reviewFilled', mobile: true },
  { to: '/fortschritt', label: 'Fortschritt', icon: 'progress', activeIcon: 'progressFilled' },
  { to: '/ressourcen', label: 'Ressourcen', icon: 'resources', activeIcon: 'resourcesFilled' },
]

function AppMark() {
  return (
    <svg className="app-mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <rect width="32" height="32" rx="7" />
      <text x="16" y="21" textAnchor="middle">
        103
      </text>
    </svg>
  )
}

function LangToggle() {
  const { lang } = useProgress()
  return (
    <div className="lang-toggle" role="group" aria-label="Sprache der Lerninhalte">
      {(['de', 'en'] as const).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} className={lang === l ? 'is-on' : ''} onClick={() => store.setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

const MORE: NavItem[] = [
  { to: '/fortschritt', label: 'Fortschritt', icon: 'progress', activeIcon: 'progressFilled' },
  { to: '/ressourcen', label: 'Ressourcen', icon: 'resources', activeIcon: 'resourcesFilled' },
  { to: '/abdeckung', label: 'Abdeckung', icon: 'grid', activeIcon: 'grid' },
]

/** Phone-only menu for the sections that don't fit the tab bar. */
function MoreMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="more-menu">
      <button
        type="button"
        className="icon-btn icon-btn--large"
        aria-expanded={open}
        aria-controls="more-menu"
        aria-label="Menü"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? 'dismiss' : 'menu'} size={22} />
      </button>
      {open && (
        <>
          <div className="more-menu__backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
          <nav id="more-menu" className="more-menu__panel" aria-label="Weitere Bereiche" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
            {MORE.map((n) => (
              <NavLink key={n.to} to={n.to} className="more-menu__link" onClick={() => setOpen(false)}>
                <Icon name={n.icon} size={20} />
                {n.label}
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export function App() {
  const progress = useProgress()
  const due = dueQuestions(questions, progress.cards).length
  const { pathname } = useLocation()
  const immersive = /^\/(ueben|wiederholen)\/sitzung|^\/pruefung\/laeuft/.test(pathname)

  return (
    <div className={`app${immersive ? ' app--immersive' : ''}`}>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <ScrollToTop />
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink to="/" className="brand" aria-label="AI-103 Prep – Start">
            <AppMark />
            <span className="brand__name">AI-103 Prep</span>
          </NavLink>
          <nav className="topnav" aria-label="Hauptnavigation">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className="topnav__link">
                {n.label}
                {n.to === '/wiederholen' && due > 0 && <span className="count-badge" aria-label={`${due} fällig`}>{due}</span>}
              </NavLink>
            ))}
          </nav>
          <LangToggle />
          <MoreMenu />
        </div>
      </header>
      <main id="main" className="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lernen" element={<Learn />} />
          <Route path="/lernen/:moduleId" element={<LessonPage />} />
          <Route path="/ueben" element={<Practice />} />
          <Route path="/ueben/sitzung" element={<Practice />} />
          <Route path="/pruefung" element={<Exam />} />
          <Route path="/pruefung/laeuft" element={<Exam />} />
          <Route path="/pruefung/ergebnis/:examId" element={<Exam />} />
          <Route path="/wiederholen" element={<Review />} />
          <Route path="/wiederholen/sitzung" element={<Review />} />
          <Route path="/fortschritt" element={<ProgressPage />} />
          <Route path="/abdeckung" element={<Coverage />} />
          <Route path="/ressourcen" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>
          Persönliche Lern-App, kein offizielles Microsoft-Produkt. Fragen sind eigene Formulierungen auf Basis der aktuellen Microsoft-Learn-Dokumentation – keine
          Prüfungsfragen, keine Dumps.
        </p>
      </footer>
      <nav className="tabbar" aria-label="Hauptnavigation (mobil)">
        {NAV.filter((n) => n.mobile).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className="tabbar__link">
            {({ isActive }) => (
              <>
                <span className="tabbar__icon">
                  <Icon name={isActive ? n.activeIcon : n.icon} size={22} />
                  {n.to === '/wiederholen' && due > 0 && <span className="tabbar__dot" aria-label={`${due} fällig`} />}
                </span>
                <span className="tabbar__label">{n.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
