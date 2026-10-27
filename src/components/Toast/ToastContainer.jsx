import Toast from './Toast'
import styles from './Toast.module.css'

/**
 * ToastContainer — região fixa que empilha as notificações ativas.
 *
 * Recebe a lista de toasts (do ToastContext) e renderiza um <Toast>
 * para cada um. aria-live="polite" garante que leitores de tela
 * anunciem novas mensagens.
 */
function ToastContainer({ toasts = [], onDismiss }) {
  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export default ToastContainer
