# 🧨 Minesweeper (Vanilla JavaScript)

A classic **Minesweeper game built using pure HTML, CSS, and JavaScript**, inspired by the original Windows Minesweeper.

This project focuses on **DOM manipulation, game logic, and algorithmic thinking** without using any frameworks or libraries.

---

## 🎮 Features

- Three difficulty levels:
  - **Easy**: 8 × 8 grid, 10 mines
  - **Medium**: 16 × 16 grid, 40 mines
  - **Hard**: 16 × 30 grid, 99 mines
- First click is always safe
- Recursive flood-fill reveal for empty cells
- Right-click to place/remove flags
- Mine counter & flag counter
- Game timer
- Pause / Resume functionality
- Restart button
- Pixel-style UI using Minecraft font
- Classic Minesweeper grid background

---

## 🛠 Tech Stack

- **HTML**
- **CSS**
- **Vanilla JavaScript**

No frameworks, no libraries.

---

## 🧠 Core Concepts Used

- DOM traversal & manipulation
- Event handling (`click`, `contextmenu`)
- Breadth-First Search (BFS) for cell reveal
- Game state tracking
- Timers (`setInterval`)
- CSS animations

---

## 📂 Project Structure
.
├── index.html
├── easy.html
├── medium.html
├── hard.html
├── game.css
└── game.js

Each difficulty page loads the same logic with different grid configurations.

---



