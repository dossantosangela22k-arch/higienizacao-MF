
/* ==========================================================================
   1. CONFIGURAÇÕES & VARIÁVEIS GERAIS
   ========================================================================== */
// Número do WhatsApp da MF Higienização (Código do País 55 + DDD + Número)
const NUMERO_WHATSAPP = "5561986791580"; 

// Mapeamento automático de Produtos Recomendados para cada tipo de Estofado
const PRODUTOS_RECOMENDADOS = {
  "Sofa Tecido Padrão": "Detergente Tensoativo de Alta Espumação + Neutralizador de Odores (Ideal para extração profunda em Suede e Chenille).",
  "Sofa de Couro": "Limpador Neutro Hidratante pH Controlado + Bálsamo Protetor UV para Couro.",
  "Colchao": "Higienizador Bactericida com Ação Antiácaros e Óleo Essencial de Eucalipto.",
  "Cadeiras / Poltronas": "Detergente Enzimático Removedor de Manchas Orgânicas."
};

let watchID = null; // Guardará o ID do rastreamento de GPS do celular do técnico

/* ==========================================================================
   2. ACESSIBILIDADE (CONTRASTE E TAMANHO DA FONTE)
   ========================================================================== */
document.getElementById('toggle-contrast')?.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

let fontSize = 100;
document.getElementById('increase-font')?.addEventListener('click', () => {
  if (fontSize < 130) {
    fontSize += 10;
    document.body.style.fontSize = fontSize + '%';
  }
});

document.getElementById('decrease-font')?.addEventListener('click', () => {
  if (fontSize > 80) {
    fontSize -= 10;
    document.body.style.fontSize = fontSize + '%';
  }
});

/* ==========================================================================
   3. GERENCIAMENTO DE ROTAS DA PÁGINA (CLIENTE x TÉCNICO x AGENDAMENTO)
   ========================================================================== */
const urlParams = new URLSearchParams(window.location.search);
const isTracking = urlParams.get('rastreio');
const isTech = urlParams.get('modo');

window.addEventListener('DOMContentLoaded', () => {
  if (isTracking) {
    // Modo 1: O cliente abriu o link de rastreio de rota
    document.getElementById('booking-container')?.classList.add('hidden');
    document.getElementById('tracking-screen')?.classList.remove('hidden');
    iniciarMonitoramentoGPSCliente();
  } else if (isTech === 'tecnico') {
    // Modo 2: Você (Técnico) abriu seu painel no celular (?modo=tecnico)
    document.getElementById('booking-container')?.classList.add('hidden');
    document.getElementById('tech-panel')?.classList.remove('hidden');
  }
});

/* ==========================================================================
   4. REGRAS DA AGENDA AUTOMÁTICA (MÁXIMO 4 VAGAS/DIA - SEG A SÁB)
   ========================================================================== */
const dataInput = document.getElementById('data');
const horaSelect = document.getElementById('hora');

if (dataInput) {
  dataInput.addEventListener('change', function() {
    if (!this.value) return;

    const selectedDate = new Date(this.value + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay(); // 0: Domingo, 1 a 6: Segunda a Sábado

    if (dayOfWeek === 0) {
      alert('Atendemos apenas de Segunda a Sábado. Por favor, escolha outra data.');
      this.value = '';
      horaSelect.innerHTML = '<option value="">Selecione a Data Primeiro...</option>';
      return;
    }

    // Libera exatamente as 4 vagas diárias (Respeitando o almoço de 12:00 às 13:30)
    horaSelect.innerHTML = `
      <option value="">Selecione o horário disponível</option>
      <option value="08:00">08:00 as 10:00 (Manhã 1)</option>
      <option value="10:00">10:00 as 12:00 (Manhã 2)</option>
      <option value="14:00">14:00 as 16:00 (Tarde 1)</option>
      <option value="16:00">16:00 as 18:00 (Tarde 2)</option>
    `;
  });
}

/* ==========================================================================
   5. ANÁLISE DE FOTO COM INTELIGÊNCIA ARTIFICIAL (SIMULAÇÃO OPENAI VISION)
   ========================================================================== */
document.getElementById('btn-analisar')?.addEventListener('click', function() {
  const fileInput = document.getElementById('foto-sofa');
  
  if (!fileInput || !fileInput.files[0]) {
    alert('Por favor, tire ou selecione uma foto do seu estofado primeiro.');
    return;
  }

  this.innerText = 'IA Analisando Estofado...';
  this.disabled = true;

  // Processamento da foto via IA (Simulado em 2 segundos)
  setTimeout(() => {
    document.getElementById('ai-result')?.classList.remove('hidden');
    document.getElementById('ai-description').innerText = 
      'Detectado pela IA: Sofá Retrátil de Tecido Suede (3 Lugares) com marcas de uso leves.';
    document.getElementById('ai-price').innerText = 'R$ 220,00';
    document.getElementById('ai-product').innerText = 
      'Produto Indicado: ' + PRODUTOS_RECOMENDADOS["Sofa Tecido Padrão"];
    
    this.style.display = 'none';
  }, 2000);
});

/* ==========================================================================
   6. SUBMISSÃO DO AGENDAMENTO E GERAÇÃO DO LINK
   ========================================================================== */
document.getElementById('auto-booking-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const dataFormatada = data.split('-').reverse().join('/');

  // Código único para o Rastreio do Atendimento do Cliente
  const idAtendimento = Math.floor(1000 + Math.random() * 9000);
  const linkRastreio = `${window.location.origin}${window.location.pathname}?rastreio=${idAtendimento}`;

  // Prepara a mensagem automática enviada para a empresa/cliente
  const mensagem = encodeURIComponent(
    `*NOVO AGENDAMENTO CONFIRMADO (MF HIGIENIZAÇÃO)*\n\n` +
    `👤 *Cliente:* ${nome}\n` +
    `📱 *WhatsApp:* ${whatsapp}\n` +
    `📅 *Data/Hora:* ${dataFormatada} às ${hora}\n` +
    `💰 *Valor Estimado:* R$ 220,00\n\n` +
    `📍 *Link de Rastreio do Técnico ao Vivo:*\n${linkRastreio}`
  );

  // Redireciona para confirmação do WhatsApp
  window.open(`https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${mensagem}`, '_blank');
});

/* ==========================================================================
   7. PAINEL DO TÉCNICO - TRANSMISSÃO DO GPS AO VIVO (?modo=tecnico)
   ========================================================================== */
document.getElementById('btn-iniciar-rota')?.addEventListener('click', function() {
  if ('geolocation' in navigator) {
    document.getElementById('geo-status').innerText = 'Transmitindo sua localização em tempo real para o cliente...';
    this.classList.add('hidden');
    document.getElementById('btn-finalizar-rota')?.classList.remove('hidden');

    // Transmite a posição GPS contínua do celular enquanto você dirige
    watchID = navigator.geolocation.watchPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // Salva os dados de geolocalização da rota
      localStorage.setItem('tecnico_lat', lat);
      localStorage.setItem('tecnico_lng', lng);
      localStorage.setItem('status_rota', 'a_caminho');
    }, (error) => {
      alert('Erro: Ative a opção de Localização/GPS do seu celular.');
    }, { 
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    });
  } else {
    alert('Geolocalização não é suportada pelo seu navegador.');
  }
});

document.getElementById('btn-finalizar-rota')?.addEventListener('click', function() {
  if (watchID !== null) {
    navigator.geolocation.clearWatch(watchID);
  }
  localStorage.setItem('status_rota', 'chegou');
  document.getElementById('geo-status').innerText = 'Atendimento Iniciado / Rota Finalizada.';
  this.classList.add('hidden');
  document.getElementById('btn-iniciar-rota')?.classList.remove('hidden');
  document.getElementById('btn-iniciar-rota').innerText = '🚗 Iniciar Próxima Rota';
});

/* ==========================================================================
   8. MONITORAMENTO DO MAPA/RASTREIO DO CLIENTE (?rastreio=123)
   ========================================================================== */
function iniciarMonitoramentoGPSCliente() {
  setInterval(() => {
    const status = localStorage.getItem('status_rota');
    const lat = localStorage.getItem('tecnico_lat');
    const lng = localStorage.getItem('tecnico_lng');

    const statusBadge = document.getElementById('status-badge');
    const trackingInfo = document.getElementById('tracking-info');

    if (!statusBadge || !trackingInfo) return;

    if (status === 'a_caminho') {
      statusBadge.innerText = '🚗 Técnico A Caminho!';
      statusBadge.className = 'status-badge status-ontheway';
      trackingInfo.innerHTML = `O técnico está em deslocamento neste momento.<br><strong>Coordenadas do GPS:</strong> Lat ${lat}, Lng ${lng}`;
    } else if (status === 'chegou') {
      statusBadge.innerText = '✅ Técnico Chegou ao Local!';
      statusBadge.className = 'status-badge';
      statusBadge.style.backgroundColor = '#bbf7d0';
      statusBadge.style.color = '#166534';
      trackingInfo.innerText = 'O profissional da MF Higienização chegou à sua residência.';
    }
  }, 3000); // Atualiza os dados a cada 3 segundos
}
