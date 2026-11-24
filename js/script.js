import initMenuMobile from "./modules/menu-mobile.js";
import initScrollToSection from "./modules/scroll-suave.js";

initMenuMobile();
initScrollToSection();

// Ano do rodapé sempre correto (o valor no HTML é só o fallback sem JS)
const anoAtual = document.querySelector("#anoAtual");
if (anoAtual) anoAtual.textContent = new Date().getFullYear();
