import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page">
      <header className="page-head">
        <h1 className="page-title">Diese Seite gibt es nicht</h1>
        <p className="page-sub">Der Link ist veraltet oder vertippt. Über den Lernpfad findest du jede Lektion.</p>
      </header>
      <Link to="/" className="btn btn--primary">
        Zum Lernpfad
      </Link>
    </div>
  )
}
