import { useState } from 'react'
import Pagination from './Pagination'
import styles from './Pagination.module.css'

// Lista fictícia de produtos para paginar.
const ALL_PRODUCTS = [
  ['Teclado mecânico', 'R$ 320'],
  ['Mouse sem fio', 'R$ 150'],
  ['Monitor 27"', 'R$ 1.200'],
  ['Webcam Full HD', 'R$ 240'],
  ['Headset gamer', 'R$ 380'],
  ['Cadeira ergonômica', 'R$ 980'],
  ['Mesa digitalizadora', 'R$ 520'],
  ['Hub USB-C', 'R$ 190'],
  ['SSD 1 TB', 'R$ 430'],
  ['Microfone condensador', 'R$ 610'],
]

const PER_PAGE = 3

/**
 * PaginationDemo — uso prático da Pagination.
 *
 * Mantém a página atual no state (useState) e fatia a lista de
 * produtos para mostrar apenas os itens da página selecionada.
 */
function PaginationDemo() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(ALL_PRODUCTS.length / PER_PAGE)

  const start = (page - 1) * PER_PAGE
  const visible = ALL_PRODUCTS.slice(start, start + PER_PAGE)

  return (
    <div>
      <ul className={styles.list}>
        {visible.map(([name, price]) => (
          <li key={name} className={styles.listItem}>
            <span>{name}</span>
            <span className={styles.price}>{price}</span>
          </li>
        ))}
      </ul>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  )
}

export default PaginationDemo
