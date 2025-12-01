# 🃏 DeckDex - Pokémon TCG Builder

![Project Status](https://img.shields.io/badge/status-in_development-orange) ![License](https://img.shields.io/badge/license-MIT-blue)

**DeckDex** is a modern web application designed for Pokémon TCG players and collectors. The platform allows users to manage their digital collections and build competitive decks with the aid of data-driven insights.

The project consumes the [Pokémon TCG API](https://pokemontcg.io/) to provide real-time data on cards, market prices, and high-resolution imagery.

> 🚧 **Current Status:** In Development (Sprint 1 of 4)

## 📸 Screenshots
*(TODO: Add a screenshot of application here)*

## ✨ Key Features

- 🔍 **Card Explorer:** Advanced search functionality filtering by name, type, rarity, and sets, featuring optimized pagination.
- 📦 **Collection Manager:** A persistent system allowing users to track their physical card inventory (Backend integration).
- 🛠️ **Interactive Deck Builder:** A "Drag & Drop" interface for intuitive deck construction, including real-time validation of official rules (60-card limit, max 4 copies).
- 📊 **Analytics (Coming Soon):** Data visualization for deck analysis, including Mana Curve, Type Distribution, and estimated financial cost.

## 🚀 Tech Stack

This project was built to demonstrate proficiency in modern Front-end development and API integration.

**Frontend:**
- **React.js (Vite):** For building a fast, reactive user interface.
- **Tailwind CSS:** For rapid, utility-first styling and responsive design.
- **Axios:** For efficient HTTP requests and interceptor handling.
- **DnD Kit / React-DnD:** For smooth drag-and-drop interactions.
- **Chart.js:** For data visualization and analytics.

**Backend & Services:**
- **Pokémon TCG API:** External data source.
- **Supabase/Firebase:** (To be defined) For authentication and database management.

## ⚙️ Getting Started

Follow these steps to run the project locally:

1. **Clone the repository:**
```bash
git clone [https://github.com/vfranceline/DeckDex.git](https://github.com/vfranceline/DeckDex.git)
````

2.  **Navigate to the project directory:**

<!-- end list -->

```bash
cd DeckDex
```

3.  **Install dependencies:**

<!-- end list -->

```bash
npm install
# or
yarn install
```

4.  **Environment Setup:**
    Create a `.env` file in the root directory and add your API Key (get one at pokemontcg.io):

<!-- end list -->

```env
VITE_POKEMON_API_KEY=your_api_key_here
```

5.  **Run the development server:**

<!-- end list -->

```bash
npm run dev
```

## 📚 Key Learnings & Challenges

*(TODO: Update this section as progressing)*

  - **API Integration:** Handling complex JSON structures, pagination, and API rate limits.
  - **State Management:** Managing global application state (deck vs. collection) using React Context or Zustand.
  - **Performance:** Optimizing the rendering of large lists of high-quality images.

## 🗺️ Roadmap

  - [x] **Sprint 1:** API Integration & Card Explorer (Current)
  - [ ] **Sprint 2:** User Authentication & Collection Database
  - [ ] **Sprint 3:** Deck Builder Logic & Drag-and-Drop
  - [ ] **Sprint 4:** Analytics Dashboard & Final Polish

## 🤝 Author

**Vitoria Matos**

  - [LinkedIn](https://www.linkedin.com/in/vit%C3%B3ria-franceline-matos/)

-----

*This project is for educational purposes only and is not affiliated with The Pokémon Company.*
