import { dataAPI } from "./api.js";

const tbody = document.querySelector("#table-coins");
const tbodyFavorites = document.querySelector("#favorites");

let arrayFavorites = [];

document.addEventListener("DOMContentLoaded", () => {
  arrayFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  showHTMLFavorites(arrayFavorites);
  // deleteAllFavorites(arrayFavorites);
});

export function showCoins(list) {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  list.forEach((coin) => {
    const { image, name, current_price, price_change_percentage_24h, id } =
      coin;

    const tableRow = document.createElement("tr");
    tableRow.id = id;

    const logo = document.createElement("td");
    logo.classList.add("px-7", "py-2");
    const picture = document.createElement("img");
    picture.classList.add("w-20");
    picture.src = image;
    logo.appendChild(picture);

    const nameT = document.createElement("td");
    nameT.classList.add("px-3");
    nameT.textContent = name;

    const price = document.createElement("td");
    price.classList.add("px-3");
    price.textContent = current_price;

    const variation = document.createElement("td");
    variation.textContent = price_change_percentage_24h;
    variation.classList.add("px-3");
    if (price_change_percentage_24h >= 0) {
      variation.classList.add("text-green-500");
    } else {
      variation.classList.add("text-red-600");
    }

    const favorites = document.createElement("td");
    favorites.classList.add("px-3", "pr-5");
    const favorite = document.createElement("a");
    favorite.classList.add("hover:cursor-pointer");
    favorite.innerHTML = `
      <svg id="svg"
        fill="none"
        width="30px"
        height="30px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#f0dc00"
        stroke-width="3"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>Favorites</title>
          <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path>
        </g>
      </svg>
    `;

    favorite.onclick = (e) => {
      const svg = favorite.querySelector("#svg");

      if (svg.getAttribute("fill") === "none") {
        svg.setAttribute("fill", "#f0dc00");
      } else {
        svg.setAttribute("fill", "none");
      }

      const idFavorite = favorite.parentElement.parentElement.id;

      if (svg.getAttribute("fill") === "#f0dc00") {
        addFavorite(idFavorite, arrayFavorites);
        // console.log("se añadio");
      } else {
        deleteFavorite(idFavorite, arrayFavorites);
        // console.log("se elimino");
      }
    };

    favorites.appendChild(favorite);

    tableRow.appendChild(logo);
    tableRow.appendChild(nameT);
    tableRow.appendChild(price);
    tableRow.appendChild(variation);
    tableRow.appendChild(favorites);

    tbody.appendChild(tableRow);
  });
}

export function showOptions(coinList, select) {
  coinList.forEach((coin) => {
    const { id, name } = coin;

    const nameS = document.createElement("option");
    nameS.id = id;
    nameS.textContent = name;

    select.appendChild(nameS);
  });
}

export function showCoinSimulator(filtration) {
  const simulatorContainer = document.querySelector("#simulator-container");

  const [{ image, name, current_price, price_change_percentage_24h }] =
    filtration;

  while (simulatorContainer.firstChild) {
    simulatorContainer.removeChild(simulatorContainer.firstChild);
  }

  const divCoin = document.createElement("div");
  divCoin.classList.add(
    "flex",
    "justify-around",
    "items-center",
    "my-7",
    "py-4",
    "px-6",
    "bg-gray-100",
    "shadow-lg",
    "shadow-teal-300/50",
    "border-3",
    "border-teal-300",
    "rounded-lg",
    "gap-10",
  );
  simulatorContainer.appendChild(divCoin);

  // div that contains logo and name
  const divNameLogo = document.createElement("div");
  divNameLogo.classList.add(
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "pr-7",
    "border-e-3",
    "border-teal-300",
  );
  divCoin.appendChild(divNameLogo);

  // div that contains price the coin
  const divPrice = document.createElement("div");
  divPrice.classList.add("flex", "flex-col");
  divCoin.appendChild(divPrice);

  // div that contains variation of price
  const divVariation = document.createElement("div");
  divVariation.classList.add("flex", "flex-col");
  divCoin.appendChild(divVariation);

  // Creating the logo and name for the filtered coin
  const logo = document.createElement("img");
  logo.src = image;
  logo.classList.add("w-20");
  divNameLogo.appendChild(logo);

  const nameCF = document.createElement("p");
  nameCF.textContent = name;
  nameCF.classList.add("text-lg", "font-semibold");
  divNameLogo.appendChild(nameCF);

  // Price of coin
  const textPrice = document.createElement("p");
  textPrice.textContent = "Precio";
  textPrice.classList.add("text-lg", "font-semibold");
  divPrice.appendChild(textPrice);

  const price = document.createElement("p");
  price.textContent = `${current_price} USD`;
  price.classList.add("text-lg");
  divPrice.appendChild(price);

  // Change of price
  const textVariation = document.createElement("p");
  textVariation.textContent = "Cambio porcentual (24h)";
  textVariation.classList.add("text-lg", "font-semibold");
  divVariation.appendChild(textVariation);

  const variation = document.createElement("p");
  variation.textContent = price_change_percentage_24h;
  variation.classList.add("text-lg");
  divVariation.appendChild(variation);
  if (price_change_percentage_24h >= 0) {
    variation.classList.add("text-green-500");
  } else {
    variation.classList.add("text-red-600");
  }

  // Creating the counter and total
  const divCounter = document.createElement("div");
  divCounter.classList.add(
    "flex",
    "justify-evenly",
    "bg-gray-100",
    "p-3",
    "rounded-lg",
    "shadow-lg",
    "shadow-teal-300/50",
    "border-2",
    "border-teal-300",
  );
  simulatorContainer.appendChild(divCounter);

  const counter = document.createElement("input");
  counter.min = "0";
  counter.type = "number";
  counter.classList.add("border-2", "rounded-lg", "w-30");
  divCounter.appendChild(counter);

  counter.onchange = (e) => calculateTotal(e);

  const totalTxt = document.createElement("p");
  totalTxt.classList.add("font-semibold");
  totalTxt.textContent = "Total:";
  divCounter.appendChild(totalTxt);

  const total = document.createElement("span");
  total.classList.add("font-normal", "ml-3");

  // Calculating the total with dinamic parameters
  function calculateTotal(e) {
    const totalCalculated = e.target.value * current_price;
    total.textContent = `$${totalCalculated} USD`;
  }

  totalTxt.appendChild(total);
}

// Show the favorites menu
export function showFavoritesMenu() {
  const favoritesMenu = document.querySelector("#favorites-menu");
  favoritesMenu.classList.toggle("hidden");
}

// Addind favorites for te id
export function addFavorite(id) {
  const favoriteCoin = dataAPI.filter((coin) => coin.id === id);

  arrayFavorites = [...arrayFavorites, favoriteCoin[0]];

  showHTMLFavorites(arrayFavorites);
}

// Deleting a favorites for the id
function deleteFavorite(id, favorites) {
  arrayFavorites = favorites.filter((coin) => coin.id !== id);
  showHTMLFavorites(arrayFavorites);
}

// Show HTML favorites
function showHTMLFavorites(favorites) {
  while (tbodyFavorites.firstChild) {
    tbodyFavorites.removeChild(tbodyFavorites.firstChild);
  }

  // creating HTML for the favorites
  favorites.forEach((coin) => {
    const { image, name, current_price, id } = coin;

    const tableRow = document.createElement("tr");
    tableRow.id = id;

    const logo = document.createElement("td");
    logo.classList.add("px-7", "py-2");
    const picture = document.createElement("img");
    picture.classList.add("w-20");
    picture.src = image;
    logo.appendChild(picture);

    const nameT = document.createElement("td");
    nameT.classList.add("px-3");
    nameT.textContent = name;

    const price = document.createElement("td");
    price.classList.add("px-3");
    price.textContent = current_price;

    const favorites = document.createElement("td");
    favorites.classList.add("px-3", "pr-5");
    const favorite = document.createElement("a");
    favorite.classList.add("hover:cursor-pointer");
    favorite.innerHTML = `
      <svg id="svg"
        fill="#f0dc00"
        width="30px"
        height="30px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#f0dc00"
        stroke-width="3"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>Favorites</title>
          <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path>
        </g>
      </svg>
    `;

    favorite.onclick = (e) => {
      const idFavorite = favorite.parentElement.parentElement.id;
      deleteFavorite(idFavorite, arrayFavorites);
    };

    favorites.appendChild(favorite);

    tableRow.appendChild(logo);
    tableRow.appendChild(nameT);
    tableRow.appendChild(price);
    tableRow.appendChild(favorites);

    tbodyFavorites.appendChild(tableRow);
  });
  localStorageP();
}

// Deleting all Favorites
export function deleteAllFavorites(e) {
  if (e.target.classList.contains("eliminate")) {
    arrayFavorites = [];

    while (tbodyFavorites.firstChild) {
      tbodyFavorites.removeChild(tbodyFavorites.firstChild);
    }
  }
  localStorageP();
}

function localStorageP() {
  localStorage.setItem("favorites", JSON.stringify(arrayFavorites));
}
