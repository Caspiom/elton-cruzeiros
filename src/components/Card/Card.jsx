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
function Card({ title, component, help, concepts, description, bgImage, children }) {
  return (
    <section
      className="card glass"
      aria-label={title}
      style={bgImage ? { '--card-bg-image': `url(${bgImage})` } : undefined}
    >
      {component && (
        <div className="card-component-row">
          <span className="card-component" title="Componente exigido na atividade">
            <svg className="component-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M7.2 2.5a1.5 1.5 0 0 1 3 0v.7h1.6a1.7 1.7 0 0 1 1.7 1.7v1.6h-.7a1.5 1.5 0 0 0 0 3h.7v1.6a1.7 1.7 0 0 1-1.7 1.7H3.9a1.7 1.7 0 0 1-1.7-1.7V4.9a1.7 1.7 0 0 1 1.7-1.7h3.3v-.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Componente:&nbsp;<strong>{component}</strong>
          </span>
          {help && <HelpTip title={component}>{help}</HelpTip>}
        </div>
      )}
      <div className="card-head">
        <h2>{title}</h2>
        {concepts && <span className="card-concepts">{concepts}</span>}
      </div>
      {description && <p className="card-desc">{description}</p>}
      <div className="card-body">{children}</div>
    </section>
  )
}

export default Card
