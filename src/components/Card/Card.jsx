import './Card.css'

/**
 * Card — invólucro visual reutilizável para cada componente da vitrine.
 *
 * Demonstra composição com props:
 *  - title: título exibido no cabeçalho do card
 *  - badge: pequena etiqueta (ex.: nome do conceito React demonstrado)
 *  - description: texto curto explicando o propósito do componente
 *  - children: o componente visual em si (conteúdo aninhado)
 */
function Card({ title, badge, description, children }) {
  return (
    <section className="card" aria-label={title}>
      <h2>
        {title}
        {badge && <span className="badge">{badge}</span>}
      </h2>
      {description && <p className="desc">{description}</p>}
      {children}
    </section>
  )
}

export default Card
