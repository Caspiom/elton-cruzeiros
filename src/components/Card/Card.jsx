import './Card.css'
import HelpTip from '../HelpTip/HelpTip'

/**
 * Card — painel de vidro ("liquid glass") que embrulha cada componente.
 *
 * Demonstra composição com props:
 *  - title: título "de verdade" da seção (ex.: "Perguntas frequentes")
 *  - component: NOME do componente da atividade (ex.: "Acordeão"),
 *    exibido como etiqueta clara para identificação na avaliação
 *  - help: explicação detalhada mostrada no "?" (HelpTip) ao lado do rótulo
 *  - concepts: conceitos React demonstrados (ex.: "useState · props")
 *  - description: texto curto explicando a seção
 *  - children: o componente visual em si (conteúdo aninhado)
 */
function Card({ title, component, help, concepts, description, children }) {
  return (
    <section className="card glass" aria-label={title}>
      {component && (
        <div className="card-component-row">
          <span className="card-component" title="Componente exigido na atividade">
            <span aria-hidden="true">🧩</span> Componente:&nbsp;<strong>{component}</strong>
          </span>
          {help && <HelpTip title={component}>{help}</HelpTip>}
        </div>
      )}
      <div className="card-head">
        <h2>{title}</h2>
        {concepts && <span className="card-concepts">{concepts}</span>}
      </div>
      {description && <p className="card-desc">{description}</p>}
      {children}
    </section>
  )
}

export default Card
