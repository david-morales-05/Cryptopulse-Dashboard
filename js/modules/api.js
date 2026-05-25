import { showCoins } from "./ui.js";

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

export async function demostracion() {
  try {
    const response = await fetch("../../json/prueba.json");

    const data = await response.json();
    showCoins(data);
  } catch (error) {
    console.error("No se ha podido acceder a la base de datos", error);
  }
}
