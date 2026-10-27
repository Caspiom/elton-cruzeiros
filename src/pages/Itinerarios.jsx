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

      {/* Barra de ferramentas: Menu Suspenso (rotulado) */}
      <div className={styles.toolbar}>
        <span className={styles.count}>{ordenados.length} cruzeiros encontrados</span>
        <div className={styles.sortBox}>
          <span className="card-component">
            <span aria-hidden="true">🧩</span>&nbsp;Componente:&nbsp;<strong>Menu Suspenso</strong>
          </span>
          <HelpTip title="Menu Suspenso">
            <p>O <strong>Menu Suspenso</strong> (dropdown) revela uma lista de opções a partir de um botão.</p>
            <p><strong>Como funciona:</strong> o estado (<code>useState</code>) controla se está aberto. Ao escolher uma opção, o menu chama o <code>callback</code> dela e se fecha.</p>
            <p><strong>Fecha sozinho:</strong> <code>useRef</code> + <code>useEffect</code> detectam clique fora ou tecla <code>Escape</code> (com limpeza do listener).</p>
            <p><strong>O que recebe:</strong> as opções por <code>props</code> ({'{ options: [{ label, onSelect }] }'}).</p>
            <p><strong>Liga-se a:</strong> ao escolher, reordena a lista (muda o estado) e dispara um <strong>toast</strong> via Context.</p>
          </HelpTip>
          <Dropdown label="Ordenar por…" options={sortOptions} />
        </div>
      </div>

      {/* Resultados */}
      <ul className={styles.results}>
        {visiveis.map((c) => (
          <li key={c.id} className={`${styles.cruise} glass`}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url(${c.img})` }}
              role="img"
              aria-label={`Paisagem de ${c.nome}`}
            >
              <span className={styles.nota}>★ {c.nota.toFixed(1)}</span>
            </div>
            <div className={styles.info}>
              <span className={styles.regiao}>{c.regiao}</span>
              <h3>{c.nome}</h3>
              <p className={styles.meta}>{c.noites} noites · pensão completa</p>
              <div className={styles.bottom}>
                <span className={styles.preco}>{brl(c.preco)}</span>
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

      {/* Paginação (rotulada) */}
      <div className={styles.pagerBox}>
        <div className="card-component-row">
          <span className="card-component">
            <span aria-hidden="true">🧩</span>&nbsp;Componente:&nbsp;<strong>Paginação</strong>
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
