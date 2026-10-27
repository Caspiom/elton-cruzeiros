import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './NavBar.module.css'

// Itens de navegação (React Router)
const LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/itinerarios', label: 'Itinerários' },
  { to: '/navio', label: 'Nosso Navio' },
  { to: '/ajuda', label: 'Ajuda' },
]

/**
 * NavBar — cabeçalho de vidro, fixo no topo, com navegação por rotas.
 *
 * Conceitos demonstrados:
 *  - React Router: <NavLink> marca o link ativo automaticamente
 *  - useState: controla o menu "hambúrguer" em telas pequenas
 *  - responsividade: menu vira coluna sobreposta no mobile
 *
 * Acessibilidade: <nav aria-label>, botão com aria-expanded/aria-controls.
 */
function NavBar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <Link to="/" className={styles.brand} onClick={close}>
          <span className={styles.logo} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2" />
              <line x1="12" y1="7" x2="12" y2="21" />
              <path d="M5 13H2a10 10 0 0 0 20 0h-3" />
              <line x1="8" y1="10" x2="16" y2="10" />
            </svg>
          </span>
          <span>
            Elton<strong>Cruzeiros</strong>
          </span>
        </Link>

        <button
          type="button"
          className={styles.burger}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.bar} ${open ? styles.barOpen : ''}`} />
        </button>

        <ul
          id="menu-principal"
          className={`${styles.menu} ${open ? styles.menuOpen : ''}`}
        >
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={close}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/itinerarios" className="btn btn-primary" onClick={close}>
              Reservar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
