import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AdminPanel from './pages/AdminPanel';
import { SUPABASE_URL } from './lib/supabase';
import './App.css';

function App() {

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/`, {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZnZ1b2Rhdml2dXF5bGN0dGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODk4MzYsImV4cCI6MjA4ODU2NTgzNn0.Zn1-83LxTo1e6PMc25mhhRetYkqwn8AkxrmtebwMzZ8'
  }
}).catch(() => {});
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Animated background */}
        <div className="bg-animated">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-overlay" />
        </div>

        {/* Left sidebar nav */}
        <Navbar />

        {/* Main content — offset by sidebar width */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;