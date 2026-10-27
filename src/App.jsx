import './App.css'
import Card from './components/Card/Card'
import Accordion from './components/Accordion/Accordion'

// Conteúdo fictício, porém semanticamente relevante (FAQ) para o acordeão.
const faqItems = [
  {
    title: 'O que é este projeto?',
    content:
      'Uma vitrine de componentes de interface construídos com React.js, demonstrando componentes, props, estado e hooks.',
  },
  {
    title: 'A aplicação é responsiva?',
    content:
      'Sim. O layout é mobile-first e se reorganiza em celulares, tablets e desktops usando CSS Grid e media queries.',
  },
  {
    title: 'Quais conceitos de React são usados?',
    content:
      'Componentes funcionais, passagem de dados via props, estado local com useState, efeitos com useEffect e manipulação de eventos.',
  },
]

/**
 * App — componente principal que orquestra todos os demais.
 *
 * Cada componente visual fica dentro de um <Card> (uma <section>
 * semântica) com título e descrição. A grade é responsiva e se
 * adapta a celular, tablet e desktop (ver App.css).
 */
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Vitrine de Componentes React</h1>
        <p>
          Acordeão · Paginação · Barra de Progresso · Abas · Menu Suspenso · Toast
        </p>
      </header>

      <main className="main">
        <div className="grid">
          <Card
            title="Acordeão"
            badge="useState · props"
            description="Seções expansíveis/colapsáveis — exemplo de uso: Perguntas Frequentes (FAQ)."
          >
            <Accordion items={faqItems} />
          </Card>
        </div>
      </main>

      <footer className="footer">
        <p>Atividade ReactJS — UCSal · Engenharia de Software</p>
      </footer>
    </div>
  )
}

export default App
