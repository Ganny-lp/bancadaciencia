document.addEventListener('DOMContentLoaded', () => {
  const btnKits = document.getElementById('btnKits');
  const modalKits = document.getElementById('modalKits');
  const closeModal = document.getElementById('closeModal');
  const btnEachOfficial = document.getElementById('btnEachOfficial');
  const modalHistorico = document.getElementById('modalHistorico');
  const btnCloseHistorico = document.getElementById('btnCloseHistorico');
  const btnAlimentosEmbed = document.getElementById('btnAlimentosEmbed');
  const alimentosEmbed = document.getElementById('alimentosEmbed');
  const btnAexestrela = document.getElementById('btnAexestrela');
  const btnPlanos = document.getElementById('btnPlanos');
  const btnFazenda = document.getElementById('btnFazenda');
  const btnOnda = document.getElementById('btnOnda');
  const btnTelescopio = document.getElementById('btnTelescopio');
  const btnYoda = document.getElementById('btnYoda');
  const btnOpenNewTab = document.getElementById('btnOpenNewTab');
  const embedFrame = document.getElementById('embedFrame');
  const ondaWebcam = document.getElementById('ondaWebcam');
  const ondaFrame = document.getElementById('ondaFrame');
  const btnCloseOndaWebcam = document.getElementById('btnCloseOndaWebcam');
  const btnSubprojetos = document.getElementById('btnSubprojetos');
  const modalSubprojetos = document.getElementById('modalSubprojetos');

  // Modal Yoda elements
  const modalYoda = document.getElementById('modalYoda');
  const btnCloseYoda = document.getElementById('btnCloseYoda');

  let currentEmbedUrl = '';

  const openEmbed = (url) => {
    currentEmbedUrl = url;
    embedFrame.src = url;
    alimentosEmbed.style.display = 'flex';
  };

  const stopWebcam = () => {
    ondaFrame.src = 'about:blank';
    ondaWebcam.style.display = 'none';
  };

  btnEachOfficial.addEventListener('click', () => {
    modalHistorico.classList.add('active');
  });

  btnCloseHistorico.addEventListener('click', () => {
    modalHistorico.classList.remove('active');
  });

  modalHistorico.addEventListener('click', (e) => {
    if (e.target === modalHistorico) {
      modalHistorico.classList.remove('active');
    }
  });

  btnKits.addEventListener('click', () => {
    modalKits.classList.add('active');
    closeModal.classList.add('active');
  });

  closeModal.addEventListener('click', () => {
    modalKits.classList.remove('active');
    closeModal.classList.remove('active');
  });

  modalKits.addEventListener('click', (e) => {
    if (e.target === modalKits) {
      modalKits.classList.remove('active');
      closeModal.classList.remove('active');
    }
  });

  btnSubprojetos.addEventListener('click', () => {
    modalSubprojetos.classList.add('active');
  });

  modalSubprojetos.addEventListener('click', (e) => {
    if (e.target === modalSubprojetos) {
      modalSubprojetos.classList.remove('active');
    }
  });

  btnAlimentosEmbed.addEventListener('click', () => openEmbed(btnAlimentosEmbed.dataset.url || 'https://rjfontana.github.io/alimentos/'));
  btnAexestrela.addEventListener('click', () => openEmbed(btnAexestrela.dataset.url));
  btnFazenda.addEventListener('click', () => openEmbed(btnFazenda.dataset.url));

  btnPlanos.addEventListener('click', () => {
    window.open(btnPlanos.dataset.url, '_blank');
  });

  btnTelescopio.addEventListener('click', () => openEmbed(btnTelescopio.dataset.url));

  btnOpenNewTab.addEventListener('click', () => {
    if (currentEmbedUrl) {
      window.open(currentEmbedUrl, '_blank');
    }
  });

  btnOnda.addEventListener('click', () => {
    alimentosEmbed.style.display = 'none';
    embedFrame.src = 'about:blank';
    ondaFrame.src = btnOnda.dataset.url || 'https://rjfontana.github.io/-adivinhacao.py/';
    ondaWebcam.style.display = 'flex';
  });

  btnCloseAlimentosEmbed.addEventListener('click', () => {
    alimentosEmbed.style.display = 'none';
    embedFrame.src = 'about:blank';
  });

  alimentosEmbed.addEventListener('click', (e) => {
    if (e.target === alimentosEmbed) {
      alimentosEmbed.style.display = 'none';
      embedFrame.src = 'about:blank';
    }
  });

  btnCloseOndaWebcam.addEventListener('click', stopWebcam);

  ondaWebcam.addEventListener('click', (e) => {
    if (e.target === ondaWebcam) {
      stopWebcam();
    }
  });

  const dialogImages = document.querySelectorAll('.dialog-img');
  let dialogTimer = null;
  let dialogIndex = 0;

  const showDialog = (index) => {
    dialogImages.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  };

  const startDialogCycle = () => {
    showDialog(0);
    dialogIndex = 0;
    if (dialogTimer) clearInterval(dialogTimer);
    dialogTimer = setInterval(() => {
      dialogIndex = (dialogIndex + 1) % dialogImages.length;
      showDialog(dialogIndex);
    }, 6000); // 6 segundos entre cada imagem
  };

  const stopDialogCycle = () => {
    if (dialogTimer) {
      clearInterval(dialogTimer);
      dialogTimer = null;
    }
    dialogImages.forEach((img) => img.classList.remove('active'));
  };

  btnSubprojetos.addEventListener('mouseenter', () => {
    startDialogCycle();
  });

  btnSubprojetos.addEventListener('mouseleave', () => {
    stopDialogCycle();
  });

  // Projeto modals
  const btnOumou = document.getElementById('btnOumou');
  const modalOumou = document.getElementById('modalOumou');
  const btnCloseOumou = document.getElementById('btnCloseOumou');

  const btnAgnes = document.getElementById('btnAgnes');
  const modalAgnes = document.getElementById('modalAgnes');
  const btnCloseAgnes = document.getElementById('btnCloseAgnes');

  const btnJudith = document.getElementById('btnJudith');
  const modalJudith = document.getElementById('modalJudith');
  const btnCloseJudith = document.getElementById('btnCloseJudith');

  const btnLeah = document.getElementById('btnLeah');
  const modalLeah = document.getElementById('modalLeah');
  const btnCloseLeah = document.getElementById('btnCloseLeah');

  const btnTebello = document.getElementById('btnTebello');
  const modalTebello = document.getElementById('modalTebello');
  const btnCloseTebello = document.getElementById('btnCloseTebello');

  const btnBreedlove = document.getElementById('btnBreedlove');
  const modalBreedlove = document.getElementById('modalBreedlove');
  const btnCloseBreedlove = document.getElementById('btnCloseBreedlove');

  const btnNned = document.getElementById('btnNned');
  const modalNned = document.getElementById('modalNned');
  const btnCloseNned = document.getElementById('btnCloseNned');

  const btnMaathai = document.getElementById('btnMaathai');
  const modalMaathai = document.getElementById('modalMaathai');
  const btnCloseMaathai = document.getElementById('btnCloseMaathai');

  // Event listeners for Oumou
  btnOumou.addEventListener('click', () => {
    modalOumou.classList.add('active');
  });

  btnCloseOumou.addEventListener('click', () => {
    modalOumou.classList.remove('active');
  });

  modalOumou.addEventListener('click', (e) => {
    if (e.target === modalOumou) {
      modalOumou.classList.remove('active');
    }
  });

  // Event listeners for Agnes
  btnAgnes.addEventListener('click', () => {
    modalAgnes.classList.add('active');
  });

  btnCloseAgnes.addEventListener('click', () => {
    modalAgnes.classList.remove('active');
  });

  modalAgnes.addEventListener('click', (e) => {
    if (e.target === modalAgnes) {
      modalAgnes.classList.remove('active');
    }
  });

  // Event listeners for Judith
  btnJudith.addEventListener('click', () => {
    modalJudith.classList.add('active');
  });

  btnCloseJudith.addEventListener('click', () => {
    modalJudith.classList.remove('active');
  });

  modalJudith.addEventListener('click', (e) => {
    if (e.target === modalJudith) {
      modalJudith.classList.remove('active');
    }
  });

  // Event listeners for Leah
  btnLeah.addEventListener('click', () => {
    modalLeah.classList.add('active');
  });

  btnCloseLeah.addEventListener('click', () => {
    modalLeah.classList.remove('active');
  });

  modalLeah.addEventListener('click', (e) => {
    if (e.target === modalLeah) {
      modalLeah.classList.remove('active');
    }
  });

  // Event listeners for Tebello
  btnTebello.addEventListener('click', () => {
    modalTebello.classList.add('active');
  });

  btnCloseTebello.addEventListener('click', () => {
    modalTebello.classList.remove('active');
  });

  modalTebello.addEventListener('click', (e) => {
    if (e.target === modalTebello) {
      modalTebello.classList.remove('active');
    }
  });

  // Event listeners for Breedlove
  btnBreedlove.addEventListener('click', () => {
    modalBreedlove.classList.add('active');
  });

  btnCloseBreedlove.addEventListener('click', () => {
    modalBreedlove.classList.remove('active');
  });

  modalBreedlove.addEventListener('click', (e) => {
    if (e.target === modalBreedlove) {
      modalBreedlove.classList.remove('active');
    }
  });

  // Event listeners for Nned
  btnNned.addEventListener('click', () => {
    modalNned.classList.add('active');
  });

  btnCloseNned.addEventListener('click', () => {
    modalNned.classList.remove('active');
  });

  modalNned.addEventListener('click', (e) => {
    if (e.target === modalNned) {
      modalNned.classList.remove('active');
    }
  });

  // Event listeners for Maathai
  btnMaathai.addEventListener('click', () => {
    modalMaathai.classList.add('active');
  });

  btnCloseMaathai.addEventListener('click', () => {
    modalMaathai.classList.remove('active');
  });

  modalMaathai.addEventListener('click', (e) => {
    if (e.target === modalMaathai) {
      modalMaathai.classList.remove('active');
    }
  });

  // Yoda modal event listeners
  btnYoda.addEventListener('click', () => {
    modalYoda.classList.add('active');
  });

  const closeYodaPanel = () => {
    modalYoda.classList.remove('active');
  };

  btnCloseYoda.addEventListener('click', closeYodaPanel);

  modalYoda.addEventListener('click', (e) => {
    if (e.target === modalYoda) {
      closeYodaPanel();
    }
  });

  // Astro modal event listeners
  const modalAstro = document.getElementById('modalAstro');
  const btnCloseAstro = document.getElementById('btnCloseAstro');
  const linkEmail = document.getElementById('linkEmail');

  linkEmail.addEventListener('click', (e) => {
    e.preventDefault();
    modalAstro.classList.add('active');
  });

  btnCloseAstro.addEventListener('click', () => {
    modalAstro.classList.remove('active');
  });

  modalAstro.addEventListener('click', (e) => {
    if (e.target === modalAstro) {
      modalAstro.classList.remove('active');
    }
  });

  // Foton modal event listeners
  const btnFoton = document.getElementById('btnFoton');
  const modalFoton = document.getElementById('modalFoton');
  const btnCloseFoton = document.getElementById('btnCloseFoton');

  btnFoton.addEventListener('click', () => {
    modalFoton.classList.add('active');
  });

  btnCloseFoton.addEventListener('click', () => {
    modalFoton.classList.remove('active');
  });

  modalFoton.addEventListener('click', (e) => {
    if (e.target === modalFoton) {
      modalFoton.classList.remove('active');
    }
  });

  // Pressao modal event listeners
  const btnPressao = document.getElementById('btnPressao');
  const modalPressao = document.getElementById('modalPressao');
  const btnClosePressao = document.getElementById('btnClosePressao');

  btnPressao.addEventListener('click', () => {
    modalPressao.classList.add('active');
  });

  btnClosePressao.addEventListener('click', () => {
    modalPressao.classList.remove('active');
  });

  modalPressao.addEventListener('click', (e) => {
    if (e.target === modalPressao) {
      modalPressao.classList.remove('active');
    }
  });

  // Funções para o Quiz de Pressão
  window.mostrarResposta = function(exercicio) {
    const respostaDiv = document.getElementById(`resposta-${exercicio}`);
    if (respostaDiv) {
      respostaDiv.classList.remove('oculta');
    }
  };

  window.verificarEx3 = function() {
    const valor = parseFloat(document.getElementById('ex3').value);
    const respostaDiv = document.getElementById('resposta-ex3');
    if (respostaDiv && (valor === 2 || valor === 2.0)) {
      respostaDiv.classList.remove('oculta');
    } else if (respostaDiv) {
      respostaDiv.classList.remove('oculta');
      respostaDiv.innerHTML = '❌ <strong>Resposta incorreta</strong><br>Tente novamente! Dica: P = 1 atm + 1 atm';
    }
  };

  window.verificarTabela = function() {
    const p0 = parseFloat(document.getElementById('p0').value);
    const p10 = parseFloat(document.getElementById('p10').value);
    const p20 = parseFloat(document.getElementById('p20').value);
    const p30 = parseFloat(document.getElementById('p30').value);
    const respostaDiv = document.getElementById('resposta-ex4');
    
    const correto = (p0 === 1 && p10 === 2 && p20 === 3 && p30 === 4);
    
    if (respostaDiv) {
      respostaDiv.classList.remove('oculta');
      if (!correto) {
        respostaDiv.innerHTML = '⚠️ <strong>Alguns valores estão incorretos</strong><br>Verifique com o simulador!';
      }
    }
  };
});
