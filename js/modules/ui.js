export function showCoins(list) {
  list.forEach((coin) => {
    const { image, name, current_price, price_change_percentage_24h, id } =
      coin;

    const tbody = document.querySelector("#table-coins");

    const tableRow = document.createElement("tr");

    const logo = document.createElement("td");
    const picture = document.createElement("img");
    picture.classList.add("w-25", "h-25");
    picture.src = image;
    logo.appendChild(picture);

    const nameT = document.createElement("td");
    nameT.textContent = name;

    const price = document.createElement("td");
    price.textContent = current_price;

    const variation = document.createElement("td");
    variation.textContent = price_change_percentage_24h;

    tableRow.appendChild(logo);
    tableRow.appendChild(nameT);
    tableRow.appendChild(price);
    tableRow.appendChild(variation);

    tbody.appendChild(tableRow);
  });
}
