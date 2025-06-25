# ♟️ ChessLab

**ChessLab** is a modern Chess Analytics Dashboard that fetches and visualizes performance data from [Lichess](https://lichess.org) and [Chess.com](https://www.chess.com). Whether you're a casual player or serious improver, ChessLab helps you explore trends, track progress, and gain insight into your chess journey.

---

## 🧠 Features

- 📈 Visualize win/loss/draw statistics
- 🕹️ Separate analysis by game speed (blitz, rapid, bullet, etc.)
- 🏷️ Identify strengths and weaknesses by opening, opponent rating, or time control
- 🔍 Fetch and aggregate user data from **Lichess** and **Chess.com**
- ⚡ Fast and reactive UI using modern web technologies

---

## 🛠️ Tech Stack

### Frontend

- **React.js** – component-based UI
- **ShadCN UI** – clean, accessible design system
- **React Query** – data fetching and caching
- **TailwindCSS** – utility-first styling
- **Vite** – fast dev/build tooling

### Backend

- **FastAPI** – high-performance Python API framework
- **Async HTTP clients** to fetch external data
- **Typed routes** with Pydantic for schema validation

### DevOps

- **Docker** – containerized frontend and backend
- **Docker Compose** – manage and run the full stack
- **Built-in support** for local development and future deployment to cloud

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose installed
- (Optional) Lichess or Chess.com usernames you want to analyze

### Setup

```bash
git clone https://github.com/Chess-Chunks/chesslab.git
cd chesslab
docker-compose up --build
```