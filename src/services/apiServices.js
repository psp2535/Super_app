import axios from "axios";

// API Clients
const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com",
});

// Mock Fallback Data Definitions
const MOCK_WEATHER = {
  main: {
    temp: 24.5,
    pressure: 1012,
    humidity: 74,
  },
  wind: {
    speed: 3.6,
  },
  weather: [
    {
      main: "Clouds",
      description: "scattered clouds",
      icon: "03d",
    },
  ],
  name: "London",
};

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

const MOCK_MOVIES = {
  Action: [
    { imdbID: "m_act_1", Title: "The Dark Knight", Year: "2008", Poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_act_2", Title: "Inception", Year: "2010", Poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_act_3", Title: "Mad Max: Fury Road", Year: "2015", Poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_act_4", Title: "Gladiator", Year: "2000", Poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80" }
  ],
  Comedy: [
    { imdbID: "m_com_1", Title: "Superbad", Year: "2007", Poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_com_2", Title: "The Hangover", Year: "2009", Poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_com_3", Title: "Step Brothers", Year: "2008", Poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_com_4", Title: "Free Guy", Year: "2021", Poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80" }
  ],
  Drama: [
    { imdbID: "m_dra_1", Title: "The Shawshank Redemption", Year: "1994", Poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_dra_2", Title: "The Godfather", Year: "1972", Poster: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_dra_3", Title: "Fight Club", Year: "1999", Poster: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_dra_4", Title: "Forrest Gump", Year: "1994", Poster: "https://images.unsplash.com/photo-1478720143033-6a972678c304?auto=format&fit=crop&w=800&q=80" }
  ],
  Music: [
    { imdbID: "m_mus_1", Title: "Bohemian Rhapsody", Year: "2018", Poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_mus_2", Title: "Whiplash", Year: "2014", Poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_mus_3", Title: "La La Land", Year: "2016", Poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_mus_4", Title: "A Star Is Born", Year: "2018", Poster: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=800&q=80" }
  ],
  Sports: [
    { imdbID: "m_spo_1", Title: "Rocky", Year: "1976", Poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_spo_2", Title: "Moneyball", Year: "2011", Poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_spo_3", Title: "Ford v Ferrari", Year: "2019", Poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_spo_4", Title: "Rush", Year: "2013", Poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" }
  ],
  Thriller: [
    { imdbID: "m_thr_1", Title: "Se7en", Year: "1995", Poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_thr_2", Title: "Shutter Island", Year: "2010", Poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_thr_3", Title: "The Silence of the Lambs", Year: "1991", Poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_thr_4", Title: "Memento", Year: "2000", Poster: "https://images.unsplash.com/photo-1478720143033-6a972678c304?auto=format&fit=crop&w=800&q=80" }
  ],
  Fantasy: [
    { imdbID: "m_fan_1", Title: "Lord of the Rings", Year: "2001", Poster: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_fan_2", Title: "Harry Potter", Year: "2001", Poster: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_fan_3", Title: "Avatar", Year: "2009", Poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_fan_4", Title: "Chronicles of Narnia", Year: "2005", Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80" }
  ],
  Romance: [
    { imdbID: "m_rom_1", Title: "Titanic", Year: "1997", Poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_rom_2", Title: "The Notebook", Year: "2004", Poster: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_rom_3", Title: "Pride & Prejudice", Year: "2005", Poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
    { imdbID: "m_rom_4", Title: "About Time", Year: "2013", Poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80" }
  ]
};

const MOCK_MOVIE_DETAILS = {
  // Action
  m_act_1: { Title: "The Dark Knight", Year: "2008", Rated: "PG-13", Released: "18 Jul 2008", Runtime: "152 min", Genre: "Action, Crime, Drama", Director: "Christopher Nolan", Actors: "Christian Bale, Heath Ledger, Aaron Eckhart", Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", Poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=800&q=80", imdbRating: "9.0" },
  m_act_2: { Title: "Inception", Year: "2010", Rated: "PG-13", Released: "16 Jul 2010", Runtime: "148 min", Genre: "Action, Sci-Fi, Adventure", Director: "Christopher Nolan", Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page", Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.", Poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", imdbRating: "8.8" },
  m_act_3: { Title: "Mad Max: Fury Road", Year: "2015", Rated: "R", Released: "15 May 2015", Runtime: "120 min", Genre: "Action, Adventure, Sci-Fi", Director: "George Miller", Actors: "Tom Hardy, Charlize Theron, Nicholas Hoult", Plot: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.", Poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", imdbRating: "8.1" },
  m_act_4: { Title: "Gladiator", Year: "2000", Rated: "R", Released: "05 May 2000", Runtime: "155 min", Genre: "Action, Adventure, Drama", Director: "Ridley Scott", Actors: "Russell Crowe, Joaquin Phoenix, Connie Nielsen", Plot: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", Poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80", imdbRating: "8.5" },
  // Comedy
  m_com_1: { Title: "Superbad", Year: "2007", Rated: "R", Released: "17 Aug 2007", Runtime: "113 min", Genre: "Comedy", Director: "Greg Mottola", Actors: "Jonah Hill, Michael Cera, Christopher Mintz-Plasse", Plot: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-filled party goes awry.", Poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", imdbRating: "7.6" },
  m_com_2: { Title: "The Hangover", Year: "2009", Rated: "R", Released: "05 Jun 2009", Runtime: "100 min", Genre: "Comedy", Director: "Todd Phillips", Actors: "Bradley Cooper, Ed Helms, Zach Galifianakis", Plot: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.", Poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=800&q=80", imdbRating: "7.7" },
  m_com_3: { Title: "Step Brothers", Year: "2008", Rated: "R", Released: "25 Jul 2008", Runtime: "98 min", Genre: "Comedy", Director: "Adam McKay", Actors: "Will Ferrell, John C. Reilly, Mary Steenburgen", Plot: "Two middle-aged, good-for-nothing slacker men living at home are forced to become roommates when their parents marry.", Poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80", imdbRating: "6.9" },
  m_com_4: { Title: "Free Guy", Year: "2021", Rated: "PG-13", Released: "13 Aug 2021", Runtime: "115 min", Genre: "Action, Comedy, Sci-Fi", Director: "Shawn Levy", Actors: "Ryan Reynolds, Jodie Comer, Taika Waititi", Plot: "A bank teller discovers that he's actually a background player in an open-world video game and decides to become the hero of his own story.", Poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80", imdbRating: "7.1" },
  // Drama
  m_dra_1: { Title: "The Shawshank Redemption", Year: "1994", Rated: "R", Released: "14 Oct 1994", Runtime: "142 min", Genre: "Drama", Director: "Frank Darabont", Actors: "Tim Robbins, Morgan Freeman, Bob Gunton", Plot: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.", Poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80", imdbRating: "9.3" },
  m_dra_2: { Title: "The Godfather", Year: "1972", Rated: "R", Released: "24 Mar 1972", Runtime: "175 min", Genre: "Crime, Drama", Director: "Francis Ford Coppola", Actors: "Marlon Brando, Al Pacino, James Caan", Plot: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.", Poster: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?auto=format&fit=crop&w=800&q=80", imdbRating: "9.2" },
  m_dra_3: { Title: "Fight Club", Year: "1999", Rated: "R", Released: "15 Oct 1999", Runtime: "139 min", Genre: "Drama", Director: "David Fincher", Actors: "Brad Pitt, Edward Norton, Meat Loaf", Plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.", Poster: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80", imdbRating: "8.8" },
  m_dra_4: { Title: "Forrest Gump", Year: "1994", Rated: "PG-13", Released: "06 Jul 1994", Runtime: "142 min", Genre: "Drama, Romance", Director: "Robert Zemeckis", Actors: "Tom Hanks, Robin Wright, Gary Sinise", Plot: "The history of the United States from the 1950s to the 1970s unfolds from the perspective of an Alabama man with an IQ of 75, who longs to be reunited with his childhood sweetheart.", Poster: "https://images.unsplash.com/photo-1478720143033-6a972678c304?auto=format&fit=crop&w=800&q=80", imdbRating: "8.8" },
  // Music
  m_mus_1: { Title: "Bohemian Rhapsody", Year: "2018", Rated: "PG-13", Released: "02 Nov 2018", Runtime: "134 min", Genre: "Biography, Drama, Music", Director: "Bryan Singer", Actors: "Rami Malek, Lucy Boynton, Gwilym Lee", Plot: "The story of the legendary British rock band Queen and their lead singer Freddie Mercury, leading up to their famous Live Aid performance in 1985.", Poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", imdbRating: "7.9" },
  m_mus_2: { Title: "Whiplash", Year: "2014", Rated: "R", Released: "16 Jan 2015", Runtime: "107 min", Genre: "Drama, Music", Director: "Damien Chazelle", Actors: "Miles Teller, J.K. Simmons, Paul Reiser", Plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.", Poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80", imdbRating: "8.5" },
  m_mus_3: { Title: "La La Land", Year: "2016", Rated: "PG-13", Released: "25 Dec 2016", Runtime: "128 min", Genre: "Comedy, Drama, Music", Director: "Damien Chazelle", Actors: "Ryan Gosling, Emma Stone, Rosemarie DeWitt", Plot: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.", Poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", imdbRating: "8.0" },
  m_mus_4: { Title: "A Star Is Born", Year: "2018", Rated: "R", Released: "05 Oct 2018", Runtime: "136 min", Genre: "Drama, Music, Romance", Director: "Bradley Cooper", Actors: "Lady Gaga, Bradley Cooper, Sam Elliott", Plot: "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.", Poster: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=800&q=80", imdbRating: "7.6" },
  // Sports
  m_spo_1: { Title: "Rocky", Year: "1976", Rated: "PG", Released: "03 Dec 1976", Runtime: "120 min", Genre: "Drama, Sport", Director: "John G. Avildsen", Actors: "Sylvester Stallone, Talia Shire, Burt Young", Plot: "A small-time boxer from Philadelphia gets a supremely rare chance to fight the world heavyweight champion in a bout in which he strives to go the distance for his self-respect.", Poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80", imdbRating: "8.1" },
  m_spo_2: { Title: "Moneyball", Year: "2011", Rated: "PG-13", Released: "23 Sep 2011", Runtime: "133 min", Genre: "Biography, Drama, Sport", Director: "Bennett Miller", Actors: "Brad Pitt, Robin Wright, Jonah Hill", Plot: "Oakland A's general manager Billy Beane's successful attempt to assemble a baseball team on a lean budget by employing computer-generated analysis to acquire new players.", Poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", imdbRating: "7.6" },
  m_spo_3: { Title: "Ford v Ferrari", Year: "2019", Rated: "PG-13", Released: "15 Nov 2019", Runtime: "152 min", Genre: "Action, Biography, Drama", Director: "James Mangold", Actors: "Matt Damon, Christian Bale, Jon Bernthal", Plot: "American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in order to defeat Ferrari at the 24 Hours of Le Mans in 1966.", Poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80", imdbRating: "8.1" },
  m_spo_4: { Title: "Rush", Year: "2013", Rated: "R", Released: "27 Sep 2013", Runtime: "123 min", Genre: "Action, Biography, Drama", Director: "Ron Howard", Actors: "Daniel Brühl, Chris Hemsworth, Olivia Wilde", Plot: "The merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda.", Poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", imdbRating: "8.1" },
  // Thriller
  m_thr_1: { Title: "Se7en", Year: "1995", Rated: "R", Released: "22 Sep 1995", Runtime: "127 min", Genre: "Crime, Drama, Mystery", Director: "David Fincher", Actors: "Morgan Freeman, Brad Pitt, Kevin Spacey", Plot: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.", Poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80", imdbRating: "8.6" },
  m_thr_2: { Title: "Shutter Island", Year: "2010", Rated: "R", Released: "19 Feb 2010", Runtime: "138 min", Genre: "Mystery, Thriller", Director: "Martin Scorsese", Actors: "Leonardo DiCaprio, Emily Mortimer, Mark Ruffalo", Plot: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on Shutter Island.", Poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80", imdbRating: "8.2" },
  m_thr_3: { Title: "The Silence of the Lambs", Year: "1991", Rated: "R", Released: "14 Feb 1991", Runtime: "118 min", Genre: "Crime, Drama, Thriller", Director: "Jonathan Demme", Actors: "Jodie Foster, Anthony Hopkins, Lawrence A. Bonney", Plot: "A young U.S. FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.", Poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=800&q=80", imdbRating: "8.6" },
  m_thr_4: { Title: "Memento", Year: "2000", Rated: "R", Released: "25 May 2001", Runtime: "113 min", Genre: "Mystery, Thriller", Director: "Christopher Nolan", Actors: "Guy Pearce, Carrie-Anne Moss, Joe Pantoliano", Plot: "A man with short-term memory loss attempts to track down his wife's murderer.", Poster: "https://images.unsplash.com/photo-1478720143033-6a972678c304?auto=format&fit=crop&w=800&q=80", imdbRating: "8.4" },
  // Fantasy
  m_fan_1: { Title: "Lord of the Rings", Year: "2001", Rated: "PG-13", Released: "19 Dec 2001", Runtime: "178 min", Genre: "Action, Adventure, Drama", Director: "Peter Jackson", Actors: "Elijah Wood, Ian McKellen, Orlando Bloom", Plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", Poster: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80", imdbRating: "8.8" },
  m_fan_2: { Title: "Harry Potter", Year: "2001", Rated: "PG", Released: "16 Nov 2001", Runtime: "152 min", Genre: "Adventure, Family, Fantasy", Director: "Chris Columbus", Actors: "Daniel Radcliffe, Rupert Grint, Emma Watson", Plot: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.", Poster: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80", imdbRating: "7.6" },
  m_fan_3: { Title: "Avatar", Year: "2009", Rated: "PG-13", Released: "18 Dec 2009", Runtime: "162 min", Genre: "Action, Adventure, Fantasy", Director: "James Cameron", Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver", Plot: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.", Poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", imdbRating: "7.9" },
  m_fan_4: { Title: "Chronicles of Narnia", Year: "2005", Rated: "PG", Released: "09 Dec 2005", Runtime: "143 min", Genre: "Adventure, Family, Fantasy", Director: "Andrew Adamson", Actors: "Tilda Swinton, Georgie Henley, William Moseley", Plot: "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.", Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", imdbRating: "6.9" },
  // Romance
  m_rom_1: { Title: "Titanic", Year: "1997", Rated: "PG-13", Released: "19 Dec 1997", Runtime: "194 min", Genre: "Drama, Romance", Director: "James Cameron", Actors: "Leonardo DiCaprio, Kate Winslet, Billy Zane", Plot: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", Poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80", imdbRating: "7.9" },
  m_rom_2: { Title: "The Notebook", Year: "2004", Rated: "PG-13", Released: "25 Jun 2004", Runtime: "123 min", Genre: "Drama, Romance", Director: "Nick Cassavetes", Actors: "Gena Rowlands, James Garner, Rachel McAdams", Plot: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.", Poster: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80", imdbRating: "7.8" },
  m_rom_3: { Title: "Pride & Prejudice", Year: "2005", Rated: "PG", Released: "23 Nov 2005", Runtime: "129 min", Genre: "Drama, Romance", Director: "Joe Wright", Actors: "Keira Knightley, Matthew Macfadyen, Brenda Blethyn", Plot: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.", Poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80", imdbRating: "7.8" },
  m_rom_4: { Title: "About Time", Year: "2013", Rated: "R", Released: "08 Nov 2013", Runtime: "123 min", Genre: "Comedy, Drama, Fantasy", Director: "Richard Curtis", Actors: "Domhnall Gleeson, Rachel McAdams, Bill Nighy", Plot: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out to have unexpected consequences.", Poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", imdbRating: "7.8" }
};

// Weather API Fetcher
export const fetchCurrentWeather = async (location = "London") => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey) {
    console.warn("Weather API key not found. Using high-fidelity mock weather data.");
    return MOCK_WEATHER;
  }
  try {
    let url = `/weather?units=metric&appid=${apiKey}`;
    if (typeof location === "object" && location.lat && location.lon) {
      url += `&lat=${location.lat}&lon=${location.lon}`;
    } else {
      url += `&q=${encodeURIComponent(location)}`;
    }
    const response = await weatherClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Weather service failure, falling back to mock weather:", error);
    return MOCK_WEATHER;
  }
};

// News API Fetcher
export const fetchTopHeadlines = async (category = "general") => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  if (!apiKey) {
    console.warn("News API key not found. Using high-fidelity mock news data.");
    return MOCK_NEWS;
  }
  try {
    // Note: NewsAPI top-headlines works well with a query parameter.
    // If it rate-limits or fails, we fallback gracefully.
    const response = await newsClient.get(`/top-headlines?category=${category}&language=en&apiKey=${apiKey}`);
    return response.data.articles && response.data.articles.length > 0
      ? response.data.articles.filter(a => a.title && a.urlToImage)
      : MOCK_NEWS;
  } catch (error) {
    console.error("News service failure, falling back to mock news:", error);
    return MOCK_NEWS;
  }
};

// Movie Fetcher Method (OMDB based)
export const searchMovieByGenre = async (genreName) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY || "9b54b036"; // default key if not provided
  try {
    // OMDB doesn't support searching by genre directly, so we search by custom queries representing the genres.
    // For example, if genre is Action, we search 'dark knight' or search query that matches action movies.
    // However, if the OMDB API fails or rate-limits, we fallback to our extensive, beautiful genre mock list.
    const response = await movieClient.get(`/?s=${encodeURIComponent(genreName)}&type=movie&apikey=${apiKey}`);
    if (response.data && response.data.Search && response.data.Search.length > 0) {
      return response.data.Search.slice(0, 4); // return top 4
    }
    return MOCK_MOVIES[genreName] || MOCK_MOVIES.Action;
  } catch (error) {
    console.error(`Movie search failure for ${genreName}, falling back to mock movies:`, error);
    return MOCK_MOVIES[genreName] || MOCK_MOVIES.Action;
  }
};

// Detailed Movie Fetcher Method
export const fetchMovieDetails = async (imdbID) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY || "9b54b036";
  // Check if we have this movie in our local mock details first (to ensure fast, reliable loads for mock movies)
  if (imdbID.startsWith("m_")) {
    return MOCK_MOVIE_DETAILS[imdbID] || {
      Title: "Mock Movie",
      Year: "2026",
      Rated: "PG-13",
      Released: "01 Jan 2026",
      Runtime: "120 min",
      Genre: "Adventure",
      Director: "Unknown",
      Actors: "Actor A, Actor B",
      Plot: "A wonderful mock adventure movie description to demo the super app layout modal.",
      Poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      imdbRating: "8.0"
    };
  }
  try {
    const response = await movieClient.get(`/?i=${imdbID}&plot=full&apikey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(`Movie detail query error for ${imdbID}, falling back to mock details:`, error);
    return MOCK_MOVIE_DETAILS[imdbID] || {
      Title: "Mock Movie Detail",
      Year: "2026",
      Rated: "PG-13",
      Released: "01 Jan 2026",
      Runtime: "120 min",
      Genre: "Adventure",
      Director: "Unknown",
      Actors: "Actor A, Actor B",
      Plot: "A wonderful mock adventure movie description to demo the super app layout modal.",
      Poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      imdbRating: "8.0"
    };
  }
};
