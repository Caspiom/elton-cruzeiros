import { useEffect, useRef, useState } from 'react'
import styles from './HelpTip.module.css'

/**
 * HelpTip — botão "?" que abre um popover de vidro com a explicação
 * detalhada de um componente (como funciona, o que usa, a que se liga).
 *
 * Conceitos React demonstrados:
 *  - props: `title` (nome do componente) e `children` (a explicação)
 *  - state (useState): controla a visibilidade do popover
 *  - useRef + useEffect: fecha ao clicar fora ou apertar Escape (com limpeza)
 *  - manipulação de eventos: clique no botão e na tecla Escape
 *
 * Acessibilidade: botão com aria-expanded/aria-label; popover com role
 * e aria-labelledby; fecha com Escape e devolve o foco ao botão.
 */
function HelpTip({ title = 'Componente', children }) {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    function onEsc(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  return (
    <span className={styles.wrap} ref={boxRef}>
      <button
        ref={btnRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-label={`Como funciona o componente ${title}`}
        onClick={() => setOpen((v) => !v)}
      >
        ?
      </button>

      {open && (
        <div className={`${styles.pop} glass`} role="dialog" aria-label={`Sobre: ${title}`}>
          <p className={styles.popTitle}>Como funciona — {title}</p>
          <div className={styles.popBody}>{children}</div>
        </div>
      )}
    </span>
  )
}

export default HelpTip
