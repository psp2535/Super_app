import React, { useState, useEffect } from "react";
import { fetchTopHeadlines } from "../services/newsApi";

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

  // Helper to format date matching mockup format "2-20-2023 | 07:35 PM"
  const formatPublishTime = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const y = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const hrStr = hours.toString().padStart(2, "0");
      return `${m}-${d}-${y}  |  ${hrStr}:${minutes} ${ampm}`;
    } catch {
      return "2-20-2023 | 07:35 PM";
    }
  };

  return (
    <div className="news-widget">
      {/* Top Part: Image with Overlay */}
      <div className="news-image-wrapper">
        <img
          src={currentArticle.urlToImage}
          alt={currentArticle.title}
          className="news-image animate-fade-in"
          key={`img-${activeIndex}`}
        />
        <div className="news-image-overlay">
          <h3 className="news-headline-overlay">{currentArticle.title}</h3>
          <span className="news-timestamp-overlay">
            {formatPublishTime(currentArticle.publishedAt)}
          </span>
        </div>
      </div>

      {/* Bottom Part: White Description Box */}
      <div className="news-description-wrapper animate-fade-in" key={`desc-${activeIndex}`}>
        <p className="news-description-text">{currentArticle.description}</p>
      </div>
    </div>
  );
};

export default NewsWidget;
