import styles from './ProgressBar.module.css'

/**
 * ProgressBar — indicador visual de progresso de uma tarefa.
 *
 * Componente "puro" (apresentacional): todo o estado vem via props.
 *  - value: progresso de 0 a 100 (é limitado a esse intervalo)
 *  - label: texto opcional exibido acima da barra
 *  - showValue: se true, mostra a porcentagem
 *
 * Acessibilidade: role="progressbar" com aria-valuenow/min/max.
 */
function ProgressBar({ value = 0, label, showValue = true }) {
  // Garante que o valor fique sempre entre 0 e 100.
  const clamped = Math.min(100, Math.max(0, Math.round(value)))

  return (
    <div className={styles.wrapper}>
      {(label || showValue) && (
        <div className={styles.topRow}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{clamped}%</span>}
        </div>
      )}

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progresso'}
      >
        <div className={styles.fill} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
