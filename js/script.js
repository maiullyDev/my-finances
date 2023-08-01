// Open Modal:
const buttonNovaTransacao = document.querySelector("#button-novaTransacao");

const buttonClose = document.querySelector(".button-close");
const modalNovaTransacao = document.querySelector(".modal");
const tbody = document.querySelector("tbody");
const tableContainer = document.querySelector(".tableContainer");

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
  const idTransaction = new Date().getTime();
  transactionObject.id = idTransaction;

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
    <td>R$ ${Number(transactionObject.value).toFixed(2)}</td>
    <td>${transactionObject.data}</td>
    <td><button id='${
      transactionObject.id
    }' onclick='removeTransaction(event)'><img id='${
      transactionObject.id
    }' src="./assets/delete.png" alt="Excluir transação"/></button></td>
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
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td class="title">${object.title}</td>
        <td>${object.type}</td>
        <td>R$ ${Number(object.value).toFixed(2)}</td>
        <td>${object.data}</td>
        <td><button id='${
          object.id
        }' onclick='removeTransaction(event)'><img id='${
        object.id
      }' src="./assets/delete.png" alt="Excluir transação"/></button></td>
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

// Utilizando o evento input para o campo de pesquisa:
const searchField = document.querySelector("#searchField");
searchField.addEventListener("input", () => {
  const searchFieldResult = transactionsArray.filter((object) => {
    return object.title.includes(searchField.value);
  });

  let tbodySearch = ``;

  for (let transaction of searchFieldResult) {
    tbodySearch += `<tr>
        <td class="title">${transaction.title}</td>
        <td>${transaction.type}</td>
        <td>R$ ${Number(transaction.value).toFixed(2)}</td>
        <td>${transaction.data}</td>
        <td><button id='${
          transaction.id
        }' onclick='removeTransaction(event)'><img id='${
      transaction.id
    }' src="./assets/delete.png" alt="Excluir transação"/></button></td>
      </tr>`;
  }

  tbody.innerHTML = tbodySearch;
});

// Função para excluir uma linha da tabela:
function removeTransaction(event) {
  const isConfirmed = confirm(
    "Tem certeza de que deseja excluir essa transação?"
  );
  if (isConfirmed) {
    event.target.parentElement.parentElement.parentElement.remove();

    // Código para encontrar a transação que será excluída e atualizar os valores dos cards:
    let deletedTransaction = transactionsArray.find(
      (transaction) => Number(transaction.id) === Number(event.target.id)
    );
    deletedTransaction.value = Number(deletedTransaction.value);
    if (deletedTransaction.type === "Saída") {
      totalSaidas -= deletedTransaction.value;
      cardOutcomes.innerHTML = `${totalSaidas.toFixed(2)}`;
    } else if (deletedTransaction.type === "Entrada") {
      totalEntradas -= deletedTransaction.value;
      cardIncomes.innerHTML = `${totalEntradas.toFixed(2)}`;
    }
    totalEntradasEsaidas = totalEntradas - totalSaidas;
    cardTotal.innerHTML = `${totalEntradasEsaidas.toFixed(2)}`;

    // Código para gerar um novo array com as transações já existentes no array de transações - a transação que foi excluída:
    transactionsArray = transactionsArray.filter((transaction) => {
      return Number(transaction.id) !== Number(event.target.id);
    });
    localStorage.setItem(
      "transactionsArray",
      JSON.stringify(transactionsArray)
    );
  }
}
