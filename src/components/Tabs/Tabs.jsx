import { useState } from 'react'
import styles from './Tabs.module.css'

/**
 * Tabs — organiza conteúdo em painéis alternáveis (ex.: detalhes de produto).
 *
 * Conceitos React demonstrados:
 *  - props: recebe `tabs` ([{ label, content }])
 *  - state (useState): guarda o índice da aba ativa
 *  - manipulação de eventos: clique e navegação por teclado (setas)
 *
 * Acessibilidade (padrão WAI-ARIA Tabs):
 *  - container com role="tablist"
 *  - cada aba é role="tab" com aria-selected e aria-controls
 *  - cada painel é role="tabpanel" com aria-labelledby
 *  - setas esquerda/direita movem o foco entre as abas
 */
function Tabs({ tabs = [] }) {
  const [active, setActive] = useState(0)

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setActive((i) => (i + 1) % tabs.length)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setActive((i) => (i - 1 + tabs.length) % tabs.length)
    }
  }

  return (
    <div className={styles.tabs}>
      <div
        role="tablist"
        aria-label="Seções"
        className={styles.tablist}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const selected = index === active
          return (
            <button
              type="button"
              key={index}
              role="tab"
              id={`tab-${index}`}
              aria-selected={selected}
              aria-controls={`tabpanel-${index}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.active : ''}`}
              onClick={() => setActive(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={index !== active}
          className={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}

export default Tabs
