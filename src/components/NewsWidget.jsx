import React, { useState, useEffect } from "react";
import { fetchTopHeadlines } from "../services/apiServices";

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch articles
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const news = await fetchTopHeadlines("general");
        setArticles(news);
      } catch (err) {
        console.error("Failed to load news:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Auto-rotate articles every 2 seconds
  useEffect(() => {
    if (articles.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [articles]);

  if (loading) {
    return (
      <div className="news-widget loading-widget">
        <p>Loading latest news...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="news-widget error-widget">
        <p>Could not load news headlines.</p>
      </div>
    );
  }

  const currentArticle = articles[activeIndex];

  // Helper to format date
  const formatPublishTime = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }) + " | " + date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="news-widget">
      {/* Article Image Container */}
      <div className="news-image-wrapper">
        <img
          src={currentArticle.urlToImage}
          alt={currentArticle.title}
          className="news-image animate-fade-in"
          key={`img-${activeIndex}`}
        />
        {/* News Source overlay */}
        {currentArticle.author && (
          <span className="news-source-tag">By {currentArticle.author}</span>
        )}
      </div>

      {/* Article Text Content */}
      <div className="news-content-panel animate-fade-in" key={`content-${activeIndex}`}>
        <div className="news-meta">
          <span className="news-timestamp">
            {formatPublishTime(currentArticle.publishedAt)}
          </span>
        </div>
        <h3 className="news-headline">{currentArticle.title}</h3>
        <p className="news-description">{currentArticle.description}</p>
      </div>
    </div>
  );
};

export default NewsWidget;
