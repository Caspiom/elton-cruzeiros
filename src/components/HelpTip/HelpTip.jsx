import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './HelpTip.module.css'

/**
 * HelpTip — botão "?" que abre um popover de vidro com a explicação
 * detalhada de um componente (como funciona, o que usa, a que se liga).
 *
 * Conceitos React demonstrados:
 *  - props: `title` (nome do componente) e `children` (a explicação)
 *  - state (useState): controla a visibilidade e a posição do popover
 *  - useRef + useEffect: fecha ao clicar fora ou apertar Escape (com limpeza)
 *  - createPortal: renderiza o popover no <body> para nunca ser cortado por
 *    overflow:hidden nem ficar atrás de abas, barras ou acordeão
 *
 * Acessibilidade: botão com aria-expanded/aria-label; popover com role
 * e aria-label; fecha com Escape e devolve o foco ao botão.
 */
function HelpTip({ title = 'Componente', children }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0, arrowLeft: 16 })
  const boxRef = useRef(null)
  const btnRef = useRef(null)
  const popRef = useRef(null)

  useLayoutEffect(() => {
    if (!open) return

    function updatePosition() {
      const btn = btnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const popWidth = Math.min(330, window.innerWidth * 0.88)
      const margin = 12

      // Se o botão estiver dentro de um card (.card / .glass), evita que o
      // popover ultrapasse a borda direita do próprio card
      const container = btn.closest('.card, .glass')
      const containerRect = container ? container.getBoundingClientRect() : null

      let idealLeft = rect.left - 14
      if (containerRect && containerRect.width >= popWidth + 24) {
        const maxCardLeft = containerRect.right - popWidth - 16
        const minCardLeft = containerRect.left + 16
        idealLeft = Math.max(minCardLeft, Math.min(idealLeft, maxCardLeft))
      }

      const clampedLeft = Math.max(
        margin,
        Math.min(idealLeft, window.innerWidth - popWidth - margin)
      )
      const btnCenter = rect.left + rect.width / 2
      const arrowLeft = Math.max(14, Math.min(popWidth - 22, btnCenter - clampedLeft - 6))

      setCoords({
        top: rect.bottom + 10,
        left: clampedLeft,
        arrowLeft,
      })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onClickOutside(e) {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target) &&
        popRef.current &&
        !popRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
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

      {open &&
        createPortal(
          <div
            ref={popRef}
            className={styles.pop}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              '--arrow-left': `${coords.arrowLeft}px`,
            }}
            role="dialog"
            aria-label={`Sobre: ${title}`}
          >
            <p className={styles.popTitle}>Como funciona — {title}</p>
            <div className={styles.popBody}>{children}</div>
          </div>,
          document.body
        )}
    </span>
  )
}

export default HelpTip
