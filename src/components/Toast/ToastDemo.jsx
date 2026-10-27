import { useToast } from '../../context/ToastContext'
import styles from './Toast.module.css'

/**
 * ToastDemo — botões que disparam notificações usando o contexto global.
 *
 * Note que este componente NÃO recebe nenhuma prop de estado: ele
 * obtém `notify` diretamente do ToastContext via hook useToast().
 */
function ToastDemo() {
  const { notify } = useToast()

  return (
    <div className={styles.demoActions}>
      <button
        type="button"
        className={`${styles.demoBtn} ${styles.success}`}
        onClick={() => notify('Operação concluída com sucesso!', 'success')}
      >
        Sucesso
      </button>
      <button
        type="button"
        className={`${styles.demoBtn} ${styles.error}`}
        onClick={() => notify('Falha ao salvar os dados.', 'error')}
      >
        Erro
      </button>
      <button
        type="button"
        className={`${styles.demoBtn} ${styles.info}`}
        onClick={() => notify('Novas atualizações disponíveis.', 'info')}
      >
        Info
      </button>
      <button
        type="button"
        className={`${styles.demoBtn} ${styles.warning}`}
        onClick={() => notify('Sua sessão expira em 5 minutos.', 'warning')}
      >
        Aviso
      </button>
    </div>
  )
}

export default ToastDemo
