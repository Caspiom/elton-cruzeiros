import Card from '../components/Card/Card'
import Accordion from '../components/Accordion/Accordion'

// FAQ fictício, porém relevante ao tema de cruzeiro.
const faq = [
  {
    title: 'O que está incluído no valor da cabine?',
    content:
      'Hospedagem, pensão completa nos restaurantes principais, acesso às piscinas, academia e à maioria dos shows de bordo. Excursões em terra e bebidas premium são à parte.',
  },
  {
    title: 'Preciso de passaporte e visto?',
    content:
      'Depende do itinerário. Para travessias internacionais, passaporte válido por pelo menos 6 meses é obrigatório; alguns portos exigem visto. Avisamos os documentos necessários na confirmação.',
  },
  {
    title: 'Posso cancelar ou remarcar minha viagem?',
    content:
      'Sim. Cancelamentos com mais de 60 dias de antecedência têm reembolso integral. Entre 59 e 30 dias, reembolso de 50%. Remarcações estão sujeitas à disponibilidade.',
  },
  {
    title: 'Há atividades para crianças?',
    content:
      'Sim! O Elton Star tem clube infantil com monitores, cinema ao ar livre, piscina rasa e oficinas temáticas durante toda a travessia.',
  },
  {
    title: 'Qual a política de bagagem?',
    content:
      'Cada passageiro pode levar duas malas de até 23 kg e uma bagagem de mão. Itens frágeis e medicamentos devem ir na bagagem de mão.',
  },
]

/**
 * Ajuda — central de ajuda (FAQ) usando o Acordeão.
 *
 * Demonstra o componente exigido (rotulado):
 *  - Acordeão (Accordion): seções expansíveis de perguntas frequentes
 */
function Ajuda() {
  return (
    <div className="page">
      <header className="pageHead">
        <h1>Central de Ajuda</h1>
        <p>Tire suas dúvidas antes de embarcar. Toque em uma pergunta para expandir.</p>
      </header>

      <Card
        title="Perguntas frequentes"
        component="Acordeão"
        concepts="useState · props"
        description="Apenas uma resposta fica aberta por vez, com transição suave."
        help={
          <>
            <p>O <strong>Acordeão</strong> empilha seções que expandem e colapsam — ideal para FAQ.</p>
            <p><strong>Como funciona:</strong> o estado (<code>useState</code>) guarda qual item está aberto; clicar no título alterna. Só um abre por vez e a transição de altura é suave (CSS grid).</p>
            <p><strong>O que recebe:</strong> os itens por <code>props</code> ({'{ items: [{ title, content }] }'}).</p>
            <p><strong>Liga-se a:</strong> a lista <code>faq</code> definida nesta página.</p>
            <p><strong>Acessibilidade:</strong> cada título é um <code>button</code> com <code>aria-expanded</code>/<code>aria-controls</code> e o conteúdo é uma <code>region</code>.</p>
          </>
        }
      >
        <Accordion items={faq} />
      </Card>
    </div>
  )
}

export default Ajuda
