const chips = document.querySelectorAll(".chip");
const sessionsEl = document.getElementById("sessions");
const priceEl = document.getElementById("price");
const moodEl = document.getElementById("mood");
const sessionsValueEl = document.getElementById("sessions-value");
const moodValueEl = document.getElementById("mood-value");
const annualBillEl = document.getElementById("annual-bill");
const noteEl = document.getElementById("result-note");

const faceEl = document.getElementById("face");
const eyeLeftEl = document.getElementById("eye-left");
const eyeRightEl = document.getElementById("eye-right");
const mouthEl = document.getElementById("mouth");
const propEl = document.getElementById("prop");
const faceCaptionEl = document.getElementById("face-caption");

let selectedGender = "male";

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function setFace(gender) {
  faceEl.className = "face";
  propEl.className = "prop";
  eyeLeftEl.textContent = "";
  eyeRightEl.textContent = "";

  if (gender === "male") {
    faceEl.classList.add("face-male");
    eyeLeftEl.style.background = "#60a5fa";
    eyeRightEl.style.background = "#60a5fa";
    mouthEl.style.borderBottomColor = "#7f1d1d";
    propEl.classList.add("cigarette");
    faceCaptionEl.textContent = "Male mode: cool eyes + cigarette prop";
  } else if (gender === "female") {
    faceEl.classList.add("female");
    eyeLeftEl.style.background = "transparent";
    eyeRightEl.style.background = "transparent";
    eyeLeftEl.textContent = "❤";
    eyeRightEl.textContent = "❤";
    eyeLeftEl.style.color = "#e11d48";
    eyeRightEl.style.color = "#e11d48";
    eyeLeftEl.style.fontSize = "16px";
    eyeRightEl.style.fontSize = "16px";
    eyeLeftEl.style.display = "grid";
    eyeRightEl.style.display = "grid";
    eyeLeftEl.style.placeItems = "center";
    eyeRightEl.style.placeItems = "center";
    mouthEl.style.borderBottomColor = "#db2777";
    faceCaptionEl.textContent = "Female mode: heart eyes + smile mood";
  } else {
    faceEl.classList.add("face-other");
    eyeLeftEl.style.background = "transparent";
    eyeRightEl.style.background = "transparent";
    eyeLeftEl.textContent = "$";
    eyeRightEl.textContent = "$";
    eyeLeftEl.style.color = "#15803d";
    eyeRightEl.style.color = "#15803d";
    eyeLeftEl.style.fontSize = "18px";
    eyeRightEl.style.fontSize = "18px";
    eyeLeftEl.style.display = "grid";
    eyeRightEl.style.display = "grid";
    eyeLeftEl.style.placeItems = "center";
    eyeRightEl.style.placeItems = "center";
    mouthEl.style.borderBottomColor = "#166534";
    faceCaptionEl.textContent = "They/Them mode: dollar-sign eyes";
  }
}

function updateResult() {
  const sessions = Number(sessionsEl.value);
  const price = Number(priceEl.value);
  const mood = Number(moodEl.value);
  const moodMultiplier = 0.8 + mood * 0.05;
  const annual = sessions * price * 12 * moodMultiplier;

  sessionsValueEl.textContent = String(sessions);
  moodValueEl.textContent = String(mood);
  annualBillEl.textContent = formatUsd(annual);

  if (mood <= 3) {
    noteEl.textContent = "Chill mode: low-intensity emotional weather.";
  } else if (mood <= 7) {
    noteEl.textContent = "Balanced mode selected.";
  } else {
    noteEl.textContent = "Spicy mode: dramatic growth arc detected.";
  }
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    selectedGender = chip.dataset.gender || "male";
    setFace(selectedGender);
    updateResult();
  });
});

[sessionsEl, priceEl, moodEl].forEach((input) => {
  input.addEventListener("input", updateResult);
});

setFace(selectedGender);
updateResult();
