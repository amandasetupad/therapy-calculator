const chips = document.querySelectorAll(".chip");
const annualBillEl = document.getElementById("annual-bill");
const noteEl = document.getElementById("result-note");
const quizFieldsEl = document.getElementById("quiz-fields");
const revealBillEl = document.getElementById("reveal-bill");

const faceEl = document.getElementById("face");
const eyesEl = document.getElementById("eyes");
const faceCaptionEl = document.getElementById("face-caption");

const generateLinkEl = document.getElementById("generate-link");
const friendNameEl = document.getElementById("friend-name");
const friendGuessEl = document.getElementById("friend-guess");
const shareOutputEl = document.getElementById("share-output");
const selectedGenderLabelEl = document.getElementById("selected-gender-label");
const startTestBtnEl = document.getElementById("start-test-btn");

const GENDER_KEY = { male: "Male", female: "Female", other: "Other" };
const GENDER_ICON_SRC = {
  male: "./assets/gender-icons/male.png",
  female: "./assets/gender-icons/female.png",
  other: "./assets/gender-icons/other.png"
};
const isQuestionsPage = window.location.pathname.endsWith("/questions.html") || window.location.pathname.endsWith("questions.html");

let selectedSlug = "female";
let answers = {};
const urlGender = new URLSearchParams(window.location.search).get("gender");
if (urlGender && Object.prototype.hasOwnProperty.call(GENDER_KEY, urlGender)) {
  selectedSlug = urlGender;
}
if (isQuestionsPage && (!urlGender || !Object.prototype.hasOwnProperty.call(GENDER_KEY, urlGender))) {
  window.location.href = "./index.html";
}

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function setFace(genderSlug) {
  if (!faceEl || !eyesEl) return;
  faceEl.className = "face";
  eyesEl.className = "eyes";

  if (genderSlug === "male") {
    faceEl.classList.add("face-male");
    eyesEl.classList.add("eyes--basic");
    if (faceCaptionEl) faceCaptionEl.textContent = "Male mode: basic eyes";
  } else if (genderSlug === "female") {
    faceEl.classList.add("female");
    eyesEl.classList.add("eyes--heart");
    if (faceCaptionEl) faceCaptionEl.textContent = "Female mode: heart eyes";
  } else {
    faceEl.classList.add("face-other");
    eyesEl.classList.add("eyes--dollar");
    if (faceCaptionEl) faceCaptionEl.textContent = "They/Them mode: dollar-sign eyes";
  }
}

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return Math.abs(h);
}

function computeBill(genderKey, ans) {
  const base = hashString(genderKey + JSON.stringify(ans));
  const lo = 2800 + (base % 9000);
  const hi = lo + 4000 + (base % 12000);
  const jitter = Math.floor(Math.random() * (hi - lo));
  return lo + jitter;
}

function setAnswer(id, value) {
  answers = { ...answers, [id]: value };
}

function getQuestions() {
  const key = GENDER_KEY[selectedSlug];
  return (window.QUESTIONS_BY_GENDER && window.QUESTIONS_BY_GENDER[key]) || [];
}

function renderSelect(q) {
  const wrap = document.createElement("label");
  wrap.className = "quiz-field";
  wrap.innerHTML = `<span class="quiz-label">${q.text}</span>`;
  const sel = document.createElement("select");
  sel.dataset.qid = q.id;
  sel.innerHTML = `<option value="">Choose…</option>${q.options.map((o) => `<option value="${escape(o)}">${escape(o)}</option>`).join("")}`;
  sel.addEventListener("change", () => setAnswer(q.id, sel.value));
  wrap.appendChild(sel);
  return wrap;
}

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function renderRadio(q) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "quiz-field quiz-fieldset";
  fieldset.innerHTML = `<legend class="quiz-label">${q.text}</legend>`;
  const group = document.createElement("div");
  group.className = "radio-group";
  q.options.forEach((opt, idx) => {
    const id = `${q.id}-${idx}`;
    const lab = document.createElement("label");
    lab.className = "radio-row";
    lab.innerHTML = `<input type="radio" name="${q.id}" id="${id}" value="${escape(opt)}"/> <span>${escape(opt)}</span>`;
    const input = lab.querySelector("input");
    input.addEventListener("change", () => setAnswer(q.id, opt));
    group.appendChild(lab);
  });
  fieldset.appendChild(group);
  return fieldset;
}

function renderNumberInput(q) {
  const wrap = document.createElement("label");
  wrap.className = "quiz-field";
  wrap.innerHTML = `<span class="quiz-label">${q.text}</span>`;
  const inp = document.createElement("input");
  inp.type = "number";
  inp.min = "1";
  inp.max = "120";
  inp.placeholder = q.placeholder || "";
  inp.addEventListener("input", () => setAnswer(q.id, inp.value));
  wrap.appendChild(inp);
  return wrap;
}

function renderHeight(q) {
  const wrap = document.createElement("div");
  wrap.className = "quiz-field";
  wrap.innerHTML = `<span class="quiz-label">${q.text}</span>`;
  const row = document.createElement("div");
  row.className = "height-row";
  const val = document.createElement("input");
  val.type = "text";
  val.placeholder = "e.g. 5'10 or 180";
  const unit = document.createElement("select");
  unit.innerHTML = `<option value="ft">ft / in style</option><option value="cm">cm</option>`;
  const sync = () => setAnswer(q.id, { value: val.value, unit: unit.value });
  val.addEventListener("input", sync);
  unit.addEventListener("change", sync);
  row.appendChild(val);
  row.appendChild(unit);
  wrap.appendChild(row);
  return wrap;
}

function renderImageGrid(q) {
  const wrap = document.createElement("fieldset");
  wrap.className = "quiz-field quiz-fieldset";
  wrap.innerHTML = `<legend class="quiz-label">${q.text}</legend>`;
  const grid = document.createElement("div");
  grid.className = ["image-option-grid", q.imageGridClass].filter(Boolean).join(" ");
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "image-option";
    const label = opt.label || opt.value;
    const fallback = `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
        <rect width='100%' height='100%' fill='#eef2ff'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#4f46e5' font-family='Arial' font-size='18'>${String(label).slice(0, 16)}</text>
      </svg>`
    )}`;
    const imgEl = document.createElement("img");
    imgEl.alt = label;
    imgEl.loading = "eager";
    imgEl.referrerPolicy = "no-referrer";
    imgEl.onerror = () => {
      if (imgEl.src !== fallback) imgEl.src = fallback;
    };
    imgEl.src = opt.img || fallback;
    const textEl = document.createElement("span");
    textEl.textContent = label;
    btn.appendChild(imgEl);
    btn.appendChild(textEl);
    btn.addEventListener("click", () => {
      grid.querySelectorAll(".image-option").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      setAnswer(q.id, opt.value);
    });
    grid.appendChild(btn);
  });
  wrap.appendChild(grid);
  return wrap;
}

function renderSlider(q) {
  const wrap = document.createElement("label");
  wrap.className = "quiz-field";
  const suf = q.suffix ? ` ${q.suffix}` : "";
  wrap.innerHTML = `<span class="quiz-label">${q.text}</span>`;
  const row = document.createElement("div");
  row.className = "slider-row";
  const input = document.createElement("input");
  input.type = "range";
  input.min = String(q.min);
  input.max = String(q.max);
  input.value = String(q.defaultValue != null ? q.defaultValue : q.min);
  const out = document.createElement("output");
  out.textContent = input.value + suf;
  input.addEventListener("input", () => {
    out.textContent = input.value + suf;
    setAnswer(q.id, input.value);
  });
  setAnswer(q.id, input.value);
  row.appendChild(input);
  row.appendChild(out);
  wrap.appendChild(row);
  return wrap;
}

function renderSliderWithImages(q) {
  const wrap = document.createElement("div");
  wrap.className = "quiz-field";
  const rowImg = document.createElement("div");
  rowImg.className = "slider-images-row";
  const mkFallback = (text) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
        <rect width='100%' height='100%' fill='#f3f4f6'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#374151' font-family='Arial' font-size='14'>${text}</text>
      </svg>`
    )}`;
  const minSrc = q.minImageSrc || mkFallback("min");
  const maxSrc = q.maxImageSrc || mkFallback("max");
  const minImg = document.createElement("img");
  minImg.alt = "min";
  minImg.className = "slider-thumb-img";
  minImg.referrerPolicy = "no-referrer";
  minImg.loading = "eager";
  minImg.onerror = () => {
    const fb = mkFallback("min");
    if (minImg.src !== fb) minImg.src = fb;
  };
  minImg.src = minSrc;
  const maxImg = document.createElement("img");
  maxImg.alt = "max";
  maxImg.className = "slider-thumb-img";
  maxImg.referrerPolicy = "no-referrer";
  maxImg.loading = "eager";
  maxImg.onerror = () => {
    const fb = mkFallback("max");
    if (maxImg.src !== fb) maxImg.src = fb;
  };
  maxImg.src = maxSrc;
  rowImg.appendChild(minImg);
  rowImg.appendChild(maxImg);
  const lab = document.createElement("span");
  lab.className = "quiz-label";
  lab.textContent = q.text;
  const input = document.createElement("input");
  input.type = "range";
  input.min = String(q.min);
  input.max = String(q.max);
  input.value = String(q.defaultValue != null ? q.defaultValue : q.min);
  const out = document.createElement("output");
  out.className = "slider-output";
  out.textContent = input.value;
  input.addEventListener("input", () => {
    out.textContent = input.value;
    setAnswer(q.id, input.value);
  });
  setAnswer(q.id, input.value);
  wrap.appendChild(lab);
  wrap.appendChild(rowImg);
  wrap.appendChild(input);
  wrap.appendChild(out);
  return wrap;
}

function renderCheckboxGroup(q) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "quiz-field quiz-fieldset";
  const max = q.maxSelection;
  fieldset.innerHTML = `<legend class="quiz-label">${q.text}${max ? ` (max ${max})` : ""}</legend>`;
  const group = document.createElement("div");
  group.className = "checkbox-group";
  const selected = new Set();

  function sync() {
    setAnswer(q.id, [...selected]);
  }

  q.options.forEach((opt, idx) => {
    const id = `${q.id}-cb-${idx}`;
    const lab = document.createElement("label");
    lab.className = "radio-row";
    lab.innerHTML = `<input type="checkbox" id="${id}" value="${escape(opt)}"/> <span>${escape(opt)}</span>`;
    const input = lab.querySelector("input");
    input.addEventListener("change", () => {
      if (input.checked) {
        if (max && selected.size >= max) {
          input.checked = false;
          return;
        }
        selected.add(opt);
      } else {
        selected.delete(opt);
      }
      sync();
    });
    group.appendChild(lab);
  });
  fieldset.appendChild(group);
  setAnswer(q.id, []);
  return fieldset;
}

function renderQuiz() {
  if (!quizFieldsEl) return;
  quizFieldsEl.innerHTML = "";
  answers = {};
  const list = getQuestions();
  list.forEach((q) => {
    let el;
    switch (q.type) {
      case "select":
        el = renderSelect(q);
        break;
      case "radio":
        el = renderRadio(q);
        break;
      case "numberInput":
        el = renderNumberInput(q);
        break;
      case "heightInput":
        el = renderHeight(q);
        break;
      case "hairlineSelector":
      case "imageSelector":
        el = renderImageGrid(q);
        break;
      case "slider":
        el = renderSlider(q);
        break;
      case "sliderWithImages":
        el = renderSliderWithImages(q);
        break;
      case "checkboxGroup":
        el = renderCheckboxGroup(q);
        break;
      default:
        el = document.createElement("p");
        el.textContent = `Unsupported question type: ${q.type}`;
    }
    quizFieldsEl.appendChild(el);
  });
  if (annualBillEl) annualBillEl.textContent = "—";
  if (noteEl) noteEl.textContent = "Answer every question, then reveal your bill.";
}

function validateAnswers(list) {
  for (const q of list) {
    const v = answers[q.id];
    if (q.type === "checkboxGroup") {
      const min = q.minSelections != null ? q.minSelections : 0;
      if (min > 0 && (!Array.isArray(v) || v.length < min)) return q.text;
      continue;
    }
    if (v === undefined || v === "" || v === null) return q.text;
    if (q.type === "heightInput" && (!v.value || String(v.value).trim() === "")) return q.text;
  }
  return null;
}

chips.forEach((chip) => {
  if (!chip.dataset.gender) return;
  if (chip.dataset.gender === selectedSlug) {
    chip.classList.add("active");
  } else {
    chip.classList.remove("active");
  }
  chip.addEventListener("click", () => {
    if (isQuestionsPage) return;
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    selectedSlug = chip.dataset.gender || "female";
    if (quizFieldsEl) {
      const next = `${window.location.pathname}?gender=${selectedSlug}`;
      window.history.replaceState({}, "", next);
    }
    setFace(selectedSlug);
    renderQuiz();
  });
});

if (revealBillEl) {
  revealBillEl.addEventListener("click", () => {
    const list = getQuestions();
    const missing = validateAnswers(list);
    if (missing) {
      noteEl.textContent = `Please complete: ${missing}`;
      return;
    }
    const gk = GENDER_KEY[selectedSlug];
    annualBillEl.textContent = formatUsd(computeBill(gk, answers));
    noteEl.textContent = "This number is random fun — not real pricing or advice.";
  });
}

setFace(selectedSlug);
if (quizFieldsEl) {
  renderQuiz();
  if (selectedGenderLabelEl) {
    const iconSrc = GENDER_ICON_SRC[selectedSlug] || "";
    const label = GENDER_KEY[selectedSlug] || "";
    const img = iconSrc
      ? `<img class="gender-icon gender-icon--profile" src="${iconSrc}" width="36" height="36" alt="" />`
      : "";
    selectedGenderLabelEl.innerHTML = `<span class="selected-profile-row">${img}<span>${label}</span></span>`;
  }
  if (isQuestionsPage) {
    document.querySelectorAll(".chips .chip").forEach((el) => {
      el.setAttribute("aria-disabled", "true");
      el.classList.add("chip-disabled");
    });
  }
}

if (generateLinkEl && friendNameEl && friendGuessEl && shareOutputEl) {
  generateLinkEl.addEventListener("click", () => {
    const name = encodeURIComponent(friendNameEl.value.trim() || "friend");
    const guess = encodeURIComponent(friendGuessEl.value || "7500");
    const url = `${window.location.origin}${window.location.pathname}?friend=${name}&guess=${guess}`;
    shareOutputEl.textContent = "Share this link: ";
    const a = document.createElement("a");
    a.href = url;
    a.textContent = url;
    shareOutputEl.appendChild(a);
  });
}

if (startTestBtnEl && !isQuestionsPage) {
  startTestBtnEl.addEventListener("click", () => {
    window.location.href = `./questions.html?gender=${selectedSlug}`;
  });
}
