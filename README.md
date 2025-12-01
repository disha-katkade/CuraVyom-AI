# CuraVyom Pharmaceuticals - Agentic AI Platform

A high-fidelity, production-quality frontend for the "CuraVyom" Agentic AI Drug Repurposing platform. Built for the EY Techathon.

## 🚀 Features

- **Futuristic UI**: Neo-brutalism + Glassmorphism design system.
- **3D Hero Section**: Interactive particle field using Three.js.
- **Multi-Agent Visualization**: Animated graph showing Master Agent orchestration.
- **Live Dashboard**: Real-time charts and data visualization using Recharts.
- **Chat Interface**: Mockup of the multi-agent chat system.
- **Auto-Report**: Preview of generated PDF reports.

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion, Three.js (@react-three/fiber)
- **Icons**: Lucide-React
- **Charts**: Recharts
- **Routing**: React Router DOM

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)

### 0. Environment Setup

1.  Create a `.env` file in the root directory.
2.  Add your API keys:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
    ```

### 1. Frontend Setup

1.  Navigate to the project directory:
    ```bash
    cd /path/to/project
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

### 2. Backend Setup

1.  Open a new terminal window.
2.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Start the FastAPI backend:
    ```bash
    python3 -m backend.main
    ```
    The API will be available at `http://localhost:8000`.
    API Documentation (Swagger UI): `http://localhost:8000/docs`

### 3. Running the Full System

Ensure both terminals are running:

- Terminal 1: `npm run dev` (Frontend)
- Terminal 2: `python3 -m backend.main` (Backend)

Open your browser and navigate to `http://localhost:5173` to use the application.

## 🚢 Deployment

This project is ready for deployment on Vercel or Netlify.

### Vercel

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in the project root.
3.  Follow the prompts.

### Netlify

1.  Drag and drop the `dist` folder (after running `npm run build`) to Netlify Drop.

## 📂 Project Structure

```
src/
├── components/
│   ├── architecture/  # Architecture diagrams
│   ├── dashboard/     # Charts and Chat UI
│   ├── features/      # Feature cards and Terminal
│   ├── home/          # Landing page sections
│   ├── layout/        # Navbar and Footer
│   └── ui/            # Reusable UI components
├── pages/             # Page components
├── styles/            # Global styles
└── App.jsx            # Main application component
```
