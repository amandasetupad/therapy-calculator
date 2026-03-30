/* global anime, confetti */

(function () {
  const textBox = document.getElementById("text");
  const billLine = document.getElementById("reveal-bill-line");
  const countdown = document.querySelector(".ml4");
  const formatted = sessionStorage.getItem("therapyRevealFormatted");

  function fillBillLine(amountText) {
    billLine.textContent = "";
    const intro = document.createElement("span");
    intro.textContent = "Your hilariously inflated bill:";
    const br = document.createElement("br");
    const strong = document.createElement("strong");
    strong.style.fontSize = "1.2em";
    strong.textContent = amountText;
    billLine.appendChild(intro);
    billLine.appendChild(br);
    billLine.appendChild(strong);
  }

  function startTwerk() {
    ["#ass", "#hand1", "#hand2", "#ey2"].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) el.style.animationPlayState = "running";
    });
  }

  function runConfetti() {
    const colors = ["#FFD700", "#22c55e", "#a855f7", "#fbbf24", "#ffffff", "#6366f1"];
    const end = Date.now() + 9000;

    if (typeof confetti === "function") {
      confetti({
        particleCount: 110,
        spread: 88,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.32 },
        colors
      });
    }

    function frame() {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 80,
          origin: { x: 0.12, y: 0.58 },
          colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 80,
          origin: { x: 0.88, y: 0.58 },
          colors
        });
      }
      if (Date.now() < end) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function startCelebration() {
    if (countdown) countdown.style.opacity = "0";
    if (countdown) countdown.style.pointerEvents = "none";
    textBox.style.display = "block";
    textBox.style.opacity = "0";
    textBox.style.transition = "opacity 0.65s ease";
    requestAnimationFrame(() => {
      textBox.style.opacity = "1";
    });
    startTwerk();
    runConfetti();
  }

  if (!formatted) {
    if (countdown) countdown.style.display = "none";
    billLine.textContent = "No bill here yet — take the quiz first!";
    textBox.style.display = "block";
    textBox.style.opacity = "1";
    return;
  }

  fillBillLine(formatted);

  const ml4 = {
    opacityIn: [0, 1],
    scaleIn: [0.2, 1],
    scaleOut: 3,
    durationIn: 800,
    durationOut: 600,
    delay: 500
  };

  if (typeof anime !== "undefined" && typeof anime.timeline === "function") {
    anime
      .timeline({ loop: false, complete: startCelebration })
      .add({
        targets: ".ml4 .letters-1",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      })
      .add({
        targets: ".ml4 .letters-1",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      })
      .add({
        targets: ".ml4 .letters-2",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      })
      .add({
        targets: ".ml4 .letters-2",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      })
      .add({
        targets: ".ml4 .letters-3",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      })
      .add({
        targets: ".ml4 .letters-3",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      })
      .add({
        targets: ".ml4",
        opacity: 0,
        duration: 500,
        delay: 500
      });
  } else if (countdown) {
    countdown.style.display = "none";
    setTimeout(startCelebration, 400);
  }
})();
