const chips = document.querySelectorAll(".chip");
const priceEl = document.getElementById("price");
const annualBillEl = document.getElementById("annual-bill");
const noteEl = document.getElementById("result-note");

const faceEl = document.getElementById("face");
const eyeLeftEl = document.getElementById("eye-left");
const eyeRightEl = document.getElementById("eye-right");
const mouthEl = document.getElementById("mouth");
const propEl = document.getElementById("prop");
const faceCaptionEl = document.getElementById("face-caption");

let selectedGender = "female";
const testPanels = document.querySelectorAll(".gender-test");

const maleCigsEl = document.getElementById("male-cigarettes");
const maleEyesEl = document.getElementById("male-eyes");
const femaleLoveEl = document.getElementById("female-love");
const femaleHeartsEl = document.getElementById("female-hearts");
const otherMoneyEl = document.getElementById("other-money");
const otherDollarEl = document.getElementById("other-dollar");

const maleCigsValueEl = document.getElementById("male-cigarettes-value");
const maleEyesValueEl = document.getElementById("male-eyes-value");
const femaleLoveValueEl = document.getElementById("female-love-value");
const femaleHeartsValueEl = document.getElementById("female-hearts-value");
const otherMoneyValueEl = document.getElementById("other-money-value");
const otherDollarValueEl = document.getElementById("other-dollar-value");
const generateLinkEl = document.getElementById("generate-link");
const friendNameEl = document.getElementById("friend-name");
const friendGuessEl = document.getElementById("friend-guess");
const shareOutputEl = document.getElementById("share-output");

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
  [eyeLeftEl, eyeRightEl].forEach((eye) => {
    eye.style.background = "#1f2937";
    eye.style.color = "";
    eye.style.fontSize = "";
    eye.style.display = "";
    eye.style.placeItems = "";
  });
  mouthEl.style.borderBottomColor = "#b91c1c";

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

function setTestPanel(gender) {
  testPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.test === gender);
  });
}

function updateResult() {
  const price = Number(priceEl.value);
  let score = 5;
  let sessions = 4;

  if (selectedGender === "male") {
    const cigs = Number(maleCigsEl.value);
    const eyes = Number(maleEyesEl.value);
    maleCigsValueEl.textContent = String(cigs);
    maleEyesValueEl.textContent = String(eyes);
    score = (cigs / 2 + eyes) / 2;
    sessions = 2 + Math.round(score / 1.8);
  } else if (selectedGender === "female") {
    const love = Number(femaleLoveEl.value);
    const hearts = Number(femaleHeartsEl.value);
    femaleLoveValueEl.textContent = String(love);
    femaleHeartsValueEl.textContent = String(hearts);
    score = (love + hearts) / 2;
    sessions = 2 + Math.round(score / 1.6);
  } else {
    const money = Number(otherMoneyEl.value);
    const dollar = Number(otherDollarEl.value);
    otherMoneyValueEl.textContent = String(money);
    otherDollarValueEl.textContent = String(dollar);
    score = (money + dollar) / 2;
    sessions = 2 + Math.round(score / 1.7);
  }

  const moodMultiplier = 0.9 + score * 0.05;
  const annual = sessions * price * 12 * moodMultiplier;

  annualBillEl.textContent = formatUsd(annual);

  if (score <= 4) {
    noteEl.textContent = "Low-intensity profile detected.";
  } else if (score <= 7) {
    noteEl.textContent = "Balanced profile detected.";
  } else {
    noteEl.textContent = "High-intensity profile detected.";
  }
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    selectedGender = chip.dataset.gender || "male";
    setFace(selectedGender);
    setTestPanel(selectedGender);
    updateResult();
  });
});

[maleCigsEl, maleEyesEl, femaleLoveEl, femaleHeartsEl, otherMoneyEl, otherDollarEl, priceEl].forEach((input) => {
  input.addEventListener("input", updateResult);
});

setFace(selectedGender);
setTestPanel(selectedGender);
updateResult();

if (generateLinkEl && friendNameEl && friendGuessEl && shareOutputEl) {
  generateLinkEl.addEventListener("click", () => {
    const name = encodeURIComponent(friendNameEl.value.trim() || "friend");
    const guess = encodeURIComponent(friendGuessEl.value || "7500");
    const url = `${window.location.origin}${window.location.pathname}?friend=${name}&guess=${guess}`;
    shareOutputEl.innerHTML = `Share this link: <a href="${url}">${url}</a>`;
  });
}
