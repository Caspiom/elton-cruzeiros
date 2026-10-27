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
            <span className={styles.kicker}>Temporada 2026 · Fiordes & Ilhas</span>
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

          {/* Mini "mockup" de vidro flutuante (dados fictícios) */}
          <aside className={`${styles.tripCard} glass`} aria-label="Resumo da viagem">
            <div className={styles.tripRow}>
              <span className={styles.tripLabel}>Próxima partida</span>
              <span className={styles.tripValue}>Santos · 12 mar</span>
            </div>
            <div className={styles.chart} aria-hidden="true">
              {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className={styles.chartCaption}>Procura por mês (jan–jul)</p>
            <div className={styles.tripRow}>
              <span className={styles.tripLabel}>A partir de</span>
              <span className={styles.price}>R$ 3.980</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- DESTAQUES ---------- */}
      <section className="page">
        <div className={styles.highlights}>
          {[
            { icon: '🧭', t: 'Roteiros curados', d: 'Fiordes, ilhas vulcânicas e vilarejos costeiros.' },
            { icon: '🛏️', t: 'Cabines inteligentes', d: 'Disponibilidade em tempo real e varanda privativa.' },
            { icon: '🍽️', t: 'Gastronomia a bordo', d: 'Menus assinados por chefs premiados.' },
          ].map((h) => (
            <article key={h.t} className={`${styles.highlight} glass`}>
              <span className={styles.hicon} aria-hidden="true">{h.icon}</span>
              <h3>{h.t}</h3>
              <p>{h.d}</p>
            </article>
          ))}
        </div>

        {/* ---------- NEWSLETTER (Componente: Toast) ---------- */}
        <div className={`${styles.news} glass`}>
          <div className="card-component-row" style={{ alignSelf: 'flex-start' }}>
            <span className="card-component">
              <span aria-hidden="true">🧩</span>&nbsp;Componente:&nbsp;<strong>Notificação Toast</strong>
            </span>
            <HelpTip title="Notificação Toast">
              <p>O <strong>Toast</strong> mostra mensagens temporárias de feedback (sucesso, erro, aviso, info) num canto da tela.</p>
              <p><strong>Como funciona:</strong> usa <strong>estado global</strong> via <strong>Context API</strong> (<code>ToastProvider</code> + hook <code>useToast()</code>). Chamar <code>notify(mensagem, tipo)</code> adiciona um toast à lista.</p>
              <p><strong>Some sozinho:</strong> cada toast usa <code>useEffect</code> + <code>setTimeout</code> para se fechar após alguns segundos (ou no botão ×).</p>
              <p><strong>Liga-se a:</strong> qualquer componente — aqui o formulário de newsletter; em Itinerários, a ordenação e o botão "Reservar".</p>
              <p><strong>Acessibilidade:</strong> container com <code>aria-live</code> para leitores de tela anunciarem a mensagem.</p>
            </HelpTip>
          </div>
          <h2>Receba ofertas de última hora</h2>
          <p className={styles.newsDesc}>
            Ao enviar, uma <strong>notificação toast</strong> (estado global via
            Context API) confirma a inscrição no canto da tela.
          </p>
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
      </section>
    </>
  )
}

export default Home
