import { useState } from 'react';
import api from '../services/api';

const DreamEditor = ({ dream, onSave }) => {
  const [formData, setFormData] = useState(dream || {
    title: '',
    content: '',
    mood: 'Peaceful',
    lucidityScore: 1,
    tags: '',
    symbols: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags,
        symbols: typeof formData.symbols === 'string' ? formData.symbols.split(',').map(s => s.trim()) : formData.symbols,
      };

      if (dream?._id) {
        await api.patch(`/dreams/${dream._id}`, data);
      } else {
        await api.post('/dreams', data);
      }
      onSave();
    } catch (err) {
      alert('Error saving dream');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div className="input-group">
        <label>Dream Title</label>
        <input 
          value={formData.title} 
          onChange={e => setFormData({ ...formData, title: e.target.value })} 
          placeholder="What happened?"
          required
        />
      </div>

      <div className="input-group">
        <label>Mood</label>
        <select 
          value={formData.mood} 
          onChange={e => setFormData({ ...formData, mood: e.target.value })}
          className="glass"
          style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--glass-border)' }}
        >
          {['Peaceful', 'Anxious', 'Exciting', 'Terrifying', 'Confusing', 'Sad', 'Insightful'].map(m => (
            <option key={m} value={m} style={{ background: '#1e293b' }}>{m}</option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Content</label>
        <textarea 
          value={formData.content} 
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          style={{ width: '100%', minHeight: '150px', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--glass-border)', outline: 'none' }}
          placeholder="Describe your dream in detail..."
          required
        ></textarea>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Lucidity (1-10)</label>
          <input 
            type="number" 
            min="1" 
            max="10" 
            value={formData.lucidityScore} 
            onChange={e => setFormData({ ...formData, lucidityScore: parseInt(e.target.value) })} 
          />
        </div>
        <div className="input-group" style={{ flex: 2 }}>
          <label>Tags (comma separated)</label>
          <input 
            value={formData.tags} 
            onChange={e => setFormData({ ...formData, tags: e.target.value })} 
            placeholder="ocean, flying, house"
          />
        </div>
      </div>

      <button type="submit">Save Dream Record</button>
    </form>
  );
};

export default DreamEditor;
