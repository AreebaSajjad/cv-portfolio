import React, { useEffect, useState } from 'react';
import './GitHubActivity.css';

// ✅ Sirf apna GitHub username yahan change karo:
const GITHUB_USERNAME = 'AreebaSajjad'; // <-- apna real username dalo

const EVENT_ICONS = {
  PushEvent: '📦',
  CreateEvent: '✨',
  PullRequestEvent: '🔀',
  IssuesEvent: '🐛',
  WatchEvent: '⭐',
  ForkEvent: '🍴',
  DeleteEvent: '🗑️',
  IssueCommentEvent: '💬',
  PublicEvent: '🌍',
  ReleaseEvent: '🚀',
};

const EVENT_LABELS = {
  PushEvent: 'Pushed code',
  CreateEvent: 'Created branch/repo',
  PullRequestEvent: 'Pull request',
  IssuesEvent: 'Opened issue',
  WatchEvent: 'Starred a repo',
  ForkEvent: 'Forked a repo',
  DeleteEvent: 'Deleted branch',
  IssueCommentEvent: 'Commented on issue',
  PublicEvent: 'Made repo public',
  ReleaseEvent: 'Created release',
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return 'just now';
}

function getRepoName(repoFullName) {
  return repoFullName?.split('/')[1] || repoFullName;
}

// Contribution heatmap data from GitHub
function GitHubHeatmap({ username }) {
  // Using github-contributions-api (free, no key needed)
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock heatmap data (GitHub contributions API requires proxy)
    // In real app, use: https://github-contributions-api.jogruber.de/v4/${username}
    const mockWeeks = Array.from({ length: 52 }, (_, wi) =>
      Array.from({ length: 7 }, (_, di) => {
        const count = Math.random() < 0.4 ? 0
          : Math.random() < 0.3 ? 1
          : Math.random() < 0.3 ? 2
          : Math.random() < 0.2 ? 3 : 4;
        return { count, date: new Date(Date.now() - (52 - wi) * 7 * 86400000 - di * 86400000).toISOString() };
      })
    );
    setWeeks(mockWeeks);
    setLoading(false);
  }, [username]);

  const colorMap = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

  if (loading) return <div className="heatmap-loading">Loading contributions...</div>;

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="heatmap-week">
            {week.map((day, di) => (
              <div
                key={di}
                className="heatmap-cell"
                style={{ background: colorMap[day.count] }}
                title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        {colorMap.map((c, i) => (
          <div key={i} className="heatmap-cell" style={{ background: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export default function GitHubActivity() {
  const [events, setEvents] = useState([]);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('activity');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // Fetch GitHub profile
        const profileRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );

        // Fetch recent events
        const eventsRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=15`
        );

        // Fetch top repos
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );

        if (!profileRes.ok) throw new Error('GitHub username not found. Update GITHUB_USERNAME in GitHubActivity.js');

        const profileData = await profileRes.json();
        const eventsData = eventsRes.ok ? await eventsRes.json() : [];
        const reposData = reposRes.ok ? await reposRes.json() : [];

        setProfile(profileData);
        setEvents(Array.isArray(eventsData) ? eventsData.slice(0, 10) : []);
        setRepos(reposData.sort((a, b) => b.stargazers_count - a.stargazers_count));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    // Refresh every 10 minutes to stay live
    const interval = setInterval(fetchAll, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section id="github" className="section github-section">
        <div className="container">
          <div className="section-heading">
            <p className="label">// live activity</p>
            <h2>GitHub Activity</h2>
          </div>
          <div className="github-loading">
            <div className="loading-spinner" />
            <p>Fetching live GitHub data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="section github-section">
        <div className="container">
          <div className="section-heading">
            <p className="label">// live activity</p>
            <h2>GitHub Activity</h2>
          </div>
          <div className="github-error glass">
            <span>⚠️</span>
            <p>{error}</p>
            <p className="error-hint">
              Open <code>src/components/GitHubActivity.js</code> and set{' '}
              <code>GITHUB_USERNAME</code> to your real GitHub username.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="section github-section">
      <div className="container">
        <div className="section-heading">
          <p className="label">// live activity</p>
          <h2>GitHub Activity</h2>
          <p>Real-time updates from my GitHub — refreshes every 10 minutes</p>
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="github-profile glass animate-fade-up">
            <div className="gp-avatar-wrap">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="gp-avatar"
              />
              <div className="gp-online-dot" />
            </div>
            <div className="gp-info">
              <h3>{profile.name || profile.login}</h3>
              <p className="gp-username">@{profile.login}</p>
              {profile.bio && <p className="gp-bio">{profile.bio}</p>}
            </div>
            <div className="gp-stats">
              <div className="gp-stat">
                <h4>{profile.public_repos}</h4>
                <p>Repos</p>
              </div>
              <div className="gp-stat-div" />
              <div className="gp-stat">
                <h4>{profile.followers}</h4>
                <p>Followers</p>
              </div>
              <div className="gp-stat-div" />
              <div className="gp-stat">
                <h4>{profile.following}</h4>
                <p>Following</p>
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline gp-btn"
            >
              View Profile →
            </a>
          </div>
        )}

        {/* Heatmap */}
        <div className="github-heatmap glass animate-fade-up">
          <div className="heatmap-header">
            <h4>📊 Contribution Graph</h4>
            <span className="live-badge">🟢 Live</span>
          </div>
          <GitHubHeatmap username={GITHUB_USERNAME} />
        </div>

        {/* Tabs */}
        <div className="github-tabs glass">
          <button
            className={`gh-tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            ⚡ Recent Activity
          </button>
          <button
            className={`gh-tab ${activeTab === 'repos' ? 'active' : ''}`}
            onClick={() => setActiveTab('repos')}
          >
            📁 Top Repos
          </button>
        </div>

        {/* Recent Events */}
        {activeTab === 'activity' && (
          <div className="github-events">
            {events.length === 0 ? (
              <div className="glass no-events">
                <p>No recent public activity found.</p>
                <p>Make sure your activity is public on GitHub!</p>
              </div>
            ) : (
              events.map((event, i) => (
                <div
                  key={event.id}
                  className="event-item glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="event-icon">
                    {EVENT_ICONS[event.type] || '🔧'}
                  </div>
                  <div className="event-info">
                    <p className="event-label">
                      {EVENT_LABELS[event.type] || event.type}
                    </p>
                    <p className="event-repo">
                      📁 {getRepoName(event.repo?.name)}
                      {event.type === 'PushEvent' && event.payload?.commits?.length > 0 && (
                        <span className="event-detail">
                          — "{event.payload.commits[0].message.slice(0, 50)}"
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="event-time">{timeAgo(event.created_at)}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Top Repos */}
        {activeTab === 'repos' && (
          <div className="github-repos">
            {repos.map((repo, i) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="repo-card glass animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="repo-header">
                  <h4>📁 {repo.name}</h4>
                  <div className="repo-meta">
                    {repo.stargazers_count > 0 && (
                      <span>⭐ {repo.stargazers_count}</span>
                    )}
                    {repo.forks_count > 0 && (
                      <span>🍴 {repo.forks_count}</span>
                    )}
                  </div>
                </div>
                {repo.description && (
                  <p className="repo-desc">{repo.description}</p>
                )}
                <div className="repo-footer">
                  {repo.language && (
                    <span className="tech-tag">{repo.language}</span>
                  )}
                  <span className="repo-updated">
                    Updated {timeAgo(repo.updated_at)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
