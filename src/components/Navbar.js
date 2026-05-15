import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, User, Code2, FolderOpen, Briefcase,
  GraduationCap, Newspaper, Mail, Shield, Menu, X, Sparkles
} from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'Hero',       to: '/',        hash: '#hero',       icon: Home },
  { label: 'About',      to: '/',        hash: '#about',      icon: User },
  { label: 'Skills',     to: '/',        hash: '#skills',     icon: Code2 },
  { label: 'Projects',   to: '/projects',                     icon: FolderOpen },
  { label: 'Education',  to: '/',        hash: '#education',  icon: GraduationCap },
  { label: 'News',       to: '/',        hash: '#news',       icon: Newspaper },
  { label: 'Contact',    to: '/',        hash: '#contact',    icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState('Hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const sections = ['hero','about','skills','education','news','contact'];
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(sections[i].charAt(0).toUpperCase() + sections[i].slice(1));
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/projects') setActive('Projects');
    else if (location.pathname === '/admin') setActive('Admin');
  }, [location.pathname]);

  const handleClick = (link) => {
    setActive(link.label);
    setMobileOpen(false);
    if (link.hash && location.pathname === '/') {
      const el = document.querySelector(link.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="mobile-topbar">
        <Link to="/" className="nav-logo">
          <Sparkles size={16} />
          Areeba<span className="logo-accent">.dev</span>
        </Link>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside className={"sidebar " + (mobileOpen ? 'mobile-open' : '')}>
        <div className="sidebar-logo">
          <div className="logo-avatar">AS</div>
          <div>
            <p className="logo-name">Areeba Sajjad</p>
            <p className="logo-sub">CS Student · 6th Sem</p>
          </div>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          <p className="nav-section-label">NAVIGATION</p>
          <ul>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = active === link.label;
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={"sidebar-link " + (isActive ? 'active' : '')}
                    onClick={() => handleClick(link)}
                  >
                    <span className="link-icon"><Icon size={17} /></span>
                    <span className="link-label">{link.label}</span>
                    {isActive && <span className="active-bar" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-bottom">
          <p className="nav-section-label">ADMIN</p>
          <Link
            to="/admin"
            className={"sidebar-link admin-link " + (active === 'Admin' ? 'active' : '')}
            onClick={() => { setActive('Admin'); setMobileOpen(false); }}
          >
            <span className="link-icon"><Shield size={17} /></span>
            <span className="link-label">Admin Panel</span>
          </Link>
        </div>

        <div className="sidebar-status">
          <span className="status-dot" />
          <span>Available for internships</span>
        </div>
      </aside>

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
