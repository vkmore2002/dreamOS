const DreamGraph = ({ dreams }) => {
  const moodCounts = dreams.reduce((acc, d) => {
    acc[d.mood] = (acc[d.mood] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(moodCounts), 1);

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Lucidity vs Mood Analysis</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.entries(moodCounts).map(([mood, count]) => (
          <div key={mood}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span>{mood}</span>
              <span>{count} dreams</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${(count / maxCount) * 100}%`, 
                  background: mood === 'Terrifying' ? '#ef4444' : 'var(--accent-primary)',
                  transition: 'width 1s ease-out' 
                }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <strong>DreamOS Insight:</strong> Your most frequent dream state is 
          <span style={{ color: 'var(--accent-primary)' }}> {Object.keys(moodCounts)[0] || 'Unknown'}</span>. 
          The average lucidity score is 
          <span style={{ color: 'var(--accent-secondary)' }}> {(dreams.reduce((a, b) => a + b.lucidityScore, 0) / (dreams.length || 1)).toFixed(1)}</span>.
        </p>
      </div>
    </div>
  );
};

export default DreamGraph;
