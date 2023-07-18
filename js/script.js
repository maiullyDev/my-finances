// Open Modal
const buttonNovaTransacao = document.querySelector("#button-novaTransacao");

const buttonClose = document.querySelector(".button-close");

const modalNovaTransacao = document.querySelector(".modal");

buttonNovaTransacao.addEventListener("click", () => {
  modalNovaTransacao.style.display = "block";
});

buttonClose.addEventListener("click", () => {
  modalNovaTransacao.style.display = "none";
});

// Saving form information
const transactionForm = document.querySelector(".transactionForm");

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(transactionForm);

  const transactionObject = {};

  for (let campo of formData) {
    transactionObject[campo[0]] = campo[1];
  }

  console.log(transactionObject);
  const tbody = document.querySelector("tbody");
  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr>
    <td class="title">${transactionObject.title}</td>
    <td>${transactionObject.tipe}</td>
    <td>R$ ${transactionObject.value}</td>
    <td>${transactionObject.data}</td>
  </tr>`
  );

  //   for (let campo of formData) {
  //     // 1. Criar um objeto que representa a transação:
  //     // Adicionar a transação ao array de transações
  //     // 3. Renderizar a transação na tabela
  //     // insertAdjacentHTML
  //   }
  //   const tbody = document.querySelector("tbody");
  //   tbody.insertAdjacentHTML(
  //     "beforeend",
  //     `<tr>
  //   <td class="title">Salário de Desenvolvedor</td>
  //   <td>Entrada</td>
  //   <td>R$ 12.000,00</td>
  //   <td>01/09/2022</td>
  // </tr>`
  //   );
});
