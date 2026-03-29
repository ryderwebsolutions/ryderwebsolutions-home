const services = [
  { name: "Skin Fade", type: "hair", price: "EUR 28" },
  { name: "Traditional Cut", type: "hair", price: "EUR 24" },
  { name: "Beard Sculpt", type: "beard", price: "EUR 16" },
  { name: "Hot Towel Beard", type: "beard", price: "EUR 19" },
  { name: "Cut + Beard Combo", type: "combo", price: "EUR 38" }
];

const quotes = [
  '"A cut should feel like armor."',
  '"Good grooming, sharp mindset."',
  '"Details make legends."',
  '"Confidence starts in the chair."'
];

const list = document.getElementById("service-list");
const select = document.getElementById("style-select");

function renderServices(type) {
  const filtered = type === "all" ? services : services.filter((item) => item.type === type);
  list.innerHTML = filtered.map((item) => `
    <div class="service-item">
      <span>${item.name}</span>
      <strong>${item.price}</strong>
    </div>
  `).join("");
}

select.addEventListener("change", (e) => renderServices(e.target.value));
renderServices("all");

document.getElementById("shuffle-quote").addEventListener("click", () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = quote;
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("alt");
});

document.getElementById("booking-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get("name");
  const barber = data.get("barber");
  const time = data.get("time");
  document.getElementById("book-msg").textContent = `Request saved for ${name} with ${barber} at ${time}.`;
  e.target.reset();
});
