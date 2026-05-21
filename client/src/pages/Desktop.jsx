import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Window from '../components/Window';
import { Folder, FileText, Send, LogOut, BarChart2, Plus } from 'lucide-react';
import api from '../services/api';
import DreamEditor from './DreamEditor';
import DreamGraph from './DreamGraph';

const Desktop = () => {
  const { user, logout } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);

  useEffect(() => {
    fetchDreams();
  }, []);

  const fetchDreams = async () => {
    try {
      const res = await api.get('/dreams');
      setDreams(res.data.data.dreams);
    } catch (err) {
      console.error('Failed to fetch dreams:', err);
    }
  };

  const openWindow = (id, title, content) => {
    if (windows.find(w => w.id === id)) {
      setActiveWindow(id);
      return;
    }
    setWindows([...windows, { id, title, content }]);
    setActiveWindow(id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  return (
    <div className="desktop">
      {/* Desktop Icons */}
      <div className="desktop-icon" onClick={() => openWindow('new-dream', 'New Dream', <DreamEditor onSave={() => { fetchDreams(); closeWindow('new-dream'); }} />)}>
        <Plus size={40} color="var(--accent-primary)" />
        <span>New Dream</span>
      </div>

      <div className="desktop-icon" onClick={() => openWindow('graph', 'Dream Insights', <DreamGraph dreams={dreams} />)}>
        <BarChart2 size={40} color="var(--accent-secondary)" />
        <span>Analytics</span>
      </div>

      {dreams.map(dream => (
        <div key={dream._id} className="desktop-icon" onClick={() => openWindow(dream._id, dream.title, <DreamEditor dream={dream} onSave={() => { fetchDreams(); closeWindow(dream._id); }} />)}>
          <FileText size={40} />
          <span>{dream.title}</span>
        </div>
      ))}

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
          {win.content}
        </Window>
      ))}

      {/* Dock */}
      <div className="dock glass">
        <div className="dock-icon" onClick={() => openWindow('new-dream', 'New Dream', <DreamEditor onSave={() => { fetchDreams(); closeWindow('new-dream'); }} />)}>
          <Plus size={24} />
        </div>
        <div className="dock-icon" onClick={() => openWindow('graph', 'Dream Insights', <DreamGraph dreams={dreams} />)}>
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
