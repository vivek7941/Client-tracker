import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ClientForm from './components/ClientForm';

function AppHeader() {
  const location = useLocation();
  // Don't show the header on the home page
  if (location.pathname === '/') return null;

  return (
    <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 className="gradient-text">Client Brief Tracker Pro</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your client projects with ease</p>
      </div>
    </header>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? '' : 'container'}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new" element={<ClientForm />} />
        <Route path="/edit/:id" element={<ClientForm />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
