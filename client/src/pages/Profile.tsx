import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export function Profile() {
  const { user, signOut, deleteAccount } = useAuth(); // Certifique-se de pegar o deleteAccount aqui
  const navigate = useNavigate();

  const defaultAvatar = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png";

  function handleLogout() {
    signOut();
    navigate('/');
  }

  async function handleDeleteAccount() {
    const confirm = window.confirm("Tem certeza absoluta? Essa ação não pode ser desfeita e você perderá todos os seus baralhos.");
    
    if (confirm) {
      try {
        await deleteAccount();
        alert("Conta excluída.");
        navigate('/');
      } catch (error) {
        alert("Erro ao excluir conta. Tente novamente.");
      }
    }
  }

  if (!user) {
    return <div className="profile-container">Carregando dados do treinador...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        
        {/* Cabeçalho do Perfil */}
        <div className="trainer-card">
          <img 
            src={defaultAvatar} 
            alt="Avatar do Treinador" 
            className="trainer-avatar" 
          />
          <div className="trainer-info">
            <span className="trainer-badge">Treinador Verificado</span>
            <h1>{user.name}</h1>
            <div className="trainer-details">
              <p>@{user.username}</p>
              <p>{user.email}</p>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="btn-text" 
              style={{ marginTop: '1rem', padding: 0 }}
            >
              Sair da Conta (Logout)
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-number">0</span>
            <span className="stat-label">Baralhos Criados</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">#1</span>
            <span className="stat-label">Ranking Regional</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">0</span>
            <span className="stat-label">Torneios Vencidos</span>
          </div>
        </div>

        {/* Lista de Decks */}
        <div className="my-decks-section">
          <h2>Meus Baralhos</h2>
          <div className="empty-state">
            <p>Você ainda não montou nenhum baralho.</p>
            <button className="btn-primary" style={{ marginTop: '1rem' }}>
              Criar Novo Baralho
            </button>
          </div>
        </div>

        {/* Zona de Perigo - Novo Lugar para o Botão */}
        <div className="danger-zone">
            <h3>Zona de Perigo</h3>
            <p>A exclusão da sua conta é irreversível. Todos os seus dados serão perdidos.</p>
            <button 
                onClick={handleDeleteAccount}
                className="btn-danger"
            >
                Excluir minha conta
            </button>
        </div>

        <button onClick={() => navigate('/')} className="btn-link" style={{marginTop: '1rem'}}>
          &larr; Voltar para Home
        </button>

      </div>
    </div>
  );
}