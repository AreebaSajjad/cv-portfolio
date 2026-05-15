import React, { useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { mockProjects } from '../lib/data';
import Footer from '../components/Footer';
import './Projects.css';

const allTechs = ['All', ...new Set(mockProjects.flatMap(p => p.tech_stack))];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? mockProjects
    : mockProjects.filter(p => p.tech_stack.includes(filter));

  return (
    <>
      <div className="projects-page">
        <div className="container" style={{ paddingTop: '120px' }}>
          <div className="section-heading">
            <p className="label">// what i've built</p>
            <h2>My Projects</h2>
            <p>A collection of things I've built and worked on</p>
          </div>

          <div className="projects-filter">
            {allTechs.map(tech => (
              <button
                key={tech}
                className={`filter-btn ${filter === tech ? 'active' : ''}`}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="project-card glass animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="project-visual">
                  <div className="project-placeholder">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                  {project.featured && (
                    <div className="featured-badge">
                      <Star size={12} fill="currentColor" />
                      Featured
                    </div>
                  )}
                </div>

                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-stack">
                    {project.tech_stack.map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="proj-link">
                      <Github size={16} /> GitHub
                    </a>
                    {project.live_url && project.live_url !== '#' && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="proj-link">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
