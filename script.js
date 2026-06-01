const quizData = [{
        question: "Which of the following is a JavaScript data type?",
        a: "Number",
        b: "Float",
        c: "Decimal",
        d: "Character",
        correct: "a"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        a: "var",
        b: "int",
        c: "string",
        d: "define",
        correct: "a"
    },
    {
        question: "Which method is used to print something in the console?",
        a: "print()",
        b: "log()",
        c: "console.log()",
        d: "echo()",
        correct: "c"
    },
    {
        question: "What is the correct syntax to create a function in JavaScript?",
        a: "function = myFunc()",
        b: "function myFunc()",
        c: "create function myFunc()",
        d: "func myFunc()",
        correct: "b"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        a: "#",
        b: "//",
        c: "<!--",
        d: "/* */",
        correct: "b"
    },
    {
        question: "What will typeof null return?",
        a: "object",
        b: "null",
        c: "undefined",
        d: "number",
        correct: "a"
    },
    {
        question: "Which of the following is NOT a JavaScript loop?",
        a: "for",
        b: "while",
        c: "foreach",
        d: "loop",
        correct: "d"
    },
    {
        question: "How do you convert a string to an integer in JavaScript?",
        a: "parseInt()",
        b: "Number()",
        c: "+string",
        d: "All of the above",
        correct: "d"
    },
    {
        question: "Which array method adds an element to the END of an array?",
        a: "push()",
        b: "pop()",
        c: "shift()",
        d: "unshift()",
        correct: "a"
    },
    {
        question: "What does === check in JavaScript?",
        a: "Only value",
        b: "Only type",
        c: "Value and type",
        d: "Neither",
        correct: "c"
    },
    {
        question: "Which method removes the last element from an array?",
        a: "push()",
        b: "pop()",
        c: "splice()",
        d: "slice()",
        correct: "b"
    },
    {
        question: "What is the output of: console.log(2 + '3')?",
        a: "5",
        b: "23",
        c: "NaN",
        d: "Error",
        correct: "b"
    },
];

// ── DOM References ──
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const backBtn = document.getElementById("backBtn");
const progressFill = document.getElementById("progressFill");
const qCounter = document.getElementById("qCounter");
const qNum = document.getElementById("qNum");
const quizCard = document.getElementById("quizCard");
const dotRow = document.getElementById("dotRow");

// ── State ──
let currentQuiz = 0;
const userAnswers = new Array(quizData.length).fill(null);

// ── Build dot indicators ──
quizData.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "q-dot";
    dot.id = `dot-${i}`;
    dotRow.appendChild(dot);
});

// ── Init ──
loadQuiz();

// ── Load question ──
function loadQuiz() {
    const q = quizData[currentQuiz];
    questionEl.innerText = q.question;
    a_text.innerText = q.a;
    b_text.innerText = q.b;
    c_text.innerText = q.c;
    d_text.innerText = q.d;
    qNum.innerText = currentQuiz + 1;
    qCounter.innerText = `${currentQuiz + 1} / ${quizData.length}`;
    progressFill.style.width = `${(currentQuiz / quizData.length) * 100}%`;
    submitBtn.innerText = currentQuiz === quizData.length - 1 ? "Finish ✓" : "Next →";
    backBtn.disabled = currentQuiz === 0;

    // Restore saved answer
    deselectAnswers();
    if (userAnswers[currentQuiz]) {
        const saved = document.getElementById(userAnswers[currentQuiz]);
        if (saved) saved.checked = true;
    }

    updateDots();
}

// ── Helpers ──
function deselectAnswers() {
    answerEls.forEach(el => (el.checked = false));
}

function getSelected() {
    let answer = null;
    answerEls.forEach(el => {
        if (el.checked) answer = el.id;
    });
    return answer;
}

function updateDots() {
    quizData.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        dot.className = "q-dot";
        if (i === currentQuiz) dot.classList.add("current");
        else if (userAnswers[i]) dot.classList.add("answered");
    });
}

// ── Save on selection ──
answerEls.forEach(el => {
    el.addEventListener("change", () => {
        userAnswers[currentQuiz] = el.id;
        updateDots();
    });
});

// ── Next / Finish ──
submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (!answer) {
        submitBtn.style.background = "#ef4444";
        submitBtn.innerText = "Pick an answer!";
        setTimeout(() => {
            submitBtn.style.background = "";
            submitBtn.innerText = currentQuiz === quizData.length - 1 ? "Finish ✓" : "Next →";
        }, 1000);
        return;
    }
    userAnswers[currentQuiz] = answer;
    if (currentQuiz < quizData.length - 1) {
        currentQuiz++;
        loadQuiz();
    } else {
        showResult();
    }
});

// ── Back button ──
backBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) userAnswers[currentQuiz] = answer;
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    }
});

// ── Show Result ──
function showResult() {
    let score = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === quizData[i].correct) score++;
    });

    progressFill.style.width = "100%";
    dotRow.style.display = "none";

    const pct = Math.round((score / quizData.length) * 100);
    const wrong = quizData.length - score;

    let emoji, title, rankLabel, rankColor, ringColor;
    if (pct === 100) {
        emoji = "🏆";
        title = "Perfect Score!";
        rankLabel = "🥇 Expert";
        rankColor = "#fbbf2433";
        ringColor = "#fbbf24";
    } else if (pct >= 80) {
        emoji = "🎉";
        title = "Excellent Work!";
        rankLabel = "🥈 Advanced";
        rankColor = "#22c55e33";
        ringColor = "#22c55e";
    } else if (pct >= 60) {
        emoji = "👍";
        title = "Good Job!";
        rankLabel = "🥉 Intermediate";
        rankColor = "#3b82f633";
        ringColor = "#3b82f6";
    } else if (pct >= 40) {
        emoji = "📚";
        title = "Keep Practicing!";
        rankLabel = "📖 Beginner";
        rankColor = "#fbbf2433";
        ringColor = "#fbbf24";
    } else {
        emoji = "💪";
        title = "Don't Give Up!";
        rankLabel = "🔁 Try Again";
        rankColor = "#ef444433";
        ringColor = "#ef4444";
    }

    const circumference = 339;
    const offset = circumference - (pct / 100) * circumference;

    quizCard.innerHTML = `
    <div class="result-screen">
      <span class="result-emoji">${emoji}</span>
      <div class="result-title">${title}</div>
      <p class="result-sub">You've completed the JavaScript Quiz.<br/>Here's how you did:</p>
      <div class="score-ring-wrap">
        <div class="score-ring">
          <svg width="130" height="130" viewBox="0 0 120 120">
            <circle class="score-ring-bg" cx="60" cy="60" r="54"/>
            <circle class="score-ring-fill" id="ringFill" cx="60" cy="60" r="54"
              stroke="${ringColor}" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"/>
          </svg>
          <div class="score-ring-text">
            <div class="score-num">${pct}%</div>
            <div class="score-denom">${score}/${quizData.length}</div>
          </div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat-box">
          <div class="stat-val" style="color:#22c55e">${score}</div>
          <div class="stat-label">Correct</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#ef4444">${wrong}</div>
          <div class="stat-label">Wrong</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:#3b82f6">${quizData.length}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>
      <div class="rank-badge" style="background:${rankColor};color:var(--text);border:1px solid ${ringColor}44;">${rankLabel}</div><br/>
      <button class="btn-reload" onclick="location.reload()">🔄 Try Again</button>
    </div>
  `;

    setTimeout(() => {
        const ring = document.getElementById("ringFill");
        if (ring) ring.style.strokeDashoffset = offset;
    }, 100);

    if (pct >= 60) spawnConfetti();
}

// ── Confetti ──
function spawnConfetti() {
    const colors = ["#3b82f6", "#22c55e", "#fbbf24", "#f472b6", "#a78bfa", "#60a5fa"];
    for (let i = 0; i < 40; i++) {
        const dot = document.createElement("div");
        dot.className = "confetti-dot";
        dot.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 1}s;
      width: ${5 + Math.random() * 8}px;
      height: ${5 + Math.random() * 8}px;
    `;
        document.body.appendChild(dot);
        dot.addEventListener("animationend", () => dot.remove());
    }
}
