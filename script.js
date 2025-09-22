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

  // Read form fields
  const form = e.target;
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  const id = payload.id ?? "";

  if (id) {
    const ops = [];

    // Add replace operation only if input field NOT empty
    if (payload.city) {
      ops.push({ op: "replace", path: "/city", value: payload.city });
    }
    if (payload.street) {
      ops.push({ op: "replace", path: "/street", value: payload.street });
    }
    if (payload.streetNumber) {
      ops.push({ op: "replace", path: "/streetNumber", value: payload.streetNumber });
    }

    if (ops.length === 0) {
      alert("No fields to update.");
      return;
    }

    await patchAddress(payload.id, ops);
    form.reset();
    await load();
    return;
  }

  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  form.reset();
  load();
});

//* Helper function
async function patchAddress(id, ops) {
  const res = await fetch(`${api}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json-patch+json",
    },
    body: JSON.stringify(ops),
  });

  if (res.ok) return;

  const msg = await res.text();
  throw new Error(`PATCH failed: ${res.status} ${res.statusText} - ${msg}`);
}

load();
