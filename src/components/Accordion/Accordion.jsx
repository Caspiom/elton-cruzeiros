import { useState } from 'react'
import styles from './Accordion.module.css'

/**
 * Accordion — seções de conteúdo expansíveis/colapsáveis (ex.: FAQ).
 *
 * Conceitos React demonstrados:
 *  - props: recebe `items` ([{ title, content }]) e `allowMultiple`
 *  - state (useState): guarda quais índices estão abertos
 *  - manipulação de eventos: onClick no cabeçalho de cada item
 *
 * Por padrão apenas um item fica aberto por vez. Passe
 * allowMultiple={true} para permitir vários abertos.
 *
 * Acessibilidade: usa <button> com aria-expanded e aria-controls,
 * e a região de conteúdo com role="region" + aria-labelledby.
 */
function Accordion({ items = [], allowMultiple = false }) {
  // Conjunto de índices abertos. Set é prático para alternar itens.
  const [openIndexes, setOpenIndexes] = useState(() => new Set())

  function toggle(index) {
    setOpenIndexes((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      if (prev.has(index)) {
        next.delete(index) // já estava aberto -> fecha
      } else {
        next.add(index) // abre o item clicado
      }
      return next
    })
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndexes.has(index)
        const headingId = `acc-header-${index}`
        const panelId = `acc-panel-${index}`

        return (
          <div className={styles.item} key={index}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={headingId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span>{item.title}</span>
                <span className={styles.icon} aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>

            {/* A transição suave é feita animando grid-template-rows
                (de 0fr para 1fr), técnica moderna de CSS. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={`${styles.panel} ${isOpen ? styles.open : ''}`}
            >
              <div className={styles.panelInner}>{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
