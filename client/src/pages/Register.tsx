import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // O endpoint do seu backend deve ser /auth/register
      await api.post('/auth/register', formData);
      alert('Treinador registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Erro no cadastro. Tente outro username.');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Criar Conta</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input 
              name="name" 
              placeholder="Nome de Treinador" 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="input-group">
            <input 
              name="username" 
              placeholder="Username (ex: ash_ketchum)" 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="input-group">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="input-group">
            <input 
              name="password" 
              type="password" 
              placeholder="Senha secreta" 
              onChange={handleChange} 
              required
            />
          </div>

          <button type="submit" className="btn-auth">Começar Jornada</button>
        </form>

        <div className="auth-footer">
          <p>Já tem uma conta? 
            <Link to="/login" className="auth-link">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}