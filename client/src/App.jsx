import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './pages/Auth';
import Desktop from './pages/Desktop';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Initializating...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route 
            path="/desktop" 
            element={
              <PrivateRoute>
                <Desktop />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/desktop" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
