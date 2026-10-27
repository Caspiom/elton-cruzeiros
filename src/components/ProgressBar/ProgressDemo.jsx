import { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import styles from './ProgressBar.module.css'

/**
 * ProgressDemo — uso prático da ProgressBar simulando um upload.
 *
 * Demonstra useState + useEffect: ao iniciar, um intervalo incrementa
 * o progresso até 100%. O efeito é limpo (clearInterval) ao desmontar
 * ou quando o upload termina/para.
 */
function ProgressDemo() {
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    const id = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5
        if (next >= 100) {
          clearInterval(id)
          setRunning(false)
          return 100
        }
        return next
      })
    }, 200)

    // Limpeza do intervalo (evita vazamento de memória)
    return () => clearInterval(id)
  }, [running])

  function start() {
    setProgress(0)
    setRunning(true)
  }

  return (
    <div className={styles.demo}>
      <ProgressBar value={progress} label="Enviando arquivo…" />
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btn}
          onClick={start}
          disabled={running}
        >
          {progress === 100 ? 'Enviar novamente' : 'Iniciar upload'}
        </button>
        <button
          type="button"
          className={styles.btnGhost}
          onClick={() => {
            setRunning(false)
            setProgress(0)
          }}
        >
          Limpar
        </button>
      </div>
    </div>
  )
}

export default ProgressDemo
