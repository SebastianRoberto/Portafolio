const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".volver-arriba");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// --------------------------------------- */
// ----- Cambio de Idioma ----- */
// --------------------------------------- */

// Obtener el selector de idioma
const idiomaSelector = document.getElementById('idioma-selector');

// Función para cambiar idioma
function cambiarIdioma(idioma) {
  // Obtener todos los elementos con data attributes
  const elementos = document.querySelectorAll('[data-es], [data-en]');
  
  elementos.forEach(elemento => {
    const texto = elemento.getAttribute(`data-${idioma}`);
    if (texto) {
      elemento.textContent = texto;
    }
  });

  // Cambiar títulos (title attributes)
  const elementosConTitulo = document.querySelectorAll('[data-es-title], [data-en-title]');
  elementosConTitulo.forEach(elemento => {
    const titulo = elemento.getAttribute(`data-${idioma}-title`);
    if (titulo) {
      elemento.title = titulo;
    }
  });

  // Cambiar título de la página
  const tituloPagina = document.querySelector('title');
  if (tituloPagina) {
    const nuevoTitulo = tituloPagina.getAttribute(`data-${idioma}`);
    if (nuevoTitulo) {
      tituloPagina.textContent = nuevoTitulo;
    }
  }

  // Cambiar enlaces del CV (usando rutas absolutas para web pública)
  const cvLinks = document.querySelectorAll('.cv-link');
  cvLinks.forEach(link => {
    if (idioma === 'en') {
      link.href = './CV_English.pdf';
    } else {
      link.href = './CV.pdf';
    }
  });

  // Guardar preferencia en localStorage
  localStorage.setItem('idioma', idioma);
}

// Cargar idioma guardado o usar español por defecto
const idiomaGuardado = localStorage.getItem('idioma') || 'es';
idiomaSelector.value = idiomaGuardado;
cambiarIdioma(idiomaGuardado);

// Event listener para el selector de idioma
idiomaSelector.addEventListener('change', (e) => {
  cambiarIdioma(e.target.value);
});
