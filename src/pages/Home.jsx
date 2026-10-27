import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import HelpTip from '../components/HelpTip/HelpTip'
import styles from './Home.module.css'

/**
 * Home — página inicial com herói "liquid glass" sobre paisagem de fiorde.
 *
 * Demonstra (rotulado na página):
 *  - Notificação Toast (Context API): o formulário de newsletter dispara
 *    uma notificação global de sucesso.
 *  - useState + manipulação de eventos: controle do campo de e-mail.
 */
function Home() {
  const { notify } = useToast()
  const [email, setEmail] = useState('')

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email.trim()) {
      notify('Informe um e-mail para receber as ofertas.', 'warning')
      return
    }
    notify(`Inscrição confirmada! Ofertas enviadas para ${email}.`, 'success')
    setEmail('')
  }

  return (
    <>
      {/* ---------- HERÓI ---------- */}
      <section
        className={styles.hero}
        style={{ backgroundImage: 'url(/images/hero-fjord.jpg)' }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <div className={`${styles.heroCard} glass`}>
            <h1>Sinta a calma do mar em cada detalhe</h1>
            <p>
              Entenda seu roteiro, acompanhe a disponibilidade de cabines e veja
              as próximas partidas — tudo em um só lugar, com a Elton Cruzeiros.
            </p>
            <div className={styles.heroActions}>
              <Link to="/itinerarios" className="btn btn-primary">
                Ver itinerários
              </Link>
              <Link to="/navio" className="btn btn-ghost">
                Conhecer o navio
              </Link>
            </div>
          </div>

          {/* Painel de vidro líquido flutuante sobre a fotografia do fiorde */}
          <aside className={`${styles.tripCard} glass`} aria-label="Resumo da viagem">
            <div className={styles.tripRow}>
              <span className={styles.tripLabel}>Próxima partida</span>
              <span className={styles.tripValue}>Santos · 12 mar</span>
            </div>
            <div className={styles.routePreview}>
              <div className={styles.routeStop}>
                <span className={styles.stopCode}>SSZ</span>
                <span className={styles.stopName}>Porto de Santos</span>
              </div>
              <div className={styles.routeLine} aria-hidden="true">
                <span className={styles.routeDot} />
                <span className={styles.routeTrack} />
                <span className={styles.routeNights}>9 noites</span>
                <span className={styles.routeTrack} />
                <span className={styles.routeDot} />
              </div>
              <div className={styles.routeStop}>
                <span className={styles.stopCode}>BGO</span>
                <span className={styles.stopName}>Fiordes · Bergen</span>
              </div>
            </div>
            <div className={styles.tripRow}>
              <span className={styles.tripLabel}>Cabines com varanda a partir de</span>
              <span className={styles.price}>R$ 3.980</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- DESTAQUES EM LIQUID GLASS ---------- */}
      <section className="page">
        <div className={styles.highlights}>
          {[
            {
              t: 'Roteiros curados',
              d: 'Fiordes escandinavos, ilhas vulcânicas e vilarejos costeiros com paradas prolongadas.',
              img: '/images/island.jpg',
              tag: '9 destinos',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" />
                </svg>
              ),
            },
            {
              t: 'Cabines inteligentes',
              d: 'Disponibilidade em tempo real, varanda privativa sobre o mar e serviço de bordo 24h.',
              img: '/images/coast.jpg',
              tag: 'Vista 180°',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5" />
                  <path d="M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
                  <path d="M2 18h20" />
                </svg>
              ),
            },
            {
              t: 'Gastronomia a bordo',
              d: 'Cinco restaurantes autorais com ingredientes frescos de cada porto visitado.',
              img: '/images/sunset.jpg',
              tag: 'Pensão completa',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v9a3 3 0 0 1-6 0V3" />
                  <path d="M5 3v18" />
                  <path d="M19 3v18" />
                  <path d="M19 14c-2.5 0-4-2-4-5.5S16.5 3 19 3" />
                </svg>
              ),
            },
          ].map((h) => (
            <article
              key={h.t}
              className={styles.highlight}
              style={{ backgroundImage: `url(${h.img})` }}
            >
              <div className={styles.highlightTop}>
                <span className={styles.hicon} aria-hidden="true">{h.icon}</span>
                <span className={styles.htag}>{h.tag}</span>
              </div>
              <div className={styles.highlightBody}>
                <h3>{h.t}</h3>
                <p>{h.d}</p>
              </div>
            </article>
          ))}
        </div>

        {/* ---------- NEWSLETTER (Componente: Toast) ---------- */}
        <div
          className={`${styles.news} glass`}
          style={{ '--news-bg': 'url(/images/sunset.jpg)' }}
        >
          <div className="card-component-row" style={{ alignSelf: 'flex-start' }}>
            <span className="card-component">
              <svg className="component-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M7.2 2.5a1.5 1.5 0 0 1 3 0v.7h1.6a1.7 1.7 0 0 1 1.7 1.7v1.6h-.7a1.5 1.5 0 0 0 0 3h.7v1.6a1.7 1.7 0 0 1-1.7 1.7H3.9a1.7 1.7 0 0 1-1.7-1.7V4.9a1.7 1.7 0 0 1 1.7-1.7h3.3v-.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Componente:&nbsp;<strong>Notificação Toast</strong>
            </span>
            <HelpTip title="Notificação Toast">
              <p>O <strong>Toast</strong> mostra mensagens temporárias de feedback (sucesso, erro, aviso, info) num canto da tela.</p>
              <p><strong>Como funciona:</strong> usa <strong>estado global</strong> via <strong>Context API</strong> (<code>ToastProvider</code> + hook <code>useToast()</code>). Chamar <code>notify(mensagem, tipo)</code> adiciona um toast à lista.</p>
              <p><strong>Some sozinho:</strong> cada toast usa <code>useEffect</code> + <code>setTimeout</code> para se fechar após alguns segundos (ou no botão ×).</p>
              <p><strong>Liga-se a:</strong> qualquer componente — aqui o formulário de newsletter; em Itinerários, a ordenação e o botão "Reservar".</p>
              <p><strong>Acessibilidade:</strong> container com <code>aria-live</code> para leitores de tela anunciarem a mensagem.</p>
            </HelpTip>
          </div>
          <div className={styles.newsGrid}>
            <div className={styles.newsCopy}>
              <h2>Receba tarifas de última hora</h2>
              <p className={styles.newsDesc}>
                Ao enviar, uma <strong>notificação toast</strong> em vidro líquido (estado global via
                Context API) confirma a inscrição no canto da tela.
              </p>
            </div>
            <form className={styles.newsForm} onSubmit={handleSubscribe}>
              <label htmlFor="email" className="sr-only">Seu e-mail</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Quero ofertas</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
