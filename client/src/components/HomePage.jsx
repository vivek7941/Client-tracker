import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, BarChart3, Clock, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-nav-inner">
          <div className="home-logo">
            <div className="logo-icon">
              <Briefcase size={24} />
            </div>
            <span className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 700 }}>BriefTracker Pro</span>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Open Dashboard <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} /> Powerful Client Management
          </div>
          <h1 className="hero-title">
            Manage Your Client
            <br />
            <span className="gradient-text">Briefs Like a Pro</span>
          </h1>
          <p className="hero-description">
            Track projects, set priorities, manage deadlines, and keep every client detail 
            organized in one beautiful dashboard. Never miss a follow-up again.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
              Go to Dashboard <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Explore Features
            </button>
          </div>

          {/* Stats Row */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-number">100%</span>
              <span className="hero-stat-label">Organized</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">Real-time</span>
              <span className="hero-stat-label">Tracking</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">Zero</span>
              <span className="hero-stat-label">Missed Deadlines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-header">
          <h2>Everything You Need to <span className="gradient-text">Stay on Top</span></h2>
          <p>A complete toolkit to manage client briefs from start to finish</p>
        </div>
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
              <Users size={28} />
            </div>
            <h3>Client Management</h3>
            <p>Store client names, companies, and contact details. Everything at your fingertips.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
              <BarChart3 size={28} />
            </div>
            <h3>Dashboard Analytics</h3>
            <p>See total clients, pending projects, and completed work at a glance with live stats.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-orange)' }}>
              <Clock size={28} />
            </div>
            <h3>Deadline Tracking</h3>
            <p>Set deadlines and get visual overdue alerts so you never miss a delivery date.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
              <Shield size={28} />
            </div>
            <h3>Priority & Status</h3>
            <p>Color-coded priority levels and status badges keep your workflow crystal clear.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--accent-red)' }}>
              <Briefcase size={28} />
            </div>
            <h3>Service Type Tags</h3>
            <p>Tag clients by service — Web Dev, SEO, Social Media, or Shopify for quick filtering.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
              <CheckCircle size={28} />
            </div>
            <h3>Follow-Up Notes</h3>
            <p>Add notes for each client to keep track of discussions and next steps.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card glass-panel">
          <h2>Ready to Get Organized?</h2>
          <p>Start managing your client briefs more efficiently today.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
            Launch Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 Client Brief Tracker Pro. Built with ❤️</p>
      </footer>
    </div>
  );
};

export default HomePage;
