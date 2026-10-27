import styles from './Pagination.module.css'

/**
 * Pagination — navegação entre páginas de conteúdo (ex.: listagem de produtos).
 *
 * Componente "puro" (controlado): recebe tudo via props.
 *  - totalPages: número total de páginas
 *  - currentPage: página atual (1-based)
 *  - onPageChange: callback chamado com o novo número de página
 *
 * Inclui botões anterior/próxima (desabilitados nos limites) e
 * botões para cada página, com a atual destacada.
 *
 * Acessibilidade: <nav aria-label>, aria-current="page" no botão
 * da página atual e aria-labels nos botões de navegação.
 */
function Pagination({ totalPages = 1, currentPage = 1, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  function go(page) {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange?.(page)
  }

  return (
    <nav className={styles.pagination} aria-label="Paginação">
      <button
        type="button"
        className={styles.navBtn}
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      <ul className={styles.pages}>
        {pages.map((page) => {
          const isCurrent = page === currentPage
          return (
            <li key={page}>
              <button
                type="button"
                className={`${styles.pageBtn} ${isCurrent ? styles.current : ''}`}
                onClick={() => go(page)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`Página ${page}`}
              >
                {page}
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className={styles.navBtn}
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        ›
      </button>
    </nav>
  )
}

export default Pagination
