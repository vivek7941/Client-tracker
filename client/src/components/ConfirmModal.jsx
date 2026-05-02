import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, clientName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel}>
          <X size={18} />
        </button>
        
        <div className="modal-icon">
          <AlertTriangle size={32} />
        </div>
        
        <h3 className="modal-title">Delete Client</h3>
        <p className="modal-message">
          Are you sure you want to delete <strong>"{clientName}"</strong>? This action cannot be undone.
        </p>
        
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
