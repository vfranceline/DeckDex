import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importante para navegação
import { useAuth } from '../contexts/AuthContext'; // Para saber se já está logado
import '../App.css';

export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook de navegação
  const { user, signOut } = useAuth(); // Dados do usuário e função de sair

  // Mock Data: Translated to English
  const cardOfTheDay = { 
    id: 'sv8-226', 
    name: 'Tatsugiri ex', 
    supertype: 'Pokémon',
    hp: '120',
    types: ['Dragon'],
    image: 'https://images.pokemontcg.io/sv8/226_hires.png', 
    // Official English flavor text or adaptation
    flavorText: "This small Pokémon tricks opponents by playing dead, only to strike back with surprising draconic power when they least expect it.",
    rarity: 'Illustration Rare' 
  };

  const worthyDecks = [
    { 
      id: 101, 
      name: 'Rain Dance Control', 
      user: 'ProWaterPlayer', 
      types: ['Water'], 
      description: 'Energy acceleration with Blastoise to freeze your opponent before they can react. Consistency: 9/10.' 
    },
    { 
      id: 102, 
      name: 'Voltage Beatdown', 
      user: 'GymLeaderZap', 
      types: ['Lightning', 'Fighting'], 
      description: 'Pure aggression. Utilize Electabuzz for early pressure and Hitmonchan to cover weaknesses.' 
    }
  ];

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">DeckDex</div>
        <div className="nav-links">
          <button className='btn-primary'>Create Deck</button>
          
          {user ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Link para o Perfil */}
                <span 
                onClick={() => navigate('/profile')} 
                style={{ 
                    color: '#fff', 
                    fontSize: '0.9rem', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderBottom: '1px solid transparent'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderBottom = '1px solid #8257e5'}
                onMouseOut={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
                >
                Olá, {user.username}
                </span>
                
                {/* Botão de Logout rápido (opcional, já tem no perfil) */}
                <button className="btn-text" onClick={signOut}>Sair</button>
            </div>
            ) : (
            <button className="btn-text" onClick={() => navigate('/login')}>Login</button>
            )}

        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          {/* Changed from "Domine o Meta" to something more epic */}
          <h1>Forge Your Ultimate Deck</h1>
          <p>
            The definitive platform for TCG enthusiasts. Discover winning strategies, 
            analyze top-tier builds, and share your creations with the world.
          </p>
          
          <div className="search-bar-container">
            <input 
              type="text" 
              placeholder="Search for a card (e.g., Gengar)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="btn-search">Search</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        
        {/* Main Grid Section */}
        <section className="section-container content-grid">
          
          {/* Card of the Day */}
          <div className="card-day-wrapper">
            <h2 className="section-title">Card Of The Day</h2>
            <div className="card-day-container">
              <div className="card-day-image-wrapper">
                <img src={cardOfTheDay.image} alt={cardOfTheDay.name} className="card-img" />
                <div className="shine-effect"></div>
              </div>
              <div className="card-day-details">
                <span className="rarity-badge">{cardOfTheDay.rarity}</span>
                <h3>{cardOfTheDay.name}</h3>
                
                <div className="card-stats">
                  <div className="stat-pill">
                    <small>HP</small> <strong>{cardOfTheDay.hp}</strong>
                  </div>
                  <div className="stat-pill">
                    <small>Type</small> 
                    <strong className={`type-text ${cardOfTheDay.types[0].toLowerCase()}`}>
                      {cardOfTheDay.types.join('/')}
                    </strong>
                  </div>
                </div>

                <p className="flavor-text">"{cardOfTheDay.flavorText}"</p>
                <button className="btn-outline">View Full Analysis</button>
              </div>
            </div>
          </div>

          {/* Top Decks (formerly "Baralhos do Meta") */}
          <div className="worthy-decks-wrapper">
            {/* New Title: Less "gamey", more professional */}
            <h2 className="section-title">Competitive Decks</h2>
            <div className="worthy-list">
              {worthyDecks.map((deck) => (
                <div key={deck.id} className="worthy-card">
                  <div className="worthy-content">
                    <div className="worthy-header">
                      <h4>{deck.name}</h4>
                      <div className="deck-types-mini">
                        {deck.types.map(t => (
                          <span key={t} className={`dot-type ${t.toLowerCase()}`} title={t}></span>
                        ))}
                      </div>
                    </div>
                    <p className="deck-desc">{deck.description}</p>
                    <span className="user-credit">Created by <strong>{deck.user}</strong></span>
                  </div>
                  <div className="arrow-icon">&rarr;</div>
                </div>
              ))}
            </div>
            <button className="btn-link">View Full Rankings &rarr;</button>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          
          <div className="footer-section">
            <h3 className="footer-logo">DeckDex</h3>
            <p>
              Build, share, and evolve. Your journey to becoming a Pokémon Master starts here.
            </p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#">Card Database</a></li>
              <li><a href="#">Deck Builder</a></li>
              <li><a href="#">Tournaments</a></li>
              <li><a href="#">Login / Register</a></li>
            </ul>
          </div>

          {/* Developer Profile */}
          <div className="footer-section">
            <h4>Meet the Developer</h4>
            <div className="dev-profile">
              <img src="https://github.com/vfranceline.png" alt="Vitoria Franceline" className="dev-avatar" />
              <div>
                <p className="dev-name">Vitoria Franceline</p>
                <p className="dev-desc">
                  Information Systems student at UNEB. Crafting solutions with code & creativity.
                </p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://github.com/vfranceline" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span className="separator">•</span>
              <a href="https://www.linkedin.com/in/vit%C3%B3ria-franceline-matos/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 DeckDex. Pokémon and its trademarks are ©1995-2024 Nintendo/Creatures Inc./GAME FREAK inc.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;