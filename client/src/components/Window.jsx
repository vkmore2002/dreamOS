import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

const Window = ({ title, children, isOpen, onClose, zIndex, onClick, id }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={onClick}
      style={{ zIndex }}
      className="window glass"
    >
      <div className="window-header">
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{title}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Minus size={14} className="icon-btn" />
          <Square size={14} className="icon-btn" />
          <X 
            size={14} 
            className="icon-btn close" 
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }} 
            style={{ color: '#ef4444' }}
          />
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
