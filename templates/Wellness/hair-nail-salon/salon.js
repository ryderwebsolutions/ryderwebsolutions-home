const tone = document.getElementById("tone");
const accent = document.getElementById("accent");
const finish = document.getElementById("finish");
const preview = document.getElementById("preview");

function updatePreview() {
  const t = tone.value;
  const a = accent.value;
  const effect = finish.value;
  const shine = effect === "chrome" ? "0 0 40px #ffffff" : effect === "gloss" ? "inset 0 0 20px #ffffffa0" : "none";
  preview.style.background = `linear-gradient(125deg, hsl(${t} 75% 60%), hsl(${a} 85% 70%))`;
  preview.style.boxShadow = shine;
  preview.style.filter = effect === "matte" ? "saturate(85%)" : "saturate(115%)";
}
[tone, accent, finish].forEach((el) => el.addEventListener("input", updatePreview));
updatePreview();

const estimate = {
  "Cut & Blowdry": 50,
  Balayage: 120,
  "Gel Nails": 45,
  "Nail Art": 35,
  "Brow Styling": 20
};
const selected = new Set();
const selectedList = document.getElementById("selected");
const duration = document.getElementById("duration");

document.getElementById("service-chips").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-service]");
  if (!btn) return;
  const name = btn.dataset.service;
  if (selected.has(name)) selected.delete(name);
  else selected.add(name);
  btn.classList.toggle("active");

  selectedList.innerHTML = [...selected].map((item) => `<li>${item}</li>`).join("") || "<li>No services selected yet.</li>";
  const minutes = [...selected].reduce((sum, item) => sum + estimate[item], 0);
  duration.textContent = minutes ? `Estimated appointment time: ${minutes} minutes.` : "";
});
