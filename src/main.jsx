import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

// Dois recursos de ponto extra combinados:
//  - HashRouter: navegação entre páginas (React Router). HashRouter
//    funciona sem configuração de servidor (ideal para GitHub Pages).
//  - ToastProvider: estado global via Context API para notificações.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </HashRouter>
  </StrictMode>,
)
