const outputContainer = document.querySelector(".dataContainer");

function dataToShow() {
  return fetch("http://localhost:5029/api/addresses").then((response) => response.json());
}

dataToShow().then((data) => {
  outputContainer.textContent = JSON.stringify(data);
});

async function addAddress() {
  await fetch("http://localhost:5029/api/addresses", {
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
