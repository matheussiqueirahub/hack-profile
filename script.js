(function () {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d', { alpha: false });

  const state = {
    fontSize: 18,
    colWidth: 120,
    columns: 0,
    drops: [],
    speeds: [],
    w: 0,
    h: 0,
  };

  // Palavras-chave das suas skills para "chover" na tela
  const keywords = [
    'Python',
    'DAX',
    'JavaScript',
    'Data Science',
    'Fullstack',
    'Analista de Dados',
    'Ciência da Computação',
    'Power BI', 'Power B.I.',
    'Looker Studio', 'Lockr Studio',
    'XLS', 'Excel',
    'BigQuery', 'Big Query',
    'Power Query'
  ];

  function resize() {
    canvas.width = state.w = window.innerWidth;
    canvas.height = state.h = window.innerHeight;

    // Ajusta largura de coluna para acomodar palavras
    state.colWidth = Math.max(100, Math.min(160, Math.floor(state.w / 12)));
    state.columns = Math.max(6, Math.floor(state.w / state.colWidth));

    // Recria "quedas" e velocidades
    state.drops = Array.from({ length: state.columns }, () => Math.floor(Math.random() * -50));
    state.speeds = Array.from({ length: state.columns }, () => 0.6 + Math.random() * 1.2);

    // Define fonte para cálculo e desenho
    ctx.font = `600 ${state.fontSize}px Source Code Pro, ui-monospace, monospace`;
  }

  function draw() {
    // desvanecer trilha
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, state.w, state.h);

    ctx.fillStyle = '#00ff66';
    ctx.font = `600 ${state.fontSize}px Source Code Pro, ui-monospace, monospace`;
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 8;

    for (let i = 0; i < state.columns; i++) {
      const x = i * state.colWidth + state.colWidth / 2;
      const y = state.drops[i] * state.fontSize;
      const word = keywords[(Math.random() * keywords.length) | 0];
      ctx.fillText(word, x, y);

      if (y > state.h && Math.random() > 0.975) {
        state.drops[i] = (Math.random() * -20) | 0; // reinicia mais acima para variar
      }
      state.drops[i] += state.speeds[i];
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();

  // fundo inicial
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, state.w, state.h);
  draw();
})();
