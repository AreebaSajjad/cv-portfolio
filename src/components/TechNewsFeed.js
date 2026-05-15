import React, { useEffect, useState, useCallback } from 'react';
import './TechNewsFeed.css';

const CATEGORIES = [
  { label: '🌐 All Tech', q: 'software technology developer' },
  { label: '⚛️ React', q: 'React javascript frontend' },
  { label: '🤖 AI', q: 'artificial intelligence ChatGPT' },
  { label: '🐍 Python', q: 'Python programming code' },
  { label: '☁️ Cloud', q: 'cloud AWS Google Microsoft' },
];

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

function NewsCard({ article, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    
     <a href={article.url}
      target="_blank"
      rel="noreferrer"
      className="news-card glass animate-fade-up"
      style={{ animationDelay: `${index * 0.07}s`, textDecoration: 'none' }}
    >
      <div className="news-img-wrap">
        {article.image && !imgError ? (
          <img
            src={article.image}
            alt={article.title}
            className="news-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="news-img-placeholder">
            <span>📰</span>
          </div>
        )}
        <div className="news-fresh-badge">🟢 Fresh</div>
      </div>
      <div className="news-body">
        <div className="news-source-row">
          <span className="news-source">{article.source?.name || 'Tech News'}</span>
          <span className="news-time">{timeAgo(article.publishedAt)}</span>
        </div>
        <h4 className="news-title">{article.title}</h4>
        {article.description && (
          <p className="news-desc">{article.description.slice(0, 100)}...</p>
        )}
        <span className="news-read-more">Read more →</span>
      </div>
    </a>
  );
}

export default function TechNewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchNews = useCallback(async (categoryIndex = activeCategory) => {
    try {
      setLoading(true);
      setError(null);

      const query = CATEGORIES[categoryIndex].q;

      // ✅ Serverless function pe call — CORS issue nahi hoga
      const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      if (data.error) throw new Error(data.error);
      if (!data.articles) throw new Error('No articles received');

      const mapped = data.articles
        .filter(a => a.title && a.title !== '[Removed]')
        .map(article => ({
          title: article.title,
          description: article.description || '',
          url: article.url,
          image: article.image || null,
          publishedAt: article.publishedAt,
          source: { name: article.source?.name || 'Tech News' }
        }));

      setArticles(mapped);
      setLastUpdated(new Date());

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchNews(activeCategory);
    const interval = setInterval(() => fetchNews(activeCategory), 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [activeCategory, fetchNews]);

  const handleCategory = (i) => {
    setActiveCategory(i);
    fetchNews(i);
  };

  return (
    <section id="news" className="section news-section">
      <div className="container">
        <div className="section-heading">
          <p className="label">// staying current</p>
          <h2>Tech News Feed</h2>
          <p>Latest tech news — powered by GNews API</p>
        </div>

        <div className="news-topbar glass">
          <div className="live-indicator">
            <span className="live-dot" />
            <span>Live Feed</span>
          </div>
          {lastUpdated && (
            <span className="last-updated">
              Updated {timeAgo(lastUpdated.toISOString())}
            </span>
          )}
          <button
            className="refresh-btn"
            onClick={() => fetchNews(activeCategory)}
            disabled={loading}
          >
            {loading ? '⏳' : '🔄'} Refresh
          </button>
          <span style={{ fontSize: '0.75rem', color: '#7aaace' }}>
            📡 GNews Free · 12hr delay
          </span>
        </div>

        <div className="news-categories">
          {CATEGORIES.map((cat, i) => (
            <button
              key={i}
              className={`cat-btn ${activeCategory === i ? 'active' : ''}`}
              onClick={() => handleCategory(i)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="news-loading">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card glass">
                <div className="skeleton-img shimmer" />
                <div className="skeleton-body">
                  <div className="skeleton-line shimmer" style={{ width: '60%' }} />
                  <div className="skeleton-line shimmer" style={{ width: '100%' }} />
                  <div className="skeleton-line shimmer" style={{ width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="glass news-error">
            <span>⚠️</span>
            <p>{error}</p>
            <button
              className="btn-primary"
              onClick={() => fetchNews(activeCategory)}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="glass news-empty">
            <span>🔍</span>
            <h4>No articles found</h4>
            <p>Try another category or refresh!</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <>
            <div className="news-count-bar">
              <span>
                📰 {articles.length} article{articles.length !== 1 ? 's' : ''} found
              </span>
              <span className="news-expires">📡 Powered by GNews API</span>
            </div>
            <div className="news-grid">
              {articles.map((article, i) => (
                <NewsCard key={article.url || i} article={article} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}