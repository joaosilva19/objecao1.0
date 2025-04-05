import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ObjectionPage from './components/ObjectionPage';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

export interface Response {
  text: string;
  positive: number;
  negative: number;
}

export interface Objection {
  id: number;
  title: string;
  responses: Response[];
  clicks: number;
}

function App() {
  const [objections, setObjections] = useState<Objection[]>([
    {
      id: 1,
      title: "Não tenho tempo agora",
      responses: [
        { text: "Nosso processo é otimizado para reduzir o tempo de contratação.", positive: 0, negative: 0 },
        { text: "Podemos agendar uma ligação rápida para esclarecer detalhes técnicos.", positive: 0, negative: 0 },
        { text: "Você garante proteção sem interromper sua rotina.", positive: 0, negative: 0 },
        { text: "Comparando com outros compromissos, vale a pena reservar alguns minutos para evitar prejuízos.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 2,
      title: "Já tenho um seguro",
      responses: [
        { text: "Verificamos tecnicamente a abrangência e cláusulas do seu seguro atual.", positive: 0, negative: 0 },
        { text: "Fazemos uma análise minuciosa para ver se há brechas na cobertura.", positive: 0, negative: 0 },
        { text: "Você pode melhorar a cobertura sem aumentar muito o custo.", positive: 0, negative: 0 },
        { text: "Comparando com outros planos, podemos encontrar vantagens que seu seguro atual não oferece.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 3,
      title: "O seguro é muito caro",
      responses: [
        { text: "Podemos fazer uma simulação técnica para adequar o valor ao seu orçamento.", positive: 0, negative: 0 },
        { text: "Há opções de franquias e coberturas que reduzem o custo.", positive: 0, negative: 0 },
        { text: "Proteger seu patrimônio pode gerar economia a longo prazo.", positive: 0, negative: 0 },
        { text: "Comparando com despesas inesperadas, o seguro sai muito mais em conta.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 4,
      title: "Não preciso de seguro",
      responses: [
        { text: "Verifiquemos tecnicamente seus riscos e vulnerabilidades.", positive: 0, negative: 0 },
        { text: "Avalie a probabilidade de sinistro conforme seu perfil.", positive: 0, negative: 0 },
        { text: "Um imprevisto pode custar muito mais do que imagina.", positive: 0, negative: 0 },
        { text: "Comparando com gastos de reparo ou perda total, o seguro é uma opção mais barata.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 5,
      title: "Estou satisfeito com minha cobertura atual",
      responses: [
        { text: "Faremos uma checagem técnica para ver se sua cobertura está atualizada.", positive: 0, negative: 0 },
        { text: "Podemos analisar a apólice em detalhes para identificar gaps.", positive: 0, negative: 0 },
        { text: "Sempre há espaço para melhorias que agreguem mais valor.", positive: 0, negative: 0 },
        { text: "Comparando com novas opções do mercado, pode descobrir coberturas mais completas.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 6,
      title: "Não confio nas seguradoras",
      responses: [
        { text: "Podemos verificar tecnicamente o histórico de sinistros pagos e índice de satisfação.", positive: 0, negative: 0 },
        { text: "Trabalhamos apenas com empresas reguladas e com boa reputação.", positive: 0, negative: 0 },
        { text: "Há milhares de clientes satisfeitos que recomendam nossos serviços.", positive: 0, negative: 0 },
        { text: "Comparando com empresas não regulamentadas, nossas seguradoras têm melhores índices de confiança.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 7,
      title: "A burocracia me assusta",
      responses: [
        { text: "Temos processos documentados para agilizar a contratação.", positive: 0, negative: 0 },
        { text: "Cuidamos de toda a papelada de forma organizada.", positive: 0, negative: 0 },
        { text: "Você terá acompanhamento passo a passo, sem complicações.", positive: 0, negative: 0 },
        { text: "Comparando com outras empresas, nossa burocracia é mínima e simplificada.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 8,
      title: "Já ouvi falar de seguros ruins",
      responses: [
        { text: "Podemos analisar tecnicamente se eram seguradoras não idôneas.", positive: 0, negative: 0 },
        { text: "Vamos checar cláusulas e condições das seguradoras confiáveis.", positive: 0, negative: 0 },
        { text: "Trabalhamos apenas com empresas bem avaliadas no mercado.", positive: 0, negative: 0 },
        { text: "Comparando experiências, verá que nossas parceiras têm alto índice de satisfação.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 9,
      title: "Não quero lidar com a venda agora",
      responses: [
        { text: "Podemos fazer uma cotação técnica sem compromisso.", positive: 0, negative: 0 },
        { text: "Mantemos todos os detalhes organizados para você decidir depois.", positive: 0, negative: 0 },
        { text: "Você pode garantir hoje e evitar problemas futuros.", positive: 0, negative: 0 },
        { text: "Comparando a perda de tempo depois, antecipar a contratação pode ser muito mais vantajoso.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 10,
      title: "Não entendo de seguros",
      responses: [
        { text: "Podemos explicar tecnicamente cada cobertura e cláusula.", positive: 0, negative: 0 },
        { text: "Faremos uma apresentação simples e didática.", positive: 0, negative: 0 },
        { text: "Entender seu seguro garante tranquilidade na hora do sinistro.", positive: 0, negative: 0 },
        { text: "Comparando com a complexidade de outros serviços, você verá que é bem mais fácil do que parece.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 11,
      title: "Preciso falar com minha esposa/marido",
      responses: [
        { text: "Nossa análise técnica já considerou todos os detalhes; podemos fechar agora mesmo.", positive: 0, negative: 0 },
        { text: "Posso apresentar os dados precisos da apólice para que você decida na hora.", positive: 0, negative: 0 },
        { text: "Fechar agora garante condições exclusivas sem precisar esperar por aprovação externa.", positive: 0, negative: 0 },
        { text: "Comparado a adiar e correr o risco de perder condições especiais, fechar hoje é a escolha mais segura.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 12,
      title: "O seguro não cobre tudo o que preciso",
      responses: [
        { text: "Faremos uma análise técnica para personalizar a cobertura.", positive: 0, negative: 0 },
        { text: "Existem adicionais específicos para suas necessidades.", positive: 0, negative: 0 },
        { text: "Você pode escolher somente o que for mais importante.", positive: 0, negative: 0 },
        { text: "Comparando com planos fechados, nossa abordagem customizada é muito mais vantajosa.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 13,
      title: "Seguro é coisa de gente rica",
      responses: [
        { text: "Tecnicamente, há planos para todos os perfis e faixas de renda.", positive: 0, negative: 0 },
        { text: "Podemos adequar coberturas para caber no seu bolso.", positive: 0, negative: 0 },
        { text: "Proteger seu patrimônio é fundamental em qualquer situação.", positive: 0, negative: 0 },
        { text: "Comparando com gastos emergenciais, o seguro pode evitar prejuízos muito maiores.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 14,
      title: "Tenho outras prioridades financeiras",
      responses: [
        { text: "Vamos avaliar tecnicamente seu fluxo de despesas e receitas.", positive: 0, negative: 0 },
        { text: "Podemos ajustar valores para não sobrecarregar seu orçamento.", positive: 0, negative: 0 },
        { text: "A proteção pode ser vista como parte do planejamento financeiro.", positive: 0, negative: 0 },
        { text: "Comparando com dívidas inesperadas, o seguro evita grandes perdas no futuro.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 15,
      title: "Não acredito em promessas de economia",
      responses: [
        { text: "Apresentamos dados técnicos e simulações reais de economia.", positive: 0, negative: 0 },
        { text: "Você pode ver relatórios de custo-benefício antes de contratar.", positive: 0, negative: 0 },
        { text: "Vários clientes relatam redução de custos em sinistros.", positive: 0, negative: 0 },
        { text: "Comparando com as despesas que teria sem seguro, a economia é significativa.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 16,
      title: "Seguro é muito complicado",
      responses: [
        { text: "Temos um guia técnico que simplifica todo o processo.", positive: 0, negative: 0 },
        { text: "Explicamos cada termo para não restar dúvidas.", positive: 0, negative: 0 },
        { text: "Você verá que é mais simples do que parece.", positive: 0, negative: 0 },
        { text: "Comparando com contratos de outros setores, o seguro tem menos burocracia do que se imagina.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 17,
      title: "Não quero aumentar meus custos fixos",
      responses: [
        { text: "Fazemos um ajuste técnico do plano para ficar dentro do seu limite mensal.", positive: 0, negative: 0 },
        { text: "Podemos personalizar franquias e coberturas para reduzir o valor.", positive: 0, negative: 0 },
        { text: "Ter um seguro é proteger o que você já conquistou.", positive: 0, negative: 0 },
        { text: "Comparando com gastos de emergência, o seguro costuma sair bem mais barato.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 18,
      title: "Não confio em promessas de desconto",
      responses: [
        { text: "Temos acordos técnicos com seguradoras que oferecem descontos reais.", positive: 0, negative: 0 },
        { text: "Podemos mostrar a tabela de preços detalhada.", positive: 0, negative: 0 },
        { text: "Muitos clientes aproveitam esses descontos e confirmam a veracidade.", positive: 0, negative: 0 },
        { text: "Comparando com ofertas de mercado, nossos descontos são auditados e comprovados.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 19,
      title: "Tenho medo de ficar sem suporte",
      responses: [
        { text: "Nossa equipe de suporte técnico está disponível 24/7.", positive: 0, negative: 0 },
        { text: "Oferecemos atendimento prioritário em caso de sinistro.", positive: 0, negative: 0 },
        { text: "Você terá acompanhamento de um corretor dedicado.", positive: 0, negative: 0 },
        { text: "Comparando com outras empresas, nosso suporte é mais rápido e próximo ao cliente.", positive: 0, negative: 0 }
      ],
      clicks: 0
    },
    {
      id: 20,
      title: "Não sei se é o momento certo",
      responses: [
        { text: "Tecnicamente, podemos analisar seu perfil de risco agora mesmo.", positive: 0, negative: 0 },
        { text: "Verificamos as tendências de mercado para sugerir o melhor timing.", positive: 0, negative: 0 },
        { text: "Quanto antes contratar, maior a tranquilidade para imprevistos.", positive: 0, negative: 0 },
        { text: "Comparando com adiar a decisão, você pode se expor a riscos desnecessários.", positive: 0, negative: 0 }
      ],
      clicks: 0
    }
  ]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ObjectionPage
              objections={objections}
              setObjections={setObjections}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard objections={objections} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
