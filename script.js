const outputContainer = document.querySelector(".dataContainer");

function dataToShow() {
  return fetch("http://localhost:5029/api/addresses").then((response) => response.json());
}

dataToShow().then((data) => {
  outputContainer.textContent = JSON.stringify(data);
});
