/* Terminal/DOS Retro Website - Vanilla JS */

document.addEventListener('DOMContentLoaded', function() {
  // Active navigation link
  const navLinks = document.querySelectorAll('nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const hrefPage = href.split('/').pop();
    if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Add glowing effect on hover to text (optional enhancement)
  const sections = document.querySelectorAll('section h2');
  sections.forEach(section => {
    section.addEventListener('mouseenter', function() {
      this.style.textShadow = '0 0 10px currentColor';
    });
    section.addEventListener('mouseleave', function() {
      this.style.textShadow = 'none';
    });
  });

  // Home interactive random funny terminal
  const output = document.getElementById('home-console-output');
  const randomPhraseBtn = document.getElementById('random-phrase-btn');
  if (output) {
    const funnyPhrases = [
      '> Compila a la primera... sospechoso.',
      '> Copilot dijo: "tranqui, este bug era feature".',
      '> npm install tardó menos que mi café, milagro.',
      '> Si funciona en local, no lo mires mucho.',
      '> Error 404: motivación no encontrada.',
      '> Refactoricé tanto que ahora nadie sabe quién soy.',
      '> El PR está limpio, excepto por 47 warnings.',
      '> Git blame dice que fui yo. Yo también lo niego.'
    ];

    const showRandomPhrase = function() {
      const index = Math.floor(Math.random() * funnyPhrases.length);
      output.textContent = funnyPhrases[index];
    };

    showRandomPhrase();

    if (randomPhraseBtn) {
      randomPhraseBtn.addEventListener('click', showRandomPhrase);
    }

    setInterval(showRandomPhrase, 4500);
  }
});
