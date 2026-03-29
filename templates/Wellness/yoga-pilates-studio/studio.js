const classes = [
  { name: "Morning Reset Flow", level: "gentle" },
  { name: "Pilates Core Precision", level: "medium" },
  { name: "Power Vinyasa", level: "intense" },
  { name: "Mobility Foundations", level: "gentle" },
  { name: "Dynamic Balance Lab", level: "medium" }
];

const listEl = document.getElementById("class-list");
function draw(level) {
  const items = level === "all" ? classes : classes.filter((x) => x.level === level);
  listEl.innerHTML = items.map((x) => `<li><strong>${x.name}</strong> - ${x.level}</li>`).join("");
}

document.querySelector(".tabs").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-level]");
  if (!btn) return;
  document.querySelectorAll(".tabs button").forEach((x) => x.classList.remove("active"));
  btn.classList.add("active");
  draw(btn.dataset.level);
});

draw("all");

const pacer = document.getElementById("pacer");
const phase = document.getElementById("phase");

document.getElementById("start-breath").addEventListener("click", () => {
  let cycles = 0;
  phase.textContent = "Inhale";
  pacer.style.transform = "scale(1.2)";

  const tick = setInterval(() => {
    if (phase.textContent === "Inhale") {
      phase.textContent = "Exhale";
      pacer.style.transform = "scale(0.8)";
    } else {
      phase.textContent = "Inhale";
      pacer.style.transform = "scale(1.2)";
      cycles += 1;
    }
    if (cycles >= 4) {
      clearInterval(tick);
      phase.textContent = "Complete";
    }
  }, 4000);
});

const sessions = {
  mobility: ["Cat-Cow x 3 min", "Hip Openers x 5 min", "Thoracic Rotations x 6 min", "Leg Stretch x 6 min"],
  core: ["Pilates Hundred x 3 min", "Dead Bug x 5 min", "Plank Variations x 6 min", "Boat Pose x 6 min"],
  recovery: ["Long Breath x 4 min", "Supported Child Pose x 5 min", "Supine Twist x 5 min", "Yoga Nidra x 6 min"],
  posture: ["Wall Alignment x 4 min", "Scapular Work x 5 min", "Bridge Pose x 5 min", "Seated Lift x 6 min"]
};

document.getElementById("build").addEventListener("click", () => {
  const focus = document.getElementById("focus").value;
  document.getElementById("session").innerHTML = sessions[focus].map((x) => `<li>${x}</li>`).join("");
});
