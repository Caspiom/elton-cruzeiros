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
          <span className={styles.logo} aria-hidden="true">⚓</span>
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
