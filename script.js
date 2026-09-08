document.addEventListener('DOMContentLoaded', () => {
  // 1. CONTROLES DE ACESSIBILIDADE
  const toggleContrastBtn = document.getElementById('toggle-contrast');
  const increaseFontBtn = document.getElementById('increase-font');
  const decreaseFontBtn = document.getElementById('decrease-font');
  
  let currentFontSize = 100; // Porcentagem inicial da fonte

  if (toggleContrastBtn) {
    toggleContrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  }

  if (increaseFontBtn) {
    increaseFontBtn.addEventListener('click', () => {
      if (currentFontSize < 130) {
        currentFontSize += 10;
        document.body.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  if (decreaseFontBtn) {
    decreaseFontBtn.addEventListener('click', () => {
      if (currentFontSize > 80) {
        currentFontSize -= 10;
        document.body.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  // 2. SIMULAÇÃO DE ORÇAMENTO POR FOTO
  const btnAnalisar = document.getElementById('btn-analisar');
  const aiResult = document.getElementById('ai-result');
  const fotoSofaInput = document.getElementById('foto-sofa');

  if (btnAnalisar) {
    btnAnalisar.addEventListener('click', () => {
      if (fotoSofaInput && fotoSofaInput.files.length === 0) {
        alert('Por favor, selecione uma foto do seu estofado primeiro.');
        return;
      }
      
      btnAnalisar.innerText = '⏳ Analisando Estofado...';
      btnAnalisar.disabled = true;

      setTimeout(() => {
        btnAnalisar.innerText = '🔍 Calcular Valor por Foto';
        btnAnalisar.disabled = false;
        if (aiResult) {
          aiResult.classList.remove('hidden');
          aiResult.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1200);
    });
  }

  // 3. ENVIO DO FORMULÁRIO E INTEGRAÇÃO WHATSAPP
  const formAgendamento = document.getElementById('auto-booking-form');

  if (formAgendamento) {
    formAgendamento.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const whatsapp = document.getElementById('whatsapp').value;
      const data = document.getElementById('data').value;
      const hora = document.getElementById('hora').value;
      const preco = document.getElementById('ai-price').innerText;
      const servico = document.getElementById('ai-description').innerText;

      // Gerar ID de Rastreio Único
      const idRastreio = 'MF-' + Math.floor(1000 + Math.random() * 9000);
      const linkRastreio = `${window.location.origin}${window.location.pathname}?rastreio=${idRastreio}`;

      // Montar mensagem formatada para o WhatsApp (61 98679-1580)
      const mensagem = `Olá, MF Higienização! Fiz um agendamento pelo site:%0A%0A` +
        `👤 *Nome:* ${encodeURIComponent(nome)}%0A` +
        `📱 *WhatsApp:* ${encodeURIComponent(whatsapp)}%0A` +
        `🛋️ *Serviço:* ${encodeURIComponent(servico)}%0A` +
        `💰 *Valor Estimado:* ${encodeURIComponent(preco)}%0A` +
        `📅 *Data:* ${encodeURIComponent(data)} às ${encodeURIComponent(hora)}%0A` +
        `💳 *Sinal Pix:* R$ 30,00 (Chave: 61986791580)%0A%0A` +
        `📍 *Acompanhar Técnico:* ${encodeURIComponent(linkRastreio)}%0A%0A` +
        `Estou enviando o comprovante do Pix em anexo!`;

      // Redireciona para o WhatsApp da MF Higienização
      window.open(`https://wa.me/5561986791580?text=${mensagem}`, '_blank');
    });
  }

  // 4. MODO TÉCNICO E MODO RASTREIO VIA PARÂMETROS DA URL
  const urlParams = new URLSearchParams(window.location.search);
  const modo = urlParams.get('modo');
  const rastreioId = urlParams.get('rastreio');

  const techPanel = document.getElementById('tech-panel');
  const trackingScreen = document.getElementById('tracking-screen');
  const bookingContainer = document.getElementById('booking-container');

  // Exibir Painel do Técnico (?modo=tecnico)
  if (modo === 'tecnico' && techPanel) {
    techPanel.classList.remove('hidden');
    if (bookingContainer) bookingContainer.classList.add('hidden');

    const btnIniciarRota = document.getElementById('btn-iniciar-rota');
    const btnFinalizarRota = document.getElementById('btn-finalizar-rota');
    const geoStatus = document.getElementById('geo-status');

    let watchId = null;

    if (btnIniciarRota) {
      btnIniciarRota.addEventListener('click', () => {
        if ('geolocation' in navigator) {
          btnIniciarRota.classList.add('hidden');
          btnFinalizarRota.classList.remove('hidden');
          geoStatus.innerText = 'Status do GPS: Transmitindo localização em tempo real... 📡';

          watchId = navigator.geolocation.watchPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              localStorage.setItem('tech_location', JSON.stringify({
                lat: latitude,
                lng: longitude,
                status: 'a_caminho',
                updatedAt: new Date().toLocaleTimeString()
              }));
            },
            (err) => {
              geoStatus.innerText = 'Erro ao obter GPS: ' + err.message;
            },
            { enableHighAccuracy: true }
          );
        } else {
          alert('Navegador sem suporte a geolocalização.');
        }
      });
    }

    if (btnFinalizarRota) {
      btnFinalizarRota.addEventListener('click', () => {
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        btnFinalizarRota.classList.add('hidden');
        btnIniciarRota.classList.remove('hidden');
        geoStatus.innerText = 'Status do GPS: Atendimento Concluído / Inativo';

        localStorage.setItem('tech_location', JSON.stringify({
          status: 'chegou',
          updatedAt: new Date().toLocaleTimeString()
        }));
      });
    }
  }

  // Exibir Tela de Rastreio do Cliente (?rastreio=ID)
  if (rastreioId && trackingScreen) {
    trackingScreen.classList.remove('hidden');
    if (bookingContainer) bookingContainer.classList.add('hidden');

    const statusBadge = document.getElementById('status-badge');
    const trackingInfo = document.getElementById('tracking-info');

    // Checar atualização do status a cada 3 segundos
    setInterval(() => {
      const storedData = localStorage.getItem('tech_location');
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.status === 'a_caminho') {
          statusBadge.innerText = '🚗 Técnico a caminho!';
          statusBadge.className = 'status-badge';
          statusBadge.style.backgroundColor = '#3b82f6';
          statusBadge.style.color = '#ffffff';
          trackingInfo.innerText = `Última atualização de localização às ${data.updatedAt}.`;
        } else if (data.status === 'chegou') {
          statusBadge.innerText = '✅ Técnico no Local!';
          statusBadge.className = 'status-badge';
          statusBadge.style.backgroundColor = '#22c55e';
          statusBadge.style.color = '#ffffff';
          trackingInfo.innerText = 'O técnico chegou ao endereço do atendimento.';
        }
      }
    }, 3000);
  }
});
