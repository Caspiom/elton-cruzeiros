import { createContext, useCallback, useContext, useState } from 'react'
import ToastContainer from '../components/Toast/ToastContainer'

/**
 * ToastContext — Estado GLOBAL via Context API (Desafio Extra).
 *
 * Permite que QUALQUER componente da árvore dispare uma notificação
 * toast sem precisar passar props manualmente por vários níveis
 * ("prop drilling"). Isso demonstra compartilhamento de estado entre
 * componentes não diretamente relacionados.
 *
 * Uso:
 *   const { notify } = useToast()
 *   notify('Salvo com sucesso!', 'success')
 */
const ToastContext = createContext(null)

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Remove um toast pelo id (useCallback evita recriar a função a cada render)
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Adiciona um toast. type: 'success' | 'error' | 'info' | 'warning'
  const notify = useCallback((message, type = 'info', duration = 3500) => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type, duration }])
    return id
  }, [])

  return (
    <ToastContext.Provider value={{ notify, dismiss }}>
      {children}
      {/* O container fica fora do fluxo, fixo na tela */}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

/**
 * Hook para consumir o contexto. Lança erro claro se usado fora
 * do ToastProvider (boa prática de DX).
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast deve ser usado dentro de <ToastProvider>')
  }
  return ctx
}
