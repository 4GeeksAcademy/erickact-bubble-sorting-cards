/* eslint-disable */
import "bootstrap";
import "./style.css";

const getRandomNumber = max => Math.floor(Math.random() * (max + 1));

const letters = {
  0: "2",
  1: "3",
  2: "4",
  3: "5",
  4: "6",
  5: "7",
  6: "8",
  7: "9",
  8: "10",
  9: "J",
  10: "Q",
  11: "K",
  12: "A"
};

const symbols = {
  0: "♤",
  1: "♧",
  2: "♡",
  3: "♢"
};

const getCard = () => {
  let randomForLetter = getRandomNumber(12);
  let randomForSymbol = getRandomNumber(3);
  let label = letters[randomForLetter];
  let symbol = symbols[randomForSymbol];
  let color = ["♤", "♧"].includes(symbol) ? "text-dark" : "text-danger";

  return { label, symbol, color, index: randomForLetter };
};

const getCards = n => {
  const array = Array.from({ length: n }, () => getCard());
  return array;
};

const bubbleSort = arr => {
  let wall = arr.length - 1;
  let steps = [[...arr]]; // Agregar el estado inicial al array de pasos

  while (wall > 0) {
    let index = 0;
    let swapped = false;

    while (index < wall) {
      //comparar las posiciones adyacentes, si la correcta es más grande, tenemos que intercambiar
      if (arr[index] > arr[index + 1]) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
        swapped = true;
        steps.push([...arr]); // Guardar el estado después del intercambio
      }
      index++;
    }
    if (!swapped) break; //romper si no hubo intercambios
    wall--; //disminuir la pared para optimizar
  }
  return steps;
};

let cards = [];

const renderCardDraw = n => {
  cards = getCards(n);
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    const wrapperDraw = document.getElementById("cardsDraw");
    wrapperDraw.classList.add("d-flex", "mt-4", "mb-4");

    const cardNodeDraw = document.createElement("div");
    cardNodeDraw.classList.add("me-2", "shadow");
    cardNodeDraw.innerHTML = `
        <div class="card-container bg-white position-relative rounded shadow bg-body-tertiary">
          <div class="card-symbol position-absolute top-0 start-0 ${card.color}">${card.symbol}</div>
          <div class="card-label position-absolute top-50 start-50 translate-middle">${card.label}</div>
          <div class="card-symbol position-absolute bottom-0 end-0  ${card.color}">${card.symbol}</div>
        </div>
      `;

    wrapperDraw.appendChild(cardNodeDraw);
  }
};

const renderCards = array => {
  const cardsNode = document.getElementById("cards");

  for (let i = 0; i < array.length; i++) {
    const steps = array[i];

    const wrapper = document.createElement("div");
    wrapper.classList.add("d-flex", "mb-2");

    const arrayClone = [...cards];

    const index = document.createElement("div");
    index.classList.add("card-index", "fst-italic");
    index.textContent = i;

    wrapper.appendChild(index);

    let count = 0;
    while (count < steps.length) {
      const index = steps[count];
      const cardIndex = arrayClone.findIndex(item => {
        return +item.index === index;
      });
      const card = arrayClone[cardIndex];
      arrayClone.splice(cardIndex, 1);
      const cardNode = document.createElement("div");
      cardNode.classList.add("me-2", "shadow");
      cardNode.innerHTML = `
        <div class="card-container bg-white position-relative rounded shadow bg-body-tertiary">
          <div class="card-symbol position-absolute top-0 start-0 ${card.color}">${card.symbol}</div>
          <div class="card-label position-absolute top-50 start-50 translate-middle">${card.label}</div>
          <div class="card-symbol position-absolute bottom-0 end-0  ${card.color}">${card.symbol}</div>
        </div>
      `;
      wrapper.appendChild(cardNode);

      count++;
    }

    cardsNode.appendChild(wrapper);
  }
};

document.getElementById("draw").addEventListener("click", e => {
  const input = document.getElementById("numberInput");

  renderCardDraw(+input.value);
});

document.getElementById("sort").addEventListener("click", e => {
  const cardsIndex = cards.map(card => +card.index);
  const sortedSteps = bubbleSort(cardsIndex);
  console.log("sortedsteps", sortedSteps);

  renderCards(sortedSteps);
});
