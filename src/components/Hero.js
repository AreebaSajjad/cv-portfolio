import React, { useEffect, useState } from 'react';
import { Download, Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';
import { personalInfo } from '../lib/data';
import './Hero.css';

const roles = [
  'CS Student 🎓',
  'React Developer ⚛️',
  'Problem Solver 💡',
  'Future Engineer 🚀',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Areeba_Sajjad_CV.pdf';
    link.download = 'Areeba_Sajjad_CV.pdf';
    link.click();
  };

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Sparkles size={14} />
            <span>Available for Internships & Projects</span>
          </div>

          <h1 className="hero-name animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Hi, I'm <br />
            <span className="name-gradient">Areeba Sajjad</span>
          </h1>

          <div className="hero-role animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <span className="role-text">{displayText}</span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-desc animate-fade-up" style={{ animationDelay: '0.4s' }}>
            6th Semester CS student passionate about building beautiful, 
            functional web experiences. Turning ideas into elegant code.
          </p>

          <div className="hero-actions animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <button className="btn-primary" onClick={handleDownloadCV}>
              <Download size={16} />
              Download CV
            </button>
            <a href="#contact" className="btn-outline" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Mail size={16} />
              Contact Me
            </a>
          </div>

          <div className="hero-socials animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-btn">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="social-btn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="social-btn">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="avatar-ring">
            <div className="avatar-outer">
              <div className="avatar-inner">
                <div className="avatar-initials">AS</div>
              </div>
            </div>
            <div className="orbit orbit-1">
              <div className="orbit-dot" style={{ background: '#f472b6' }} />
            </div>
            <div className="orbit orbit-2">
              <div className="orbit-dot" style={{ background: '#67e8f9' }} />
            </div>
            <div className="orbit orbit-3">
              <div className="orbit-dot" style={{ background: '#fbbf24' }} />
            </div>
          </div>

          <div className="floating-card card-top glass">
            <span>🎓</span>
            <div>
              <p className="fc-label">Semester</p>
              <p className="fc-val">6th — BSCS</p>
            </div>
          </div>

          <div className="floating-card card-bottom glass">
            <span>⚛️</span>
            <div>
              <p className="fc-label">Currently Learning</p>
              <p className="fc-val">React + Supabase</p>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-down" onClick={scrollDown}>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
