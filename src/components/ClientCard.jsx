import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, AlertCircle, Phone, Calendar, DollarSign, FileText, Briefcase, Trash2, User, Building } from 'lucide-react';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';

const API_URL = '/api/clients';

const ClientCard = ({ client, onRefresh }) => {
  const navigate = useNavigate();

  const isOverdue = client.deadline && new Date(client.deadline) < new Date() && client.status !== 'Completed';

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return 'badge-medium';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'badge-new';
      case 'In Progress': return 'badge-progress';
      case 'Completed': return 'badge-completed';
      case 'On Hold': return 'badge-hold';
      default: return 'badge-new';
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${client._id}`);
      setShowDeleteModal(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to delete client', err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className={`client-card glass-panel ${isOverdue ? 'client-card-overdue' : ''}`}>
      {/* Overdue Banner */}
      {isOverdue && (
        <div className="overdue-banner">
          <AlertCircle size={14} />
          <span>Overdue</span>
        </div>
      )}

      {/* Header: Name + Badges */}
      <div className="client-header">
        <div className="client-title">
          <span className="detail-label"><User size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />Client Name</span>
          <h3>{client.name}</h3>
          {client.company && (
            <>
              <span className="detail-label" style={{ marginTop: '0.5rem' }}><Building size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />Company</span>
              <p>{client.company}</p>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span className={`badge ${getStatusBadge(client.status)}`}>{client.status}</span>
          <span className={`badge ${getPriorityBadge(client.priority)}`}>{client.priority}</span>
        </div>
      </div>

      {/* Service Tag */}
      {client.serviceType && (
        <div style={{ marginTop: '-0.25rem' }}>
          <span className="service-tag">
            <Briefcase size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {client.serviceType}
          </span>
        </div>
      )}

      {/* Details Grid */}
      <div className="client-details">
        {client.contactNumber && (
          <div className="detail-item">
            <span className="detail-label"><Phone size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />Contact</span>
            <span className="detail-value">{client.contactNumber}</span>
          </div>
        )}
        <div className="detail-item">
          <span className="detail-label"><DollarSign size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />Budget</span>
          <span className="detail-value">{client.budgetRange || '—'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label"><Calendar size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />Deadline</span>
          <span className={`detail-value ${isOverdue ? 'detail-overdue' : ''}`}>
            {formatDate(client.deadline) || 'No deadline'}
          </span>
        </div>
        {client.requirements && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <span className="detail-label"><FileText size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />Requirements</span>
            <span className="detail-value detail-text">{client.requirements}</span>
          </div>
        )}
      </div>

      {/* Notes */}
      {client.notes && (
        <div className="client-notes">
          <span className="detail-label" style={{ marginBottom: '0.3rem', display: 'block' }}>📝 Follow-up Notes</span>
          <p>{client.notes}</p>
        </div>
      )}

      {/* Footer Actions */}
      <div className="client-footer">
        <div></div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-danger" 
            style={{ padding: '0.4rem 0.7rem', fontSize: '0.85rem' }}
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 size={14} />
          </button>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            onClick={() => navigate(`/edit/${client._id}`)}
          >
            <Edit2 size={14} /> Edit
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        clientName={client.name}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default ClientCard;
