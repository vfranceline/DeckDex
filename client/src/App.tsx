// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home'; // Sua antiga Landing Page agora vive aqui

// Componente para proteger rotas (Opcional por enquanto)
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* A rota raiz "/" agora carrega a sua página Home bonita */}
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Exemplo: Se quiser uma rota protegida de Dashboard no futuro */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              {/* Você pode criar uma pagina Dashboard.tsx depois ou reusar a Home */}
              <Home /> 
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;