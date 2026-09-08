# 🧼 MF Higienização — Plataforma de Agendamento Online

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge)](#)

Aplicação web desenvolvida para a **MF Higienização**, especializada em limpeza profunda e higienização profissional de estofados, sofás e colchões na região do DF e Entorno.

A plataforma permite que clientes solicitem orçamentos por foto, realizem agendamentos online com pagamento flexível e acompanhem em tempo real o deslocamento do técnico.

---

## 📌 Sumário
- [Recursos e Funcionalidades](#-recursos-e-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Acessibilidade e Usabilidade](#-acessibilidade-e-usabilidade)
- [Contato](#-contato)

---

## ✨ Recursos e Funcionalidades

### 📱 Para o Cliente:
* **Orçamento por Foto:** Envio de imagens do estofado para cálculo estimativo de valores.
* **Agendamento Inteligente:** Seleção de datas e horários disponíveis para atendimento presencial.
* **Pagamento Flexível:**
  * Sinal de reserva de **R$ 30,00** via Pix.
  * Saldo restante (Pix ou cartão parcelado em até 12x) pago após a conclusão do serviço.
* **Confirmação via WhatsApp:** Integração direta para envio de dados do pedido e comprovante de pagamento.
* **Rastreamento em Tempo Real:** Tela dedicada (`?rastreio=ID`) para o cliente visualizar a localização e status do técnico a caminho.

### 👨‍🔧 Para o Técnico:
* **Painel de Rota (`?modo=tecnico`):** Acesso restrito para acionar o GPS e transmitir a geolocalização ao cliente durante o deslocamento.

### 🎨 Prova Social e Design:
* **Antes & Depois:** Exibição interativa de resultados de limpezas anteriores.
* **Brand Identity:** Layout personalizado com as cores e logo oficial da empresa.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica da aplicação.
* **CSS3:** Estilização moderna, responsiva (focada em dispositivos móveis) e personalizações de alto contraste.
* **JavaScript (ES6+):** Lógica de agendamento, manipulação do DOM, simulação de GPS e manipulação de parâmetros de URL.

---

## 📁 Estrutura de Arquivos

```text
├── index.html        # Estrutura principal da página web
├── style.css         # Estilos, regras de layout e responsividade
├── script.js        # Lógica interativa, agendamentos e GPS
└── README.md         # Documentação do projeto
