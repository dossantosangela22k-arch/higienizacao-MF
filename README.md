# 🛋️ MF Higienização - Agendamento Automático & Rastreio ao Vivo

Sistema web leve, moderno e 100% automatizado desenvolvido para a empresa **MF Higienização**. O projeto permite que clientes recebam orçamentos instantâneos por Inteligência Artificial, realizem o agendamento de higienização de estofados sem intervenção humana e acompanhem o deslocamento do técnico em tempo real via GPS.

---

## 🚀 Funcionalidades Principais

* **🤖 Análise de Estofado por Inteligência Artificial (OpenAI Vision):** O cliente envia a foto do estofado e a IA identifica o modelo (retrátil, couro, tecido), calcula o valor exato e recomenda os produtos químicos ideais de higienização.
* **📅 Agenda Inteligente Anti-Conflito:** 
  * Limite rigoroso de **4 vagas por dia** (08:00 às 10:00 | 10:00 às 12:00 | 14:00 às 16:00 | 16:00 às 18:00).
  * Trava automática aos domingos e no horário de almoço (12:00 às 13:30).
* **📍 Rastreamento GPS do Técnico em Tempo Real (Opção 3):** 
  * O cliente recebe um link exclusivo de rastreio (`?rastreio=ID`).
  * O técnico ativa a transmissão pelo seu painel móvel (`?modo=tecnico`) ao entrar no veículo, permitindo ao cliente ver a chegada do profissional no mapa.
* **♿ Acessibilidade Integrada:** Botão de modo Alto Contraste e seletores para aumentar/diminuir o tamanho das fontes (A+ / A-).
* **🔒 Conformidade com a LGPD:** Termos de privacidade claros e caixa de seleção obrigatória de consentimento do uso de dados (Lei 13.709/2018).
* **⚡ Alta Performance:** Feito em HTML5, CSS3 Nativos e JavaScript Vanilla (Zero dependências pesadas), garantindo nota máxima de carregamento no **Google Ads** e **Google Meu Negócio**.

---

## 📁 Estrutura de Arquivos

```text
mf-higienizacao/
├── index.html                           # Estrutura principal, formulário e telas
├── style.css                            # Estilização responsiva, contraste e componentes
├── script.js                           # Lógica de agendamento, IA e rastreamento GPS
├── watermarked_img_13418398039819721309.png  # Logo oficial da MF Higienização
├── watermarked_img_7953767486011146418.png   # Imagem de Antes e Depois (Prova Social)
└── README.md                            # Documentação do projeto

