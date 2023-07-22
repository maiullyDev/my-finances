// Open Modal:
const buttonNovaTransacao = document.querySelector("#button-novaTransacao");

const buttonClose = document.querySelector(".button-close");

const modalNovaTransacao = document.querySelector(".modal");

buttonNovaTransacao.addEventListener("click", () => {
  modalNovaTransacao.style.display = "block";
});

const closeModalAction = () => {
  modalNovaTransacao.style.display = "none";
  transactionForm.reset();
};

buttonClose.addEventListener("click", closeModalAction);

// Saving form information:
const transactionForm = document.querySelector(".transactionForm");
let transactionsArray = [];

// Variáveis globais que recebem o total de saídas e de entradas:
let totalSaidas = 0;
let totalEntradas = 0;
let totalEntradasEsaidas = 0;

// Cards de entradas e saídas:
const cardIncomes = document.querySelector(".cardGreen");
const cardOutcomes = document.querySelector(".cardRed");
const cardTotal = document.querySelector(".cardTotal");

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

  // Transformando o array em um JSON e salvando no localStorage:
  const transactionsArrayString = JSON.stringify(transactionsArray);
  localStorage.setItem("transactionsArray", transactionsArrayString);

  // Adicionando HTML:
  const tbody = document.querySelector("tbody");
  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr>
    <td class="title">${transactionObject.title}</td>
    <td>${transactionObject.type}</td>
    <td>R$ ${transactionObject.value}</td>
    <td>${transactionObject.data}</td>
  </tr>`
  );

  if (transactionObject.type === "Entrada") {
    totalEntradas += Number(transactionObject.value);
    cardIncomes.innerHTML = `${totalEntradas.toFixed(2)}`;
  } else {
    totalSaidas += Number(transactionObject.value);
    cardOutcomes.innerHTML = `${totalSaidas.toFixed(2)}`;
  }

  // Código para atualizar o valor do card que apresenta o valor total
  totalEntradasEsaidas = totalEntradas - totalSaidas;
  cardTotal.innerHTML = `${totalEntradasEsaidas.toFixed(2)}`;

  closeModalAction();
});

// Código usado para obter dados do localStorage e apresentá-los na interface para o usuário.
window.onload = () => {
  // Código para verificar se já existem dados no localStorage:
  const transactionsArrayStorage = localStorage.getItem("transactionsArray");
  if (transactionsArrayStorage !== null) {
    transactionsArray = JSON.parse(transactionsArrayStorage);
  }

  // No for, para cada objeto do array de transações, deve ser implementado um código HTML.
  for (let object of transactionsArray) {
    const tbody = document.querySelector("tbody");
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td class="title">${object.title}</td>
        <td>${object.type}</td>
        <td>R$ ${Number(object.value).toFixed(2)}</td>
        <td>${object.data}</td>
      </tr>`
    );
  }
  calculatingValues();
};

// Código para somar os valores (independente de ser entrada ou saída)
function calculatingValues() {
  let sumSaida = 0;
  let sumEntrada = 0;
  transactionsArray.forEach((object) => {
    object.value = parseInt(object.value);
    if (object.type === "Saída") {
      if (object.value > 0) {
        sumSaida += object.value;
      } else {
        sumSaida = 0;
      }
    } else if (object.type === "Entrada") {
      if (object.value > 0) {
        sumEntrada += object.value;
      } else {
        sumEntrada = 0;
      }
    }
  });

  // Atualizando no card de saídas do HTML
  cardIncomes.innerHTML = `${sumEntrada.toFixed(2)}`;
  totalEntradas = sumEntrada;

  // Atualizando no card de saídas do HTML
  cardOutcomes.innerHTML = `${sumSaida.toFixed(2)}`;
  totalSaidas = sumSaida;

  let totalEntradasEsaidas = sumEntrada - sumSaida;
  cardTotal.innerHTML = `${totalEntradasEsaidas.toFixed(2)}`;
}
