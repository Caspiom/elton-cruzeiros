import { useEffect } from 'react'
import styles from './Toast.module.css'

// Ícone por tipo de notificação
const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
}

/**
 * Toast — mensagem temporária de feedback (sucesso, erro, info, aviso).
 *
 * Conceitos React demonstrados:
 *  - props: recebe id, message, type, duration e onDismiss
 *  - useEffect: agenda o fechamento automático e limpa o timer
 *  - manipulação de eventos: botão de fechar manual
 *
 * Acessibilidade: role="alert" para erros (anúncio imediato) e
 * role="status" para os demais; botão de fechar com aria-label.
 */
function Toast({ id, message, type = 'info', duration = 3500, onDismiss }) {
  useEffect(() => {
    if (!duration) return
    const timer = setTimeout(() => onDismiss(id), duration)
    return () => clearTimeout(timer) // limpa o timer ao desmontar
  }, [id, duration, onDismiss])

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      <span className={styles.icon} aria-hidden="true">
        {ICONS[type] ?? ICONS.info}
      </span>
      <p className={styles.message}>{message}</p>
      <button
        type="button"
        className={styles.close}
        onClick={() => onDismiss(id)}
        aria-label="Fechar notificação"
      >
        ✕
      </button>
    </div>
  )
}

export default Toast
