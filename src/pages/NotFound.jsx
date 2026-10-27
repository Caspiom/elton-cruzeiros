import { Link } from 'react-router-dom'

/**
 * NotFound — rota coringa (404) do React Router.
 */
function NotFound() {
  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <div
        className="glass"
        style={{ padding: '3rem 1.5rem', maxWidth: 520, margin: '2rem auto' }}
      >
        <p style={{ fontSize: '3rem', margin: 0 }} aria-hidden="true">🧭</p>
        <h1>Rota não encontrada</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          A página que você procura saiu do mapa. Vamos voltar ao porto?
        </p>
        <Link to="/" className="btn btn-primary">
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}

export default NotFound
