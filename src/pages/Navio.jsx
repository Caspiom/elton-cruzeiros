import Card from '../components/Card/Card'
import Tabs from '../components/Tabs/Tabs'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import styles from './Navio.module.css'

// Abas: seções do navio (conteúdo fictício e relevante).
const navioTabs = [
  {
    label: 'Cabines',
    content:
      'Cabines internas, com vista para o mar e suítes com varanda privativa. Todas climatizadas, com Wi-Fi de bordo e serviço de quarto 24h.',
  },
  {
    label: 'Comodidades',
    content:
      'Duas piscinas aquecidas, spa com sauna, academia panorâmica, teatro para 900 lugares e deck solar com vista 360°.',
  },
  {
    label: 'Gastronomia',
    content:
      'Cinco restaurantes temáticos, buffet internacional, cafeteria artesanal e menu assinado por chefs premiados, com opções veganas.',
  },
  {
    label: 'Entretenimento',
    content:
      'Shows ao vivo todas as noites, cassino, cinema ao ar livre, oficinas para crianças e excursões guiadas em cada porto.',
  },
]

// Disponibilidade por categoria (ocupação em %).
const ocupacao = [
  { tipo: 'Cabine interna', valor: 85 },
  { tipo: 'Vista para o mar', valor: 60 },
  { tipo: 'Suíte com varanda', valor: 32 },
]

/**
 * Navio — página do navio.
 *
 * Demonstra DOIS componentes exigidos (rotulados):
 *  - Abas (Tabs): organiza as seções do navio
 *  - Barra de Progresso (ProgressBar): mostra a ocupação das cabines
 */
function Navio() {
  return (
    <div className="page">
      <header className="pageHead">
        <h1>Nosso Navio — Elton Star</h1>
        <p>
          16 decks, 1.200 cabines e vista para o oceano em cada corredor.
          Conheça as seções e a disponibilidade atual.
        </p>
      </header>

      <div
        className={styles.shipBanner}
        style={{ backgroundImage: 'url(/images/ship.jpg)' }}
      >
        <div className={`${styles.shipSpecs} glass`}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Embarcação</span>
            <strong className={styles.specVal}>MS Elton Star</strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Conveses panorâmicos</span>
            <strong className={styles.specVal}>16 decks</strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Acomodações</span>
            <strong className={styles.specVal}>1.200 cabines</strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Autonomia</span>
            <strong className={styles.specVal}>Propulsão híbrida</strong>
          </div>
        </div>
      </div>

      <div className="grid">
        <Card
          title="Explore o Elton Star"
          component="Abas"
          concepts="useState · teclado"
          description="Alterne entre as seções do navio. As setas ← → também navegam."
          bgImage="/images/island.jpg"
          help={
            <>
              <p>As <strong>Abas</strong> organizam o conteúdo em painéis — só um fica visível por vez.</p>
              <p><strong>Como funciona:</strong> o estado (<code>useState</code>) guarda o índice da aba ativa; ao clicar (ou usar as setas ← →) o estado muda e o painel correspondente é exibido.</p>
              <p><strong>O que recebe:</strong> a lista de abas por <code>props</code> ({'{ tabs: [{ label, content }] }'}).</p>
              <p><strong>Liga-se a:</strong> os dados <code>navioTabs</code> definidos nesta página.</p>
              <p><strong>Acessibilidade:</strong> <code>role=tablist/tab/tabpanel</code>, <code>aria-selected</code> e foco "roving" (<code>tabIndex</code>).</p>
            </>
          }
        >
          <Tabs tabs={navioTabs} />
        </Card>

        <Card
          title="Disponibilidade de cabines"
          component="Barra de Progresso"
          concepts="props · 0–100"
          description="Ocupação atual por categoria para a próxima partida."
          bgImage="/images/sunset.jpg"
          help={
            <>
              <p>A <strong>Barra de Progresso</strong> mostra visualmente quanto de uma cota/tarefa já foi preenchido.</p>
              <p><strong>Como funciona:</strong> é um componente "puro" — recebe o valor (0–100) por <code>props</code> e ajusta a largura do preenchimento. O valor é limitado (clamp) a 0–100.</p>
              <p><strong>Liga-se a:</strong> os dados <code>ocupacao</code> desta página — uma barra por categoria de cabine.</p>
              <p><strong>Acessibilidade:</strong> <code>role=progressbar</code> com <code>aria-valuenow/valuemin/valuemax</code>.</p>
            </>
          }
        >
          <div className={styles.bars}>
            {ocupacao.map((o) => (
              <ProgressBar key={o.tipo} value={o.valor} label={o.tipo} />
            ))}
          </div>
          <p className={styles.hint}>
            Quanto mais cheia a barra, menos vagas restam nessa categoria.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Navio
