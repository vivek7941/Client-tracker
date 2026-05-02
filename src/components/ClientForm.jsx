import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';

const API_URL = '/api/clients';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contactNumber: '',
    requirements: '',
    budgetRange: '',
    status: 'New',
    deadline: '',
    priority: 'Medium',
    notes: '',
    serviceType: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchClient = async () => {
        try {
          const res = await axios.get(`${API_URL}/${id}`);
          const client = res.data.data;
          if (client) {
            if (client.deadline) {
              client.deadline = new Date(client.deadline).toISOString().split('T')[0];
            }
            setFormData(client);
          }
        } catch (err) {
          setError('Failed to fetch client details');
        }
      };
      fetchClient();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        className="btn btn-secondary" 
        style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem' }}
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <h2 style={{ marginBottom: '1.5rem' }}>{isEditMode ? 'Edit Client' : 'Add New Client'}</h2>

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Client Name *</label>
            <input 
              type="text" 
              className="input-field" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Company</label>
            <input 
              type="text" 
              className="input-field" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Contact Number</label>
            <input 
              type="text" 
              className="input-field" 
              name="contactNumber" 
              value={formData.contactNumber} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Service Type Tag</label>
            <select 
              className="input-field" 
              name="serviceType" 
              value={formData.serviceType} 
              onChange={handleChange}
            >
              <option value="">Select Service</option>
              <option value="Web Development">Web Development</option>
              <option value="SEO">SEO</option>
              <option value="Social Media">Social Media</option>
              <option value="Shopify">Shopify</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Project Requirements</label>
          <textarea 
            className="input-field" 
            name="requirements" 
            value={formData.requirements} 
            onChange={handleChange} 
            rows="3"
          ></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Status</label>
            <select 
              className="input-field" 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="input-group">
            <label className="input-label">Priority</label>
            <select 
              className="input-field" 
              name="priority" 
              value={formData.priority} 
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Deadline</label>
            <input 
              type="date" 
              className="input-field" 
              name="deadline" 
              value={formData.deadline} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Budget Range</label>
          <input 
            type="text" 
            className="input-field" 
            name="budgetRange" 
            placeholder="e.g. $1000 - $3000"
            value={formData.budgetRange} 
            onChange={handleChange} 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Follow Up Notes</label>
          <textarea 
            className="input-field" 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            rows="2"
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Save size={18} /> {loading ? 'Saving...' : 'Save Client'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
