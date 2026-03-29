const allClasses = [
  { name: "Power Lift Lab", type: "strength", time: "06:30" },
  { name: "MetCon Burn", type: "cardio", time: "07:30" },
  { name: "Kettlebell Core", type: "strength", time: "17:30" },
  { name: "Mobility Reset", type: "mobility", time: "18:15" },
  { name: "HIIT Sprint", type: "cardio", time: "19:00" }
];

const classContainer = document.getElementById("classes");

function renderClasses(filter) {
  const list = filter === "all" ? allClasses : allClasses.filter((item) => item.type === filter);
  classContainer.innerHTML = list.map((item) => `
    <div class="class-item">
      <span>${item.name}</span>
      <strong>${item.time}</strong>
    </div>
  `).join("");
}

document.querySelector(".filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  document.querySelectorAll(".filters button").forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
  renderClasses(btn.dataset.filter);
});
renderClasses("all");

document.getElementById("bmi-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const height = Number(form.get("height")) / 100;
  const weight = Number(form.get("weight"));
  const bmi = weight / (height * height);
  let band = "Healthy";
  if (bmi < 18.5) band = "Under";
  else if (bmi >= 25) band = "Over";
  document.getElementById("bmi-result").textContent = `BMI: ${bmi.toFixed(1)} (${band})`;
});

let running = false;
let taps = 0;
let timer = 30;
let intervalId = null;

const tapBtn = document.getElementById("tap-btn");
const countEl = document.getElementById("count");
const timeEl = document.getElementById("time");

tapBtn.addEventListener("click", () => {
  if (!running) return;
  taps += 1;
  countEl.textContent = `Taps: ${taps}`;
});

document.getElementById("start-timer").addEventListener("click", () => {
  if (running) return;
  running = true;
  taps = 0;
  timer = 30;
  countEl.textContent = "Taps: 0";
  timeEl.textContent = "Time: 30";

  intervalId = setInterval(() => {
    timer -= 1;
    timeEl.textContent = `Time: ${timer}`;
    if (timer === 0) {
      clearInterval(intervalId);
      running = false;
      timeEl.textContent = `Done: ${taps} taps`;
    }
  }, 1000);
});
