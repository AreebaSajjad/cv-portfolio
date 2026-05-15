// src/components/TechNewsFeed.jsx
import React, { useEffect, useState } from "react";

const TechNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace query as per your need
  const query = "technology programming"; 
  const fromDate = new Date().toISOString().split("T")[0]; // Today’s date

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/news?q=${encodeURIComponent(query)}&from=${fromDate}`);
        if (!res.ok) throw new Error("Failed to fetch news");

        const data = await res.json();
        setNews(data.articles || []); // articles array from GNews API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, fromDate]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!news.length) return <p>No news found.</p>;

  return (
    <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
      {news.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }}
            />
          )}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default TechNewsFeed;



b81802603efc7d0a3d58b88ba4d1c400
REACT_APP_GNEWS_API_KEY