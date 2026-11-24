import initMenuMobile from './modules/menu-mobile.js';

initMenuMobile();

// Ano do rodapé sempre correto (o valor no HTML é só o fallback sem JS)
const anoAtual = document.querySelector('#anoAtual');
if (anoAtual) anoAtual.textContent = new Date().getFullYear();
