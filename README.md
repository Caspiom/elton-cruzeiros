# ⚓ Elton Cruzeiros

Site fictício de uma companhia de cruzeiros, criado como **Atividade de ReactJS** da
disciplina de Tópicos Avançados em Programação — Engenharia de Software (UCSal),
Prof. **Elton Figueiredo da Silva**.

A aplicação é uma **vitrine dos 6 componentes visuais** pedidos na atividade, montados
dentro de um site real, responsivo e com visual *liquid glass* (vidro fosco) sobre
paisagens marítimas.

🔗 **Repositório:** https://github.com/Caspiom/elton-cruzeiros

---

## 🚀 Como rodar

Pré-requisitos: **Node 18+** e **npm**.

```bash
npm install      # instala as dependências
npm run dev      # sobe o servidor de desenvolvimento (Vite) em http://localhost:5173
```

Outros comandos:

```bash
npm run build    # gera a versão de produção em dist/
npm run preview  # serve o build de produção localmente
npm run lint     # análise estática com oxlint
```

### Rodando no GitHub Codespaces
1. No repositório, clique em **Code → Codespaces → Create codespace on main**.
2. No terminal do Codespace: `npm install` e depois `npm run dev`.
3. Abra a porta **5173** encaminhada pelo Codespace.

---

## 🧩 Os 6 componentes (requisito 3)

Cada componente tem um rótulo visível **"Componente: X"** e um ícone **"?"** que abre um
popover explicando como ele funciona, quais props/hooks usa e a que se liga.

| # | Componente | Onde aparece | Conceitos de React | Acessibilidade |
|---|------------|--------------|--------------------|----------------|
| 1 | **Acordeão** | Ajuda (FAQ) | `useState`, `props`, transição suave (um aberto por vez) | `aria-expanded`, `aria-controls`, `region` |
| 2 | **Paginação** | Itinerários | componente **controlado** via `props` + `callback` `onPageChange` | `aria-current`, botões `disabled` nos extremos |
| 3 | **Barra de Progresso** | Nosso Navio | componente **puro** (valor 0–100 por `props`) | `role="progressbar"`, `aria-valuenow/min/max` |
| 4 | **Abas** | Nosso Navio | `useState`, navegação por teclado (← →) | `role="tablist/tab/tabpanel"`, `aria-selected` |
| 5 | **Menu Suspenso** | Itinerários | `useState`, `useRef`, `useEffect` (fecha ao clicar fora / Esc) | `aria-haspopup`, `aria-expanded` |
| 6 | **Notificação Toast** | global (disparado em Início e Itinerários) | **Context API**, `useEffect` + `setTimeout` | `aria-live`, `role="status/alert"` |

---

## ⭐ Desafio extra — os DOIS recursos

A atividade pede **um** recurso extra; este projeto implementa **os dois**:

- **React Router** — navegação entre páginas (`/`, `/itinerarios`, `/navio`, `/ajuda` e 404),
  usando `HashRouter` (funciona sem configuração de servidor, inclusive em hospedagem estática).
- **Context API (estado global)** — o `ToastProvider` guarda as notificações e qualquer
  componente dispara um toast pelo hook `useToast()`, sem *prop drilling*.

---

## 🗂️ Estrutura

```
src/
├── main.jsx                 # HashRouter + ToastProvider
├── App.jsx                  # NavBar + rotas + Footer (orquestra tudo)
├── index.css                # tema global + tokens de "liquid glass"
├── context/
│   └── ToastContext.jsx     # estado global dos toasts (Context API)
├── components/
│   ├── Accordion/  Tabs/  Dropdown/  ProgressBar/  Pagination/  Toast/
│   ├── Card/                # card de vidro com rótulo "Componente: X"
│   ├── HelpTip/             # ícone "?" com popover explicativo
│   └── Layout/              # NavBar (hambúrguer no mobile) + Footer
└── pages/
    ├── Home.jsx             # hero + newsletter (dispara Toast)
    ├── Itinerarios.jsx      # catálogo + Menu Suspenso + Paginação
    ├── Navio.jsx            # Abas + Barra de Progresso
    ├── Ajuda.jsx            # Acordeão (FAQ)
    └── NotFound.jsx         # página 404
```

---

## ✅ Mapa dos requisitos

- **1. Estrutura de componentes** — `App.jsx` orquestra NavBar, rotas e Footer; cada
  componente é modular com seu próprio CSS Module.
- **2. Responsividade** — CSS *mobile-first* com `media queries`: a grade vai de 1 → 2 → 3
  colunas e a navegação vira menu hambúrguer no celular.
- **3. 6 componentes** — ver tabela acima.
- **4. Conteúdo** — textos fictícios, porém coerentes com o tema de cruzeiros.
- **5. React.js** — componentes funcionais, `props`, `state`, hooks (`useState`,
  `useEffect`, `useRef`, `useContext`) e manipulação de eventos.
- **6. Acessibilidade e semântica** — tags `header/nav/main/section/footer`, atributos
  **ARIA** em todos os componentes e foco visível pelo teclado.
- **Extra** — React Router **e** Context API.

---

## 🎨 Tecnologias

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- CSS puro com **CSS Modules** (sem frameworks de UI)
- [oxlint](https://oxc.rs) para análise estática

---

## 📝 Créditos

Trabalho acadêmico — UCSal, Escola de Tecnologias, Engenharia de Software.
Imagens de paisagens via Unsplash, armazenadas localmente em `public/images/`.
