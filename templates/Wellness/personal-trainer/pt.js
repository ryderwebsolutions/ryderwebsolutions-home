const templates = {
  "fat-loss": ["2 strength days", "2 cardio intervals", "1 mobility reset"],
  "muscle-gain": ["3 hypertrophy sessions", "1 conditioning day", "1 recovery walk"],
  performance: ["2 power sessions", "2 speed sessions", "1 mobility + core"]
};

document.getElementById("plan-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const goal = data.get("goal");
  const sessions = Number(data.get("sessions"));
  const level = data.get("level");

  const blocks = templates[goal].slice();
  blocks.push(`Session target: ${sessions} per week`);
  blocks.push(`Progression: ${level} protocol`);

  document.getElementById("plan-output").innerHTML = `
    <p><strong>Suggested weekly structure</strong></p>
    <ul>${blocks.map((x) => `<li>${x}</li>`).join("")}</ul>
  `;
});

const workEl = document.getElementById("work");
const restEl = document.getElementById("rest");
const roundsEl = document.getElementById("rounds");
const stageEl = document.getElementById("stage");
const countEl = document.getElementById("count");
let timerRef = null;

function runPhase(label, seconds, done) {
  stageEl.textContent = label;
  let left = seconds;
  countEl.textContent = left;
  timerRef = setInterval(() => {
    left -= 1;
    countEl.textContent = left;
    if (left <= 0) {
      clearInterval(timerRef);
      done();
    }
  }, 1000);
}

document.getElementById("start-interval").addEventListener("click", () => {
  if (timerRef) return;
  let currentRound = 1;
  const maxRounds = Number(roundsEl.value);
  const work = Number(workEl.value);
  const rest = Number(restEl.value);

  function nextRound() {
    if (currentRound > maxRounds) {
      stageEl.textContent = "Complete";
      countEl.textContent = "Done";
      timerRef = null;
      return;
    }

    runPhase(`Work Round ${currentRound}`, work, () => {
      runPhase("Rest", rest, () => {
        currentRound += 1;
        nextRound();
      });
    });
  }

  nextRound();
});
