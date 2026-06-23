# 🌟 The Super App

**The Super App** is a high-fidelity, multi-feature React dashboard application. It consolidates several daily utilities (checking the weather, reading the news, managing sticky notes, running countdown timers, and getting movie recommendations) into a single, cohesive, and premium dark-themed interface built from scratch without external UI component libraries.

---

## 🚀 Key Features

### 1. Form-Validated Registration
* **Interactive Form Panel**: Split-pane registration banner featuring custom-validated inputs.
* **Resilient Schema Constraints**: Ensures strict client-side verification:
  * **Name**: Required, strictly alphabetic checks.
  * **Username**: Required, alphanumeric checks (no whitespace).
  * **Email**: Validated against typical RFC formatting schemas.
  * **Mobile**: Encompasses exactly 10 digital characters.
  * **Terms Agreement**: Requires explicit checkbox confirmation to sign up.

### 2. Gated Category Selection
* **Genre Selector**: Interactive grid of 8 entertainment genres (Action, Comedy, Drama, Music, Sports, Thriller, Fantasy, and Romance).
* **Validation Gating**: The "Next Page" trigger remains conditionally locked and disabled until **at least 3 categories** are selected.
* **Dismisable Chips**: Interactive pill tokens display chosen categories and support immediate dismissal.

### 3. Responsive Dashboard Grid
* **User Profile**: Summarizes details (name, email, handle) alongside selected category pills and a user avatar.
* **Live Weather Widget**: Integrates OpenWeatherMap using coordinates (via Geolocation APIs) with a resilient 3000ms timeout fallback to London. Displays temperature, pressure, wind speed, humidity, and condition description.
* **Auto-Rotating News Feed**: Fetches real-time headlines and rotates articles every **2 seconds** using clean hook intervals, avoiding text overflows or visual layouts breaks.
* **Interactive Notes Widget**: Custom sticky-note memo editor that automatically synchronizes and persists entries directly into the browser's `localStorage` on keypress.
* **Circular Countdown Timer**: Renders a premium, smooth SVG progress ring with precise play, pause, resume, and reset logic. Plays an acoustic synthesizer alarm via the **Web Audio API** when the timer expires.

### 4. Entertainment Recommendations
* **Categorized Movie Rows**: Dynamically compiles a horizontal layout of movie cards matching each selected genre.
* **Interactive Card Transitions**: High-fidelity $1.05\times$ scale zoom transitions and drop-shadows on hover.
* **Movie Specs Modal**: Clicking a card fetches detailed film metadata from the OMDB API, displaying runtime, ratings, directors, cast lists, and plot summaries.

---

## 🛠️ Technology Stack
* **Core**: React (Vite-powered, ES6+)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with LocalStorage state hydration)
* **Routing**: [React Router DOM v7](https://github.com/remix-run/react-router) (equipped with route guards)
* **API Layer**: Axios (built-in mock-data fallback layers for offline reliability)
* **Icons**: Lucide React
* **Styling**: Vanilla CSS (Premium dark mode with glassmorphic cards and hardware-accelerated animations)

---

## ⚙️ Setup & Installation

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/psp2535/Super_app.git

# Navigate into project directory
cd Super_app

# Install package dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root directory and add your API keys:
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_NEWS_API_KEY=your_newsapi_org_key
VITE_OMDB_API_KEY=your_omdb_api_key
```
*(Note: If no API keys are provided, the app will automatically fall back to high-fidelity mock-data, keeping the dashboard 100% functional out-of-the-box).*

### 3. Local Development Server
```bash
# Launch the local server
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` to run the application.

### 4. Production Build
```bash
# Compile project
npm run build
```
This generates optimized static files in the `/dist` directory, ready to deploy to static hosts like Vercel, Netlify, or GitHub Pages.
