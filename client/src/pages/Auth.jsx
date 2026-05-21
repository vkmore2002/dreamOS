import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Auth = ({ isLogin }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }
      navigate('/desktop');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form glass">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', marginBottom: '15px' }}>
            <Sparkles size={32} color="var(--accent-primary)" />
          </div>
          <h2>{isLogin ? 'Welcome to DreamOS' : 'Initialize Consciousness'}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
            {isLogin ? 'Sign in to access your dream logs' : 'Create an account to begin recording'}
          </p>
        </div>

        {error && <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Username</label>
              <input 
                type="text" 
                value={formData.username} 
                onChange={e => setFormData({ ...formData, username: e.target.value })} 
                required 
              />
            </div>
          )}
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={formData.password} 
              onChange={e => setFormData({ ...formData, password: e.target.value })} 
              required 
            />
          </div>
          <button type="submit">{isLogin ? 'Sign In' : 'Create Account'}</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already initialized? "}
          <span 
            onClick={() => navigate(isLogin ? '/register' : '/login')} 
            style={{ color: 'var(--accent-primary)', cursor: 'pointer' }}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
