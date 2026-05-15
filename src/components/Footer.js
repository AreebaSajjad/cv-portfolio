import React from 'react';
import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';
import { personalInfo } from '../lib/data';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-inner glass">
          <div className="footer-logo">
            <Code2 size={20} />
            <span>Areeba<span className="logo-accent">.dev</span></span>
          </div>

          <p className="footer-tagline">
            Building the web, one component at a time ✨
          </p>

          <div className="footer-socials">
            <a href={personalInfo.github} target="_blank" rel="noreferrer">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`}>
              <Mail size={18} />
            </a>
          </div>

          <p className="footer-copy">
            Made with <Heart size={13} fill="currentColor" style={{ color: '#f472b6', verticalAlign: 'middle' }} /> by Areeba Sajjad &nbsp;·&nbsp; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
