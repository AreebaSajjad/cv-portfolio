import React, { useState } from 'react';
import { personalInfo, mockSkills } from '../lib/data';
import { User, Code, Briefcase, GraduationCap, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Sections.css';

/* ==================== ABOUT ==================== */
export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="label">// who am i</p>
          <h2>About Me</h2>
        </div>
        <div className="about-grid">
          <div className="about-text glass animate-fade-up">
            <User size={24} className="about-icon" />
            <p>{personalInfo.about}</p>
            <div className="about-stats">
              <div className="stat-item">
                <h3>6th</h3>
                <p>Semester</p>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <h3>3.5</h3>
                <p>GPA</p>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <h3>5+</h3>
                <p>Projects</p>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <h3>2+</h3>
                <p>Years Coding</p>
              </div>
            </div>
          </div>
          <div className="about-details">
            <div className="glass detail-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h4>📍 Personal Info</h4>
              <ul>
                <li><span>Name</span><strong>Areeba Sajjad</strong></li>
                <li><span>Degree</span><strong>BSCS</strong></li>
                <li><span>Semester</span><strong>6th</strong></li>
                <li><span>GPA</span><strong>3.5 / 4.0</strong></li>
                <li><span>Location</span><strong>Pakistan</strong></li>
                <li><span>Email</span><strong>areeba@email.com</strong></li>
              </ul>
            </div>
            <div className="glass detail-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h4>🎯 Interests</h4>
              <div className="interest-tags">
                {['Web Development', 'UI/UX Design', 'Problem Solving', 'Open Source', 'Machine Learning', 'Mobile Apps'].map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== SKILLS ==================== */
const categories = ['All', 'Frontend', 'Backend', 'Database', 'Programming', 'CS Core', 'Tools'];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All'
    ? mockSkills
    : mockSkills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="label">// what i know</p>
          <h2>Skills & Technologies</h2>
          <p>Technologies I've worked with throughout my CS journey</p>
        </div>

        <div className="skill-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((skill, i) => (
            <div key={skill.id} className="skill-card glass animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar-bg">
                <div
                  className="skill-bar-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="skill-category-tag">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ==================== EDUCATION ==================== */
export function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="label">// academic background</p>
          <h2>Education</h2>
        </div>
        <div className="edu-grid">
          {personalInfo.education.map((edu, i) => (
            <div key={i} className="edu-card glass animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="edu-icon">
                <GraduationCap size={28} />
              </div>
              <div className="edu-info">
                <h3>{edu.degree}</h3>
                <p className="edu-institute">{edu.institute}</p>
                <div className="edu-meta">
                  <span>{edu.year}</span>
                  {edu.semester && <span className="edu-badge">{edu.semester}</span>}
                  {edu.gpa && <span className="edu-badge">GPA: {edu.gpa}</span>}
                  {edu.grade && <span className="edu-badge">{edu.grade}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== CONTACT ==================== */
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate or connect to Supabase
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="label">// get in touch</p>
          <h2>Contact Me</h2>
          <p>Have a project or opportunity? Let's talk!</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="glass contact-info-card animate-fade-up">
              <h3>Let's Connect</h3>
              <p>I'm open to internships, freelance projects, and collaboration opportunities. Feel free to reach out!</p>
              <ul className="contact-details">
                <li>
                  <div className="contact-icon"><Mail size={18} /></div>
                  <div>
                    <span>Email</span>
                    <strong>{personalInfo.email}</strong>
                  </div>
                </li>
                <li>
                  <div className="contact-icon"><Phone size={18} /></div>
                  <div>
                    <span>Phone</span>
                    <strong>{personalInfo.phone}</strong>
                  </div>
                </li>
                <li>
                  <div className="contact-icon"><MapPin size={18} /></div>
                  <div>
                    <span>Location</span>
                    <strong>{personalInfo.location}</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass contact-form animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {sent ? (
              <div className="form-success">
                <CheckCircle size={48} color="#4ade80" />
                <h3>Message Sent!</h3>
                <p>Thank you! I'll get back to you as soon as possible.</p>
                <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Muhammad Ali"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="ali@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? 'Sending...' : (<><Send size={16} /> Send Message</>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
