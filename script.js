(function () {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d', { alpha: false });

  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const state = {
    fontSize: 20, // leitura melhor p/ palavras
    colWidth: 140,
    columns: 0,
    drops: [],
    speeds: [],
    w: 0,
    h: 0,
    baseFade: 0.06,
  };

  // Palavras-chave das suas skills para "chover" na tela
  // Ordem priorizada para dar destaque imediato às áreas-chave
  const keywords = [
    'Python', 'Power BI', 'BigQuery', 'Data Science',
    'Analista de Dados', 'JavaScript', 'Fullstack',
    'Power Query', 'Excel', 'XLS',
    'Looker Studio', 'Lockr Studio',
    'DAX', 'Ciência da Computação',
    // variações para busca/SEO
    'Power B.I.', 'Big Query'
  ];

  function resize() {
    state.w = window.innerWidth;
    state.h = window.innerHeight;
    canvas.width = Math.floor(state.w * dpr);
    canvas.height = Math.floor(state.h * dpr);
    canvas.style.width = state.w + 'px';
    canvas.style.height = state.h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Define fonte para cálculo e desenho
    ctx.font = `600 ${state.fontSize}px Source Code Pro, ui-monospace, monospace`;

    // Calcula a largura ideal de coluna baseada na maior palavra
    const maxWordWidth = keywords.reduce((m, w) => Math.max(m, ctx.measureText(w).width), 0);
    state.colWidth = Math.min(220, Math.max(120, Math.ceil(maxWordWidth + 24)));
    state.columns = Math.max(6, Math.floor(state.w / state.colWidth));

    // Recria "quedas" e velocidades (mais lento para leitura)
    state.drops = Array.from({ length: state.columns }, () => Math.floor(Math.random() * -50));
    state.speeds = Array.from({ length: state.columns }, () => 0.5 + Math.random() * 0.9);
  }

  function draw() {
    // desvanecer trilha (fade controlado)
    ctx.fillStyle = `rgba(0,0,0,${state.baseFade})`;
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
