const outputContainer = document.querySelector(".dataContainer");
const api = "http://localhost:5029/api/addresses";
const list = document.getElementById("list");

async function load() {
  const res = await fetch(api);
  const data = await res.json();
  list.innerHTML = "";

  data.forEach((addr) => {
    const li = document.createElement("li");
    li.textContent = `${addr.id}: ${addr.city}, ${addr.street} ${addr.streetNumber}`;

    const del = document.createElement("button");
    del.textContent = "Delete address";
    del.onclick = async () => {
      await fetch(`${api}/${addr.id}`, { method: "DELETE" });
      load();
    };

    li.append(del);
    list.append(li);
  });
}

document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData.entries());
  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  e.target.reset();
  load();
});

load();
