import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Window from '../components/Window';
import { Folder, FileText, Send, LogOut, BarChart2, Plus } from 'lucide-react';
import api from '../services/api';
import DreamEditor from './DreamEditor';
import DreamGraph from './DreamGraph';
import { motion } from 'framer-motion';

const Desktop = () => {
  const { user, logout } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDreams();
  }, []);

  const fetchDreams = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dreams');
      setDreams(res.data.data.dreams);
    } catch (err) {
      console.error('Failed to fetch dreams:', err);
    } finally {
      setLoading(false);
    }
  };

  const openWindow = (id, title, type, data = {}) => {
    if (windows.find(w => w.id === id)) {
      setActiveWindow(id);
      return;
    }
    setWindows([...windows, { id, title, type, data }]);
    setActiveWindow(id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const renderWindowContent = (win) => {
    switch (win.type) {
      case 'editor':
        const dream = dreams.find(d => d._id === win.id);
        return <DreamEditor dream={dream} onSave={() => { fetchDreams(); closeWindow(win.id); }} />;
      case 'new-dream':
        return <DreamEditor onSave={() => { fetchDreams(); closeWindow('new-dream'); }} />;
      case 'graph':
        return <DreamGraph dreams={dreams} />;
      default:
        return null;
    }
  };

  return (
    <div className="desktop">
      {/* Desktop Icons */}
      {loading ? (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid var(--accent-primary)', borderRadius: '50%' }}
          />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ color: 'var(--text-secondary)', fontSize: '14px', letterSpacing: '1px' }}
          >
            Loading dream files...
          </motion.span>
        </div>
      ) : (
        <>
          <div className="desktop-icon" onClick={() => openWindow('new-dream', 'New Dream', 'new-dream')}>
            <Plus size={40} color="var(--accent-primary)" />
            <span>New Dream</span>
          </div>

          <div className="desktop-icon" onClick={() => openWindow('graph', 'Dream Insights', 'graph')}>
            <BarChart2 size={40} color="var(--accent-secondary)" />
            <span>Analytics</span>
          </div>

          {dreams.map(dream => (
            <div key={dream._id} className="desktop-icon" onClick={() => openWindow(dream._id, dream.title, 'editor')}>
              <FileText size={40} />
              <span>{dream.title}</span>
            </div>
          ))}
        </>
      )}

      {/* Windows */}
      {windows.map((win, index) => (
        <Window 
          key={win.id}
          id={win.id}
          title={win.title}
          isOpen={true}
          onClose={closeWindow}
          zIndex={activeWindow === win.id ? 100 : 10 + index}
          onClick={() => setActiveWindow(win.id)}
        >
          {renderWindowContent(win)}
        </Window>
      ))}

      {/* Dock */}
      <div className="dock glass">
        <div className="dock-icon" onClick={() => openWindow('new-dream', 'New Dream', 'new-dream')}>
          <Plus size={24} />
        </div>
        <div className="dock-icon" onClick={() => openWindow('graph', 'Dream Insights', 'graph')}>
          <BarChart2 size={24} />
        </div>
        <div style={{ flex: 1 }} />
        <div className="dock-icon" onClick={logout} style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <LogOut size={24} color="#ef4444" />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
