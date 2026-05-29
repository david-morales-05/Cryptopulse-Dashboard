import { showCoins, showOptions, showCoinSimulator } from "./ui.js";

const apiKey = "CG-HqH7Mfsp2RYNBXjWKRoitAwm";
const baseURL = "https://api.coingecko.com/api/v3";

// export async function autentication() {
//   try {
//     const response = await fetch(`${baseURL}/ping`, {
//       method: "GET",
//       headers: {
//         "x-cg-demo-api-key": apiKey,
//         Accept: "application/json",
//       },
//     });

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

export let dataAPI;

export async function demostracion(select) {
  try {
    const response = await fetch("../../json/prueba.json");

    const data = await response.json();
    showCoins(data);
    showOptions(data, select);
    dataAPI = data;
  } catch (error) {
    console.error("No se ha podido acceder a la base de datos", error);
  }
}

export function coinFilter(e) {
  const resultFilter = dataAPI.filter((coin) => coin.name === e.target.value);

  showCoinSimulator(resultFilter);
}

export function searcherCoin(e) {
  const resultSearch = dataAPI.filter((coin) =>
    coin.name.toLowerCase().includes(e.target.value.toLowerCase()),
  );

  showCoins(resultSearch);
}
