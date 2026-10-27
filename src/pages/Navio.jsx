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
        <h1>Nosso Navio — Aurora Star</h1>
        <p>
          16 decks, 1.200 cabines e vista para o oceano em cada corredor.
          Conheça as seções e a disponibilidade atual.
        </p>
      </header>

      <div className="grid">
        <Card
          title="Explore o Aurora Star"
          component="Abas"
          concepts="useState · teclado"
          description="Alterne entre as seções do navio. As setas ← → também navegam."
        >
          <Tabs tabs={navioTabs} />
        </Card>

        <Card
          title="Disponibilidade de cabines"
          component="Barra de Progresso"
          concepts="props · 0–100"
          description="Ocupação atual por categoria para a próxima partida."
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
