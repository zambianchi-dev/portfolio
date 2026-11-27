import outsideClick from "./outsideclick.js";

// Só "click": com "touchstart" o menu fechava antes do toque terminar e o
// clique caía no botão "Menu" que está embaixo do "Fechar", reabrindo tudo.
const EVENTOS = ["click"];

export default function initMenuMobile() {
  const btnMenu = document.querySelector('[data-menu="btn"]');
  const btnMenuClose = document.querySelector('[data-menu="btn-close"]');
  const navMenu = document.querySelector("#menu");
  const overlay = document.querySelector(".overlay");
  const navLinks = document.querySelectorAll("#menu .nav-list-item a");

  if (!btnMenu || !btnMenuClose || !navMenu || !overlay) return;

  function openMenuMobile() {
    navMenu.classList.add("active");
    overlay.classList.add("active");
    overlay.removeAttribute("hidden");
    btnMenuClose.classList.add("active");

    // Estado real do botão para leitores de tela (WCAG 4.1.2)
    btnMenu.setAttribute("aria-expanded", "true");
    btnMenuClose.setAttribute("aria-expanded", "true");

    // Menu volta a ser alcançável pelo teclado e pelo leitor de tela
    navMenu.removeAttribute("inert");

    // Move o foco para dentro do menu que acabou de abrir
    (navLinks[0] || btnMenuClose).focus();

    outsideClick(navMenu, EVENTOS, closeMenuMobile);
  }

  function closeMenuMobile({ devolverFoco = true } = {}) {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    overlay.setAttribute("hidden", "");
    btnMenuClose.classList.remove("active");

    btnMenu.setAttribute("aria-expanded", "false");
    btnMenuClose.setAttribute("aria-expanded", "false");

    // Impede que os links do menu fechado continuem focáveis (armadilha de foco)
    navMenu.setAttribute("inert", "");

    // O foco nunca pode ficar perdido: volta para quem abriu o menu
    if (devolverFoco) btnMenu.focus();
  }

  btnMenu.addEventListener("click", openMenuMobile);
  btnMenuClose.addEventListener("click", () => closeMenuMobile());

  navLinks.forEach((link) => {
    // Ao navegar para a âncora, fecha o menu sem roubar o foco do destino
    link.addEventListener("click", () =>
      closeMenuMobile({ devolverFoco: false }),
    );
  });

  // Esc fecha o menu — padrão esperado de qualquer diálogo/menu sobreposto
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenuMobile();
    }
  });

  // Mantém o foco circulando dentro do menu enquanto ele está aberto
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || !navMenu.classList.contains("active")) return;

    const focaveis = [
      btnMenuClose,
      ...navMenu.querySelectorAll("a[href], button"),
    ];
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (event.shiftKey && document.activeElement === primeiro) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primeiro.focus();
    }
  });

  // Estado inicial coerente com o HTML
  closeMenuMobile({ devolverFoco: false });
}
