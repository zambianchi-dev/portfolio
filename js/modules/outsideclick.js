export default function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  //Vai adicionar o atributo no primeiro click e acionar o evento. No segundo click ele não aciona o evento handleOutsideClick
  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => 
        html.addEventListener(userEvent, handleOutsideClick));
    });

    element.setAttribute(outside, "");
  }

  // função que vai identificar em qual elemento estamos clicando e verificar se o
  //elemento clicado é a lista, se não for ele remove a classe active e o evento handle
  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}
