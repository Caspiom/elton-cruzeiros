import './App.css'
import Card from './components/Card/Card'
import Accordion from './components/Accordion/Accordion'
import Tabs from './components/Tabs/Tabs'
import Dropdown from './components/Dropdown/Dropdown'
import ProgressDemo from './components/ProgressBar/ProgressDemo'

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

// Opções do menu suspenso (ex.: filtro de ordenação).
const sortOptions = [
  { label: 'Mais relevantes' },
  { label: 'Menor preço' },
  { label: 'Maior preço' },
  { label: 'Mais recentes' },
]
// Abas: seções de um perfil de produto (conteúdo fictício e relevante).
const productTabs = [
  {
    label: 'Descrição',
    content:
      'Fone de ouvido sem fio com cancelamento ativo de ruído e até 30 horas de bateria.',
  },
  {
    label: 'Especificações',
    content:
      'Bluetooth 5.3 · Driver de 40 mm · Peso 250 g · Carregamento USB-C · Resistência a respingos (IPX4).',
  },
  {
    label: 'Avaliações',
    content:
      'Nota média 4,7 de 5 em 1.240 avaliações. Destaques: conforto, qualidade de áudio e autonomia.',
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

          <Card
            title="Abas"
            badge="useState · teclado"
            description="Organização de conteúdo em painéis — exemplo de uso: detalhes de um produto."
          >
            <Tabs tabs={productTabs} />
          </Card>

          <Card
            title="Menu Suspenso"
            badge="useEffect · useRef"
            description="Seleção de uma opção a partir de uma lista — exemplo de uso: filtro de ordenação."
          >
            <Dropdown label="Ordenar por…" options={sortOptions} />
          </Card>

          <Card
            title="Barra de Progresso"
            badge="useEffect · props"
            description="Indicador visual de progresso — exemplo de uso: upload de arquivo."
          >
            <ProgressDemo />
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
