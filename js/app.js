import { demostracion, coinFilter, searcherCoin } from "./modules/api.js";
import { showFavoritesMenu, deleteAllFavorites } from "./modules/ui.js";

// Selectores
const deleteFavorites = document.querySelector("#empty-list");
const starButton = document.querySelector("#star");
const selectCriptos = document.querySelector("#select-criptos");
const searchCoin = document.querySelector("#search");

// Event listeners
deleteFavorites.addEventListener("click", eliminate);
starButton.addEventListener("click", clickListenerFavorites);
searchCoin.addEventListener("input", searchingCoin);
selectCriptos.addEventListener("change", simulatorFilter);
document.addEventListener("DOMContentLoaded", consultAPI);

function consultAPI() {
  // autentication();

  demostracion(selectCriptos);
}

function simulatorFilter(e) {
  coinFilter(e);
}

function searchingCoin(e) {
  e.preventDefault();
  searcherCoin(e);
}

function clickListenerFavorites(e) {
  showFavoritesMenu(e);
}

function eliminate(e) {
  deleteAllFavorites(e);
}
