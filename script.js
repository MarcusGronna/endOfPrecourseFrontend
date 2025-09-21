const outputContainer = document.querySelector(".dataContainer");
const api = "http://localhost:5029/api/addresses";
const list = document.getElementById("list");

async function load() {
  const res = await fetch(api);
  const data = await res.json();

  data.forEach((addr) => {
    const li = document.createElement("li");
    const address = `${addr.city}: ${addr.street} ${addr.streetNumber}`;
    const del = document.createElement("button");

    // del.onclick();

    li.append(address);
    list.append(li);
  });
}
load();

dataToShow().then((data) => {
  outputContainer.textContent = JSON.stringify(data);
});

async function addAddress() {
  await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city: "Stockholm",
      street: "Sollentunavägen",
      streetNumber: "32",
    }),
  });
}

addAddress();

async function deleteAddress() {
  await fetch(`${api}/4`, {
    method: "DELETE",
  });
}
