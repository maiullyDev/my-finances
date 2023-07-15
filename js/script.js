const buttonNovaTransacao = document.querySelector("#button-novaTransacao");

const buttonClose = document.querySelector(".button-close");

const modalNovaTransacao = document.querySelector(".modal");

buttonNovaTransacao.addEventListener("click", () => {
  modalNovaTransacao.style.display = "block";
});

buttonClose.addEventListener("click", () => {
  modalNovaTransacao.style.display = "none";
});
