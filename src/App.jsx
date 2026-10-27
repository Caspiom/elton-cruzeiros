import './App.css'

/**
 * App — componente principal que orquestra todos os demais.
 *
 * Cada componente visual fica dentro de um card (uma <section>
 * semântica) com título e descrição. A grade é responsiva e se
 * adapta a celular, tablet e desktop (ver App.css).
 *
 * Os componentes visuais serão adicionados à grade a seguir.
 */
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Vitrine de Componentes React</h1>
        <p>
          Acordeão · Paginação · Barra de Progresso · Abas · Menu Suspenso · Toast
        </p>
      </header>

      <main className="main">
        <div className="grid">
          {/* Os cards com os componentes serão inseridos aqui */}
        </div>
      </main>

      <footer className="footer">
        <p>Atividade ReactJS — UCSal · Engenharia de Software</p>
      </footer>
    </div>
  )
}

export default App
