import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Plus, Users, Clock, CheckCircle } from 'lucide-react';
import ClientCard from './ClientCard';

const API_URL = '/api/clients';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      let url = `${API_URL}?`;
      if (search) url += `search=${search}&`;
      if (statusFilter) url += `status=${statusFilter}&`;
      if (priorityFilter) url += `priority=${priorityFilter}`;
      
      const res = await axios.get(url);
      setClients(res.data.data);
    } catch (err) {
      console.error('Failed to fetch clients', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/dashboard-stats`);
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchStats();
  }, [search, statusFilter, priorityFilter]);

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Clients</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-orange)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending Projects</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Completed Projects</p>
          </div>
        </div>
      </div>

      <div className="top-bar">
        <div className="search-filter">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search clients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="input-field"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
          <select 
            className="input-field"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/new')}>
          <Plus size={18} /> Add Client
        </button>
      </div>

      <div className="clients-grid">
        {clients.length > 0 ? (
          clients.map(client => (
            <ClientCard key={client._id} client={client} onRefresh={() => { fetchClients(); fetchStats(); }} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <p>No clients found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
