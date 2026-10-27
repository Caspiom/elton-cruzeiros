import { useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.css'

/**
 * Dropdown — botão que revela uma lista de opções (ex.: filtros, idioma).
 *
 * Conceitos React demonstrados:
 *  - props: `label` e `options` ([{ label, onSelect }])
 *  - state (useState): controla visibilidade e a opção escolhida
 *  - useRef: referência ao container para detectar clique externo
 *  - useEffect: adiciona/remove listeners de clique e tecla Escape
 *  - manipulação de eventos: clique, teclado e clique fora
 *
 * Comportamento: fecha ao selecionar uma opção, ao clicar fora
 * ou ao pressionar Escape.
 *
 * Acessibilidade: botão com aria-haspopup e aria-expanded; lista
 * com role="menu" e itens com role="menuitem".
 */
function Dropdown({ label = 'Selecione', options = [] }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    // Limpeza: remove os listeners quando fecha ou desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  function handleSelect(option) {
    setSelected(option.label)
    setOpen(false)
    if (typeof option.onSelect === 'function') {
      option.onSelect(option)
    }
  }

  return (
    <div className={styles.dropdown} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected ?? label}</span>
        <span className={`${styles.caret} ${open ? styles.caretUp : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul className={styles.menu} role="menu">
          {options.map((option, index) => (
            <li key={index} role="none">
              <button
                type="button"
                role="menuitem"
                className={styles.item}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
