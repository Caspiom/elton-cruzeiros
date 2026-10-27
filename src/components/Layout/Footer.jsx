import styles from './Footer.module.css'

/**
 * Footer — rodapé de vidro com informações fictícias da empresa.
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>
            <span aria-hidden="true">⚓</span> Aurora Cruzeiros
          </p>
          <p className={styles.muted}>
            Travessias por fiordes, ilhas e costas deslumbrantes desde 1998.
          </p>
        </div>
        <div className={styles.cols}>
          <ul>
            <li className={styles.colTitle}>Empresa</li>
            <li>Sobre nós</li>
            <li>Carreiras</li>
            <li>Imprensa</li>
          </ul>
          <ul>
            <li className={styles.colTitle}>Suporte</li>
            <li>Central de ajuda</li>
            <li>Políticas de bordo</li>
            <li>Contato</li>
          </ul>
        </div>
      </div>
      <p className={styles.legal}>
        Atividade ReactJS — UCSal · Engenharia de Software · Prof. Elton
        Figueiredo da Silva. Conteúdo fictício para fins didáticos.
      </p>
    </footer>
  )
}

export default Footer
