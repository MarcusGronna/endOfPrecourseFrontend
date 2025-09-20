const outputContainer = document.querySelector(".dataContainer");
const baseUrl = "http://localhost:5029/api/addresses";

function dataToShow() {
  return fetch(baseUrl).then((response) => response.json());
}

dataToShow().then((data) => {
  outputContainer.textContent = JSON.stringify(data);
});

async function addAddress() {
  await fetch(baseUrl, {
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
  await fetch(`${baseUrl}/4`, {
    method: "DELETE",
  });
}

deleteAddress();
