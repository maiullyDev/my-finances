// Open Modal:
const buttonNovaTransacao = document.querySelector("#button-novaTransacao");

const buttonClose = document.querySelector(".button-close");

const modalNovaTransacao = document.querySelector(".modal");

buttonNovaTransacao.addEventListener("click", () => {
  modalNovaTransacao.style.display = "block";
});

buttonClose.addEventListener("click", () => {
  modalNovaTransacao.style.display = "none";
  transactionForm.reset();
});

// Saving form information:
const transactionForm = document.querySelector(".transactionForm");
const transactionsArray = [];

// Evento submit:
transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(transactionForm);

  const transactionObject = {};

  for (let campo of formData) {
    transactionObject[campo[0]] = campo[1];
  }

  // Adicionando nova transação ao array de transações:
  transactionsArray.push(transactionObject);
  console.log(transactionsArray);

  // Transformando o objeto em um JSON e salvando no localStorage:
  const transactionsArrayString = JSON.stringify(transactionsArray);
  localStorage.setItem("transactionsArray", transactionsArrayString);

  // Obtendo dados do localStorage:
  const transactionObjectObtained = localStorage.getItem("transactionObject");
  const transactionObjectJs = JSON.parse(transactionObjectObtained);
  console.log(transactionObjectJs);

  // Adicionando HTML:
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

  transactionForm.reset();
});

window.onload = () => {
  console.log("carregou");
  // Usar getItem
  // Usar parse
  // Fazer um for em cima do array de transações
  // Dentro do for, cada elemento da iteração é um objeto
  // Adicionar código HTML
};
