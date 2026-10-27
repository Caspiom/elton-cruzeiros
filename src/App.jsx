import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/Layout/NavBar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Itinerarios from './pages/Itinerarios'
import Navio from './pages/Navio'
import Ajuda from './pages/Ajuda'
import NotFound from './pages/NotFound'

/**
 * App — componente principal que orquestra o layout e as ROTAS.
 *
 * Estrutura:
 *  - <NavBar> e <Footer> aparecem em todas as páginas
 *  - <Routes> troca o conteúdo central conforme a URL (React Router)
 *
 * Cada página traz "um pouco da atividade": os 6 componentes exigidos
 * ficam distribuídos entre as páginas, sempre rotulados claramente.
 */
function App() {
  return (
    <div className="app">
      <NavBar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerarios" element={<Itinerarios />} />
          <Route path="/navio" element={<Navio />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
