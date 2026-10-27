import { useMemo, useState } from 'react'
import Dropdown from '../components/Dropdown/Dropdown'
import Pagination from '../components/Pagination/Pagination'
import HelpTip from '../components/HelpTip/HelpTip'
import { useToast } from '../context/ToastContext'
import styles from './Itinerarios.module.css'

// Catálogo fictício de cruzeiros (dados falsos, tema viagem).
const CRUISES = [
  { id: 1, nome: 'Fiordes da Noruega', regiao: 'Escandinávia', noites: 9, preco: 7890, nota: 4.9, img: '/images/hero-fjord.jpg' },
  { id: 2, nome: 'Ilhas do Mediterrâneo', regiao: 'Europa', noites: 7, preco: 5490, nota: 4.7, img: '/images/island.jpg' },
  { id: 3, nome: 'Costa do Pacífico', regiao: 'América do Sul', noites: 5, preco: 3980, nota: 4.5, img: '/images/coast.jpg' },
  { id: 4, nome: 'Pôr do sol no Caribe', regiao: 'Caribe', noites: 8, preco: 6990, nota: 4.8, img: '/images/sunset.jpg' },
  { id: 5, nome: 'Montanhas do Alasca', regiao: 'América do Norte', noites: 10, preco: 9450, nota: 4.9, img: '/images/mountains.jpg' },
  { id: 6, nome: 'Travessia Transatlântica', regiao: 'Oceano Atlântico', noites: 12, preco: 10900, nota: 4.6, img: '/images/ship.jpg' },
  { id: 7, nome: 'Litoral Português', regiao: 'Europa', noites: 6, preco: 4790, nota: 4.4, img: '/images/coast.jpg' },
  { id: 8, nome: 'Arquipélago dos Açores', regiao: 'Atlântico', noites: 7, preco: 5990, nota: 4.7, img: '/images/island.jpg' },
  { id: 9, nome: 'Aurora Boreal', regiao: 'Ártico', noites: 11, preco: 11200, nota: 5.0, img: '/images/mountains.jpg' },
]

const PER_PAGE = 3
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

/**
 * Itinerarios — página de listagem de cruzeiros.
 *
 * Demonstra DOIS componentes exigidos (rotulados):
 *  - Menu Suspenso (Dropdown): ordena a lista
 *  - Paginação (Pagination): navega entre páginas de resultados
 *
 * Usa useState (ordenação + página) e useMemo (lista ordenada).
 */
function Itinerarios() {
  const { notify } = useToast()
  const [ordem, setOrdem] = useState('relevancia')
  const [page, setPage] = useState(1)

  const ordenados = useMemo(() => {
    const arr = [...CRUISES]
    if (ordem === 'preco') arr.sort((a, b) => a.preco - b.preco)
    else if (ordem === 'noites') arr.sort((a, b) => a.noites - b.noites)
    else if (ordem === 'nota') arr.sort((a, b) => b.nota - a.nota)
    return arr
  }, [ordem])

  const totalPages = Math.ceil(ordenados.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const visiveis = ordenados.slice(start, start + PER_PAGE)

  const sortOptions = [
    { label: 'Mais relevantes', value: 'relevancia' },
    { label: 'Menor preço', value: 'preco' },
    { label: 'Menor duração', value: 'noites' },
    { label: 'Melhor avaliação', value: 'nota' },
  ].map((o) => ({
    label: o.label,
    onSelect: () => {
      setOrdem(o.value)
      setPage(1)
      notify(`Ordenando por: ${o.label}`, 'info')
    },
  }))

  return (
    <div className="page">
      <header className="pageHead">
        <h1>Itinerários</h1>
        <p>
          Escolha o seu próximo destino. Use o menu para ordenar e a paginação
          para navegar pelos {CRUISES.length} cruzeiros disponíveis.
        </p>
      </header>

      {/* Barra de ferramentas em vidro líquido: Menu Suspenso (rotulado) */}
      <div className={`${styles.toolbar} glass`}>
        <div className={styles.toolbarInfo}>
          <span className={styles.countBadge}>{ordenados.length} roteiros</span>
          <span className={styles.count}>Exibindo {start + 1}–{Math.min(start + PER_PAGE, ordenados.length)} de {ordenados.length} travessias</span>
        </div>
        <div className={styles.sortBox}>
          <div className="card-component-row">
            <span className="card-component">
              <svg className="component-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M7.2 2.5a1.5 1.5 0 0 1 3 0v.7h1.6a1.7 1.7 0 0 1 1.7 1.7v1.6h-.7a1.5 1.5 0 0 0 0 3h.7v1.6a1.7 1.7 0 0 1-1.7 1.7H3.9a1.7 1.7 0 0 1-1.7-1.7V4.9a1.7 1.7 0 0 1 1.7-1.7h3.3v-.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Componente:&nbsp;<strong>Menu Suspenso</strong>
            </span>
            <HelpTip title="Menu Suspenso">
              <p>O <strong>Menu Suspenso</strong> (dropdown) revela uma lista de opções a partir de um botão.</p>
              <p><strong>Como funciona:</strong> o estado (<code>useState</code>) controla se está aberto. Ao escolher uma opção, o menu chama o <code>callback</code> dela e se fecha.</p>
              <p><strong>Fecha sozinho:</strong> <code>useRef</code> + <code>useEffect</code> detectam clique fora ou tecla <code>Escape</code> (com limpeza do listener).</p>
              <p><strong>O que recebe:</strong> as opções por <code>props</code> ({'{ options: [{ label, onSelect }] }'}).</p>
              <p><strong>Liga-se a:</strong> ao escolher, reordena a lista (muda o estado) e dispara um <strong>toast</strong> via Context.</p>
            </HelpTip>
          </div>
          <Dropdown label="Ordenar por…" options={sortOptions} />
        </div>
      </div>

      {/* Resultados com cards em Liquid Glass real sobre a fotografia */}
      <ul className={styles.results}>
        {visiveis.map((c) => (
          <li key={c.id} className={styles.cruise}>
            <div
              className={styles.photoBackdrop}
              style={{ backgroundImage: `url(${c.img})` }}
              role="img"
              aria-label={`Paisagem de ${c.nome}`}
            />
            <div className={styles.cardTop}>
              <span className={styles.regiao}>{c.regiao}</span>
              <span className={styles.nota} aria-label={`Avaliação ${c.nota.toFixed(1)} de 5`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5l2.85 5.78 6.38.93-4.61 4.5 1.09 6.35L12 17.06l-5.71 3 1.09-6.35-4.61-4.5 6.38-.93L12 2.5z" />
                </svg>
                {c.nota.toFixed(1)}
              </span>
            </div>
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <h3>{c.nome}</h3>
                <p className={styles.meta}>
                  <span>{c.noites} noites</span>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>Pensão completa</span>
                </p>
              </div>
              <div className={styles.bottom}>
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Por pessoa</span>
                  <span className={styles.preco}>{brl(c.preco)}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => notify(`Reserva iniciada: ${c.nome}`, 'success')}
                >
                  Reservar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginação (rotulada) em dock de vidro líquido */}
      <div className={`${styles.pagerBox} glass`}>
        <div className="card-component-row">
          <span className="card-component">
            <svg className="component-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M7.2 2.5a1.5 1.5 0 0 1 3 0v.7h1.6a1.7 1.7 0 0 1 1.7 1.7v1.6h-.7a1.5 1.5 0 0 0 0 3h.7v1.6a1.7 1.7 0 0 1-1.7 1.7H3.9a1.7 1.7 0 0 1-1.7-1.7V4.9a1.7 1.7 0 0 1 1.7-1.7h3.3v-.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Componente:&nbsp;<strong>Paginação</strong>
          </span>
          <HelpTip title="Paginação">
            <p>A <strong>Paginação</strong> divide uma lista longa em páginas e navega entre elas.</p>
            <p><strong>Como funciona:</strong> é um componente <strong>controlado</strong> — recebe por <code>props</code> o total de páginas e a página atual, e avisa a mudança pelo <code>callback</code> <code>onPageChange</code>.</p>
            <p><strong>Botões:</strong> "anterior/próxima" ficam <strong>desabilitados</strong> nos extremos; a página atual é destacada com <code>aria-current</code>.</p>
            <p><strong>Liga-se a:</strong> o estado <code>page</code> desta página, que fatia (<code>slice</code>) a lista de cruzeiros exibida.</p>
          </HelpTip>
        </div>
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
      </div>
    </div>
  )
}

export default Itinerarios
