# ⚡ JavaScript Quiz App

A clean, interactive JavaScript quiz application built with vanilla HTML, CSS, and JavaScript. Features a dark themed UI, back navigation, answer memory, and an animated result screen.

---

## 🚀 Features

- ✅ 12 JavaScript MCQ questions
- ✅ Back button — revisit and change previous answers
- ✅ Answer memory — selections saved per question
- ✅ Dot progress indicators (answered / current)
- ✅ Animated progress bar
- ✅ Result screen with score ring, stats, and rank badge
- ✅ Confetti animation for scores ≥ 60%
- ✅ No libraries or frameworks — pure HTML/CSS/JS

---

## 📁 Project Structure

```
quiz-app/
│
├── index.html       # Main HTML structure
├── style.css        # All styles (dark theme, animations)
├── script.js        # Quiz logic, navigation, scoring
└── README.md        # Project documentation
```

> In this project all HTML, CSS, and JS are combined in a single `quiz-app.html` file.

---

## 🛠️ How to Run

1. **Download** or clone the project
2. Open `quiz-app.html` in any browser
3. No installation or server needed — runs directly in the browser

```bash
# If using VS Code, simply open with Live Server
# Or just double-click quiz-app.html
```

---

## 🎮 How It Works

### Navigation
| Button | Action |
|--------|--------|
| `Next →` | Save answer and go to next question |
| `← Back` | Go to previous question (answer preserved) |
| `Finish ✓` | Appears on last question to submit quiz |

### Dot Indicators
| Dot State | Meaning |
|-----------|---------|
| 🔵 Glowing blue | Current question |
| 🔵 Solid blue | Already answered |
| ⚫ Grey | Not yet visited |

### Scoring
Score is calculated **only at the end** from all stored answers — so changing answers via the back button is fully reflected in the final score.

---

## 🏆 Rank System

| Score | Rank |
|-------|------|
| 100% | 🥇 Expert |
| 80% – 99% | 🥈 Advanced |
| 60% – 79% | 🥉 Intermediate |
| 40% – 59% | 📖 Beginner |
| Below 40% | 🔁 Try Again |

---

## 🧠 Quiz Topics Covered

- JavaScript data types
- Variable declarations (`var`, `let`, `const`)
- Console methods
- Function syntax
- Comments
- `typeof null` quirk
- Loops
- Type conversion
- Array methods 
- Strict equality
- Type coercion

---

## 🎨 Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure |
| CSS3 | Styling, animations, transitions |
| Vanilla JavaScript | Quiz logic, DOM manipulation |
| Google Fonts | Sora + JetBrains Mono |


---

## 👨‍💻 Author

Made with ❤️ by **Harikrishna Alwala**  
GitHub: [https://github.com/harikrishnaalvala/js-quizz-app](https://github.com/harikrishnaalvala/js-quizz-app)

---

