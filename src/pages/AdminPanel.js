import React, { useState } from 'react';
import { Shield, Plus, Trash2, Edit3, LogOut, FolderOpen, Code, MessageSquare, Eye, EyeOff } from 'lucide-react';
import { mockProjects, mockSkills } from '../lib/data';
import './AdminPanel.css';

const ADMIN_PASSWORD = 'areeba2024'; // Change this!

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState(mockProjects);
  const [skills, setSkills] = useState(mockSkills);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const [projectForm, setProjectForm] = useState({ title: '', description: '', tech_stack: '', github_url: '', live_url: '', featured: false });
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', level: 80 });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Try: areeba2024');
    }
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      ...projectForm,
      tech_stack: projectForm.tech_stack.split(',').map(t => t.trim()),
    };
    setProjects([...projects, newProject]);
    setProjectForm({ title: '', description: '', tech_stack: '', github_url: '', live_url: '', featured: false });
    setShowProjectForm(false);
  };

  const deleteProject = (id) => setProjects(projects.filter(p => p.id !== id));

  const addSkill = () => {
    const newSkill = { id: Date.now().toString(), ...skillForm };
    setSkills([...skills, newSkill]);
    setSkillForm({ name: '', category: 'Frontend', level: 80 });
    setShowSkillForm(false);
  };

  const deleteSkill = (id) => setSkills(skills.filter(s => s.id !== id));

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="login-card glass-strong">
          <div className="login-icon">
            <Shield size={32} />
          </div>
          <h2>Admin Panel</h2>
          <p>Enter your admin password to continue</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group" style={{ position: 'relative' }}>
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password..."
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Shield size={16} /> Login
            </button>
          </form>
          <p className="login-hint">Hint: areeba2024</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header glass">
        <div className="container">
          <div className="admin-header-inner">
            <div className="admin-title">
              <Shield size={22} />
              <div>
                <h2>Admin Dashboard</h2>
                <p>Manage your portfolio content</p>
              </div>
            </div>
            <button className="btn-outline" onClick={() => setAuthenticated(false)}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container admin-content">
        {/* Stats */}
        <div className="admin-stats">
          {[
            { icon: <FolderOpen size={24} />, label: 'Projects', count: projects.length, color: '#a78bfa' },
            { icon: <Code size={24} />, label: 'Skills', count: skills.length, color: '#f472b6' },
            { icon: <MessageSquare size={24} />, label: 'Messages', count: 3, color: '#67e8f9' },
          ].map(s => (
            <div key={s.label} className="stat-card glass">
              <div className="stat-icon" style={{ color: s.color }}>{s.icon}</div>
              <div>
                <h3>{s.count}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="admin-tabs glass">
          {['projects', 'skills', 'messages'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="tab-content">
            <div className="tab-header">
              <h3>Projects ({projects.length})</h3>
              <button className="btn-primary" onClick={() => setShowProjectForm(!showProjectForm)}>
                <Plus size={16} /> Add Project
              </button>
            </div>

            {showProjectForm && (
              <div className="glass add-form animate-fade-up">
                <h4>Add New Project</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Project Name" value={projectForm.title}
                      onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Tech Stack (comma separated)</label>
                    <input type="text" placeholder="React, Node.js, CSS" value={projectForm.tech_stack}
                      onChange={e => setProjectForm({ ...projectForm, tech_stack: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows={3} placeholder="Brief description..." value={projectForm.description}
                    onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>GitHub URL</label>
                    <input type="url" placeholder="https://github.com/..." value={projectForm.github_url}
                      onChange={e => setProjectForm({ ...projectForm, github_url: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Live URL</label>
                    <input type="url" placeholder="https://..." value={projectForm.live_url}
                      onChange={e => setProjectForm({ ...projectForm, live_url: e.target.value })} />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-primary" onClick={addProject}><Plus size={16} /> Add Project</button>
                  <button className="btn-outline" onClick={() => setShowProjectForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="admin-list">
              {projects.map(project => (
                <div key={project.id} className="admin-item glass">
                  <div className="item-info">
                    <h4>{project.title}</h4>
                    <p>{project.description?.slice(0, 80)}...</p>
                    <div className="item-tags">
                      {project.tech_stack?.slice(0, 3).map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                      {project.featured && <span className="featured-tag">⭐ Featured</span>}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="icon-btn" onClick={() => deleteProject(project.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="tab-content">
            <div className="tab-header">
              <h3>Skills ({skills.length})</h3>
              <button className="btn-primary" onClick={() => setShowSkillForm(!showSkillForm)}>
                <Plus size={16} /> Add Skill
              </button>
            </div>

            {showSkillForm && (
              <div className="glass add-form animate-fade-up">
                <h4>Add New Skill</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Skill Name</label>
                    <input type="text" placeholder="React.js" value={skillForm.name}
                      onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select value={skillForm.category}
                      onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}>
                      {['Frontend', 'Backend', 'Database', 'Programming', 'CS Core', 'Tools'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Level: {skillForm.level}%</label>
                    <input type="range" min="10" max="100" value={skillForm.level}
                      onChange={e => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })} />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-primary" onClick={addSkill}><Plus size={16} /> Add Skill</button>
                  <button className="btn-outline" onClick={() => setShowSkillForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="skills-admin-grid">
              {skills.map(skill => (
                <div key={skill.id} className="skill-admin-card glass">
                  <div className="skill-admin-header">
                    <span>{skill.name}</span>
                    <button className="icon-btn danger" onClick={() => deleteSkill(skill.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                  <div className="skill-admin-footer">
                    <span className="tech-tag">{skill.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="tab-content">
            <div className="tab-header">
              <h3>Contact Messages</h3>
            </div>
            <div className="admin-list">
              {[
                { name: 'Ahmed Khan', email: 'ahmed@gmail.com', message: 'Hi Areeba! I saw your portfolio and would love to collaborate on a React project. Are you available?', time: '2 hours ago', read: false },
                { name: 'Sara Ali', email: 'sara@company.com', message: 'We have an internship opportunity for a frontend developer. Please check your email for details.', time: '1 day ago', read: true },
                { name: 'Usman Tariq', email: 'usman@dev.pk', message: 'Great portfolio! Can you help me build a MERN stack project? Happy to pay.', time: '3 days ago', read: true },
              ].map((msg, i) => (
                <div key={i} className={`admin-item glass msg-item ${!msg.read ? 'unread' : ''}`}>
                  <div className="msg-avatar">{msg.name.charAt(0)}</div>
                  <div className="item-info">
                    <div className="msg-header">
                      <h4>{msg.name}</h4>
                      <span className="msg-time">{msg.time}</span>
                    </div>
                    <p className="msg-email">{msg.email}</p>
                    <p className="msg-text">{msg.message}</p>
                  </div>
                  {!msg.read && <span className="unread-dot" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
