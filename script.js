(function () {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d', { alpha: false });

  const state = {
    fontSize: 18,
    columns: 0,
    drops: [],
    w: 0,
    h: 0,
  };

  const glyphs = (() => {
    const base = 'アイウエオカキクケコサシスセソタチツテトナニヌネノﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾗﾘﾙﾚﾛﾜｦﾝABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return base.split('');
  })();

  function resize() {
    canvas.width = state.w = window.innerWidth;
    canvas.height = state.h = window.innerHeight;

    state.columns = Math.floor(state.w / state.fontSize);
    state.drops = Array.from({ length: state.columns }, () => Math.floor(Math.random() * -50));
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, state.w, state.h);

    ctx.fillStyle = '#00ff66';
    ctx.font = `${state.fontSize}px Source Code Pro, ui-monospace, monospace`;
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 8;

    for (let i = 0; i < state.columns; i++) {
      const x = i * state.fontSize + state.fontSize / 2;
      const y = state.drops[i] * state.fontSize;
      const char = glyphs[(Math.random() * glyphs.length) | 0];
      ctx.fillText(char, x, y);

      if (y > state.h && Math.random() > 0.975) {
        state.drops[i] = (Math.random() * -20) | 0;
      }
      state.drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, state.w, state.h);
  draw();
})();

