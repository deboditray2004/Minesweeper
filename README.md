# 🧨 Minesweeper (Vanilla JavaScript)

A classic **Minesweeper game built using pure HTML, CSS, and JavaScript**, inspired by the original Windows Minesweeper.

This project focuses on **DOM manipulation, game logic, and algorithmic thinking** without using any frameworks or libraries.

🔗 Live Demo: https://tickboxes.netlify.app
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

```text
├── index.html
├── easy.html
├── medium.html
├── hard.html
├── game.css
└── game.js
```

Each difficulty page loads the same logic with different grid configurations.

---


# 🧨 Minesweeper (React + Tailwind CSS)

A modern **React-based Minesweeper game**, rebuilt from a vanilla JavaScript implementation with a **component-driven architecture**, cleaner state management, and Tailwind CSS styling.

This version focuses on **scalability, maintainability, and modern frontend practices.**

🔗 Live Demo: https://tickboxes-react.netlify.app
---

## 🎮 Features

* **Dynamic Difficulty:** Custom grid sizes and mine counts via URL parameters.
* **First-Click Safety:** Logic ensures the first cell you click is never a mine.
* **Recursive Reveal:** Efficient flood-fill reveal using **Breadth-First Search (BFS)**.
* **Game Controls:** Flagging system, mine/flag counters, timer, and pause/resume functionality.
* **Retro Aesthetic:** Pixel-inspired UI utilizing custom Minecraft-style typography.
* **Responsive Layout:** Optimized for various screen sizes using Tailwind CSS.
* **Modern State:** Modular components with optimized React Hooks.

---

## 🛠 Tech Stack

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS (v4)
* **Routing:** React Router
* **Icons:** Lucide-React / Heroicons (if applicable)

---

## 🧠 Core Concepts

* **React Hooks:** Heavy use of `useState`, `useEffect`, `useRef`, and `useCallback` for game loops and timer logic.
* **Immutable State:** Ensuring grid updates follow React best practices to prevent side effects.
* **URL-Driven Config:** Using `useSearchParams` to allow bookmarkable difficulty settings.
* **Performance:** Optimized rendering using `React.memo` for individual cells to prevent unnecessary re-renders.

---

## 📂 Project Structure

```text
src/
├── Components/
│   ├── Home/      # Difficulty selection & Landing page
│   ├── Game/      # Main game controller & Logic
│   ├── Grid/      # Board rendering
│   ├── Cell/      # Individual square logic & styling
│   ├── Header/    # Stats (Timer, Mine count)
│   └── Footer/    # Game end msg
├── main.jsx       # Entry point
├── Layout.jsx     # Shared page wrapper
├── index.css      # Global styles & Tailwind imports
```

## 🌐 Routes

The game uses dynamic routing to set difficulty:

| Difficulty | Route |
| :--- | :--- |
| **Home** | `/` |
| **Easy** | `/game?rows=8&cols=8&mines=10` |
| **Medium** | `/game?rows=16&cols=16&mines=40` |
| **Hard** | `/game?rows=16&cols=30&mines=99` |

---

## 🆚 Comparison with Vanilla Version

| Feature | Vanilla JS | React + Tailwind |
| :---    | :---       | :---             |
| **Grid Generation** | Manual DOM manipulation | State-driven (declarative) |
| **Game State** | Stored in DOM attributes | Centralized React State + Refs |
| **Styling** | Standard CSS files | Utility-first Tailwind CSS |
| **Routing** | Separate HTML files | Client-side React Router |
| **Maintainability** | Medium (spaghetti potential) | High (modular components) |


