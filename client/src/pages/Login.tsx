import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css'; // Importa o estilo novo

export function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn({ identifier, password });
      navigate('/'); // Vai para a Home após logar
    } catch (error) {
      alert('Erro ao entrar. Verifique usuário e senha!');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Acessar DeckDex</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input 
              placeholder="Seu username" 
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Sua senha" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth">Entrar</button>
        </form>

        <div className="auth-footer">
          <p>Não tem conta? 
            <Link to="/register" className="auth-link">Crie agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
}