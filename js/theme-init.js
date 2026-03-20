/* Evita flash: aplicar tema antes del primer paint (sincronizar con script.js — clave ghcdd-theme). */
try {
  if (localStorage.getItem('ghcdd-theme') === 'light') {
    document.documentElement.classList.add('theme-light');
  }
} catch (e) {}
