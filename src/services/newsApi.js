import axios from "axios";

const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const MOCK_NEWS = [
  {
    title: "Tech Innovation Summit Highlights Next-Gen AI Advancements",
    description: "Industry leaders gathered today to discuss the future of AI models, emphasizing energy-efficient computing and multimodal reasoning architectures.",
    urlToImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    author: "Elena Rostova",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Global Markets Stabilize Amid Positive Economic Indicators",
    description: "Major financial indices showed steady growth this morning as inflation reports came in cooler than anticipated, boosting consumer confidence.",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    author: "Marcus Vance",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Championship Finals: Underdog Team Pulls Off Historic Victory",
    description: "In an unbelievable final quarter, the underdogs mounted a thrilling comeback to clinch the trophy in front of a sold-out stadium.",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    author: "Tyler Durden",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Breakthrough in Space Exploration: New Exoplanet Discovered",
    description: "Astronomers have detected a super-Earth in the habitable zone of a neighboring star system, suggesting the potential for liquid water.",
    urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    author: "Dr. Amanda Tase",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Creative Arts Festival Showcases Immersive Digital Installations",
    description: "Artists from around the globe converged to present stunning interactive projections and mixed-reality installations that push boundaries.",
    urlToImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    author: "Clara Croft",
    publishedAt: new Date().toISOString(),
  }
];

export const fetchTopHeadlines = async (category = "general") => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  if (!apiKey) {
    console.warn("News API key not found. Using high-fidelity mock news data.");
    return MOCK_NEWS;
  }
  try {
    const response = await newsClient.get(`/top-headlines?category=${category}&language=en&apiKey=${apiKey}`);
    return response.data.articles && response.data.articles.length > 0
      ? response.data.articles.filter(a => a.title && a.urlToImage)
      : MOCK_NEWS;
  } catch (error) {
    console.error("News service failure, falling back to mock news:", error);
    return MOCK_NEWS;
  }
};
