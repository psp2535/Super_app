import axios from "axios";

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com",
});

const MOCK_MOVIES = {
  Action: [
    { imdbID: "m_act_1", Title: "Black Adam", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/pMyyQyN2f059k6SjK0473H7613z.jpg" },
    { imdbID: "m_act_2", Title: "Eternals", Year: "2021", Poster: "https://image.tmdb.org/t/p/w500/6GcLIZ3xwiQWd4J5M4dJ8T0u3aI.jpg" },
    { imdbID: "m_act_3", Title: "Top Gun: Maverick", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBOJk1DXNq5N8.jpg" },
    { imdbID: "m_act_4", Title: "Tenet", Year: "2020", Poster: "https://image.tmdb.org/t/p/w500/k68nPLbISTwPUB5xnETX7q65X7T.jpg" }
  ],
  Drama: [
    { imdbID: "m_dra_1", Title: "The Shawshank Redemption", Year: "1994", Poster: "https://image.tmdb.org/t/p/w500/9cq0QOi4tx7crx75krA00jMB59z.jpg" },
    { imdbID: "m_dra_2", Title: "The Godfather", Year: "1972", Poster: "https://image.tmdb.org/t/p/w500/3bhkrj6PjOqZEyGDkSTabc611Z6.jpg" },
    { imdbID: "m_dra_3", Title: "Fight Club", Year: "1999", Poster: "https://image.tmdb.org/t/p/w500/pB8BM76G65567uOPM3aGL2t41tK.jpg" },
    { imdbID: "m_dra_4", Title: "Forrest Gump", Year: "1994", Poster: "https://image.tmdb.org/t/p/w500/arw2vcJmH168g06iI0tgh0j3Nu5.jpg" }
  ],
  Romance: [
    { imdbID: "m_rom_1", Title: "The Fault in Our Stars", Year: "2014", Poster: "https://image.tmdb.org/t/p/w500/42d1H3aX4q2aH3k4Wd9a6c17e.jpg" },
    { imdbID: "m_rom_2", Title: "Titanic", Year: "1997", Poster: "https://image.tmdb.org/t/p/w500/9McB6b4A2ea1z6L2aH3k4Wd9a6c.jpg" },
    { imdbID: "m_rom_3", Title: "Pride & Prejudice", Year: "2005", Poster: "https://image.tmdb.org/t/p/w500/494790108377be9c29b29330.jpg" },
    { imdbID: "m_rom_4", Title: "About Time", Year: "2013", Poster: "https://image.tmdb.org/t/p/w500/r29s41k.jpg" }
  ],
  Thriller: [
    { imdbID: "m_thr_1", Title: "Oxygen", Year: "2021", Poster: "https://image.tmdb.org/t/p/w500/45hF7lU9z25u220vH5b4P3n7p2e.jpg" },
    { imdbID: "m_thr_2", Title: "Smile", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg" },
    { imdbID: "m_thr_3", Title: "The Gray Man", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/8cXbitsSgnWbH46P7i1j33p2a0b.jpg" },
    { imdbID: "m_thr_4", Title: "The Menu", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/fLIeKzb1t6K60h0m5e4p4r5a9.jpg" }
  ],
  Western: [
    { imdbID: "m_wes_1", Title: "Django Unchained", Year: "2012", Poster: "https://image.tmdb.org/t/p/w500/7oWY85jA2ea1z6L2aH3k4Wd9a6c.jpg" },
    { imdbID: "m_wes_2", Title: "True Grit", Year: "2010", Poster: "https://image.tmdb.org/t/p/w500/51453907913025950c84af65.jpg" },
    { imdbID: "m_wes_3", Title: "The Good, the Bad and the Ugly", Year: "1966", Poster: "https://image.tmdb.org/t/p/w500/509316975850ff9c5deb0cd9.jpg" },
    { imdbID: "m_wes_4", Title: "The Hateful Eight", Year: "2015", Poster: "https://image.tmdb.org/t/p/w500/469854523086cc02fe5d8800.jpg" }
  ],
  Horror: [
    { imdbID: "m_hor_1", Title: "M3GAN", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg" },
    { imdbID: "m_hor_2", Title: "The Invitation", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/jcUSQXaD1tM8P67s3t8T65nO5Vn.jpg" },
    { imdbID: "m_hor_3", Title: "Orphan: First Kill", Year: "2022", Poster: "https://image.tmdb.org/t/p/w500/wSqAXL1XTsWTaZ0Jp1aOQ2zN04F.jpg" },
    { imdbID: "m_hor_4", Title: "Ouija: Origin of Evil", Year: "2016", Poster: "https://image.tmdb.org/t/p/w500/88P6t1jR4u4p5yU2r2P0F2y2H3D.jpg" }
  ],
  Fantasy: [
    { imdbID: "m_fan_1", Title: "The Chronicles of Narnia", Year: "2005", Poster: "https://image.tmdb.org/t/p/w500/5187092688054e9042af9f23.jpg" },
    { imdbID: "m_fan_2", Title: "Harry Potter", Year: "2001", Poster: "https://image.tmdb.org/t/p/w500/547082299de196ea013d6.jpg" },
    { imdbID: "m_fan_3", Title: "Lord of the Rings", Year: "2001", Poster: "https://image.tmdb.org/t/p/w500/461360370896922624d12aa1.jpg" },
    { imdbID: "m_fan_4", Title: "Avatar", Year: "2009", Poster: "https://image.tmdb.org/t/p/w500/45118758045943490279c0fa.jpg" }
  ],
  Music: [
    { imdbID: "m_mus_1", Title: "Whiplash", Year: "2014", Poster: "https://image.tmdb.org/t/p/w500/6bbZ6z1C2ea1z6L2aH3k4Wd9a6c.jpg" },
    { imdbID: "m_mus_2", Title: "Bohemian Rhapsody", Year: "2018", Poster: "https://image.tmdb.org/t/p/w500/511671782779c97d3d27a1d4.jpg" },
    { imdbID: "m_mus_3", Title: "La La Land", Year: "2016", Poster: "https://image.tmdb.org/t/p/w500/50870011589245ecd05ae2ad.jpg" },
    { imdbID: "m_mus_4", Title: "A Star Is Born", Year: "2018", Poster: "https://image.tmdb.org/t/p/w500/498038432885c6f3f1b912ee.jpg" }
  ],
  Fiction: [
    { imdbID: "m_fic_1", Title: "Interstellar", Year: "2014", Poster: "https://image.tmdb.org/t/p/w500/gEU2QOc432i6p3B5a8fC6d18a.jpg" },
    { imdbID: "m_fic_2", Title: "The Matrix", Year: "1999", Poster: "https://image.tmdb.org/t/p/w500/f89s12k.jpg" },
    { imdbID: "m_fic_3", Title: "Blade Runner 2049", Year: "2017", Poster: "https://image.tmdb.org/t/p/w500/4787201430336a972678c304.jpg" },
    { imdbID: "m_fic_4", Title: "Arrival", Year: "2016", Poster: "https://image.tmdb.org/t/p/w500/509198397868475647b2a1e5.jpg" }
  ]
};

const MOCK_MOVIE_DETAILS = {
  // Action
  m_act_1: { Title: "Black Adam", Year: "2022", Rated: "PG-13", Released: "21 Oct 2022", Runtime: "125 min", Genre: "Action, Adventure, Fantasy", Director: "Jaume Collet-Serra", Actors: "Dwayne Johnson, Aldis Hodge, Pierce Brosnan", Plot: "Nearly 5,000 years after he was bestowed with the almighty powers of the ancient gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.", Poster: "https://image.tmdb.org/t/p/w500/pMyyQyN2f059k6SjK0473H7613z.jpg", imdbRating: "6.3" },
  m_act_2: { Title: "Eternals", Year: "2021", Rated: "PG-13", Released: "05 Nov 2021", Runtime: "156 min", Genre: "Action, Adventure, Fantasy", Director: "Chloé Zhao", Actors: "Gemma Chan, Richard Madden, Angelina Jolie", Plot: "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.", Poster: "https://image.tmdb.org/t/p/w500/6GcLIZ3xwiQWd4J5M4dJ8T0u3aI.jpg", imdbRating: "6.3" },
  m_act_3: { Title: "Top Gun: Maverick", Year: "2022", Rated: "PG-13", Released: "27 May 2022", Runtime: "130 min", Genre: "Action, Drama", Director: "Joseph Kosinski", Actors: "Tom Cruise, Miles Teller, Jennifer Connelly", Plot: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice.", Poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBOJk1DXNq5N8.jpg", imdbRating: "8.3" },
  m_act_4: { Title: "Tenet", Year: "2020", Rated: "PG-13", Released: "03 Sep 2020", Runtime: "150 min", Genre: "Action, Sci-Fi", Director: "Christopher Nolan", Actors: "John David Washington, Robert Pattinson, Elizabeth Debicki", Plot: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.", Poster: "https://image.tmdb.org/t/p/w500/k68nPLbISTwPUB5xnETX7q65X7T.jpg", imdbRating: "7.3" },
  // Drama
  m_dra_1: { Title: "The Shawshank Redemption", Year: "1994", Rated: "R", Released: "14 Oct 1994", Runtime: "142 min", Genre: "Drama", Director: "Frank Darabont", Actors: "Tim Robbins, Morgan Freeman, Bob Gunton", Plot: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.", Poster: "https://image.tmdb.org/t/p/w500/9cq0QOi4tx7crx75krA00jMB59z.jpg", imdbRating: "9.3" },
  m_dra_2: { Title: "The Godfather", Year: "1972", Rated: "R", Released: "24 Mar 1972", Runtime: "175 min", Genre: "Crime, Drama", Director: "Francis Ford Coppola", Actors: "Marlon Brando, Al Pacino, James Caan", Plot: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.", Poster: "https://image.tmdb.org/t/p/w500/3bhkrj6PjOqZEyGDkSTabc611Z6.jpg", imdbRating: "9.2" },
  m_dra_3: { Title: "Fight Club", Year: "1999", Rated: "R", Released: "15 Oct 1999", Runtime: "139 min", Genre: "Drama", Director: "David Fincher", Actors: "Brad Pitt, Edward Norton, Meat Loaf", Plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.", Poster: "https://image.tmdb.org/t/p/w500/pB8BM76G65567uOPM3aGL2t41tK.jpg", imdbRating: "8.8" },
  m_dra_4: { Title: "Forrest Gump", Year: "1994", Rated: "PG-13", Released: "06 Jul 1994", Runtime: "142 min", Genre: "Drama, Romance", Director: "Robert Zemeckis", Actors: "Tom Hanks, Robin Wright, Gary Sinise", Plot: "The history of the United States from the 1950s to the 1970s unfolds from the perspective of an Alabama man with an IQ of 75, who longs to be reunited with his childhood sweetheart.", Poster: "https://image.tmdb.org/t/p/w500/arw2vcJmH168g06iI0tgh0j3Nu5.jpg", imdbRating: "8.8" },
  // Thriller
  m_thr_1: { Title: "Oxygen", Year: "2021", Rated: "TV-MA", Released: "12 May 2021", Runtime: "101 min", Genre: "Drama, Sci-Fi, Thriller", Director: "Alexandre Aja", Actors: "Mélanie Laurent, Mathieu Amalric, Malik Zidi", Plot: "A woman wakes up in a cryogenic unit with no memory. Running out of oxygen, she must find a way to rebuild her memory to find a way out of her nightmare.", Poster: "https://image.tmdb.org/t/p/w500/45hF7lU9z25u220vH5b4P3n7p2e.jpg", imdbRating: "6.5" },
  m_thr_2: { Title: "Smile", Year: "2022", Rated: "R", Released: "30 Sep 2022", Runtime: "115 min", Genre: "Horror, Mystery, Thriller", Director: "Parker Finn", Actors: "Sosie Bacon, Jessie T. Usher, Kyle Gallner", Plot: "After witnessing a bizarre, traumatic incident involving a patient, Dr. Rose Cotter starts experiencing frightening occurrences that she can't explain.", Poster: "https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg", imdbRating: "6.6" },
  m_thr_3: { Title: "The Gray Man", Year: "2022", Rated: "PG-13", Released: "22 Jul 2022", Runtime: "122 min", Genre: "Action, Thriller", Director: "Anthony Russo, Joe Russo", Actors: "Ryan Gosling, Chris Evans, Ana de Armas", Plot: "When the CIA's most skilled mercenary accidentally uncovers dark agency secrets, he becomes a primary target and is hunted around the world by psychopathic former colleagues.", Poster: "https://image.tmdb.org/t/p/w500/8cXbitsSgnWbH46P7i1j33p2a0b.jpg", imdbRating: "6.5" },
  m_thr_4: { Title: "The Menu", Year: "2022", Rated: "R", Released: "18 Nov 2022", Runtime: "107 min", Genre: "Horror, Thriller", Director: "Mark Mylod", Actors: "Ralph Fiennes, Anya Taylor-Joy, Nicholas Hoult", Plot: "A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.", Poster: "https://image.tmdb.org/t/p/w500/fLIeKzb1t6K60h0m5e4p4r5a9.jpg", imdbRating: "7.2" },
  // Horror
  m_hor_1: { Title: "M3GAN", Year: "2022", Rated: "PG-13", Released: "06 Jan 2023", Runtime: "102 min", Genre: "Horror, Sci-Fi, Thriller", Director: "Gerard Johnstone", Actors: "Allison Williams, Violet McGraw, Ronny Chieng", Plot: "A robotics engineer at a toy company builds a life-like doll that begins to take on a life of its own.", Poster: "https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg", imdbRating: "6.4" },
  m_hor_2: { Title: "The Invitation", Year: "2022", Rated: "PG-13", Released: "26 Aug 2022", Runtime: "105 min", Genre: "Horror, Thriller", Director: "Jessica M. Thompson", Actors: "Nathalie Emmanuel, Thomas Doherty, Sean Pertwee", Plot: "A young woman is courted and swept off her feet, only to realize a gothic conspiracy is afoot.", Poster: "https://image.tmdb.org/t/p/w500/jcUSQXaD1tM8P67s3t8T65nO5Vn.jpg", imdbRating: "5.3" },
  m_hor_3: { Title: "Orphan: First Kill", Year: "2022", Rated: "R", Released: "19 Aug 2022", Runtime: "99 min", Genre: "Drama, Horror, Thriller", Director: "William Brent Bell", Actors: "Isabelle Fuhrman, Julia Stiles, Hiro Kanagawa", Plot: "After orchestrating a brilliant escape from an Estonian psychiatric facility, Esther travels to America by impersonating the missing daughter of a wealthy family.", Poster: "https://image.tmdb.org/t/p/w500/wSqAXL1XTsWTaZ0Jp1aOQ2zN04F.jpg", imdbRating: "5.9" },
  m_hor_4: { Title: "Ouija: Origin of Evil", Year: "2016", Rated: "PG-13", Released: "21 Oct 2016", Runtime: "99 min", Genre: "Drama, Horror, Mystery", Director: "Mike Flanagan", Actors: "Elizabeth Reaser, Lulu Wilson, Annalise Basso", Plot: "In 1967 Los Angeles, a widowed mother and her two daughters accidentally invite authentic evil into their home by introducing a new stunt to bolster their séance scam business.", Poster: "https://image.tmdb.org/t/p/w500/88P6t1jR4u4p5yU2r2P0F2y2H3D.jpg", imdbRating: "6.2" },
  // Music
  m_mus_1: { Title: "Whiplash", Year: "2014", Rated: "R", Released: "16 Jan 2015", Runtime: "107 min", Genre: "Drama, Music", Director: "Damien Chazelle", Actors: "Miles Teller, J.K. Simmons, Paul Reiser", Plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.", Poster: "https://image.tmdb.org/t/p/w500/6bbZ6z1C2ea1z6L2aH3k4Wd9a6c.jpg", imdbRating: "8.5" },
  m_mus_2: { Title: "Bohemian Rhapsody", Year: "2018", Rated: "PG-13", Released: "02 Nov 2018", Runtime: "134 min", Genre: "Biography, Drama, Music", Director: "Bryan Singer", Actors: "Rami Malek, Lucy Boynton, Gwilym Lee", Plot: "The story of the legendary British rock band Queen and their lead singer Freddie Mercury, leading up to their famous Live Aid performance in 1985.", Poster: "https://image.tmdb.org/t/p/w500/511671782779c97d3d27a1d4.jpg", imdbRating: "7.9" },
  m_mus_3: { Title: "La La Land", Year: "2016", Rated: "PG-13", Released: "25 Dec 2016", Runtime: "128 min", Genre: "Comedy, Drama, Music", Director: "Damien Chazelle", Actors: "Ryan Gosling, Emma Stone, Rosemarie DeWitt", Plot: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.", Poster: "https://image.tmdb.org/t/p/w500/50870011589245ecd05ae2ad.jpg", imdbRating: "8.0" },
  m_mus_4: { Title: "A Star Is Born", Year: "2018", Rated: "R", Released: "05 Oct 2018", Runtime: "136 min", Genre: "Drama, Music, Romance", Director: "Bradley Cooper", Actors: "Lady Gaga, Bradley Cooper, Sam Elliott", Plot: "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.", Poster: "https://image.tmdb.org/t/p/w500/498038432885c6f3f1b912ee.jpg", imdbRating: "7.6" },
  // Western
  m_wes_1: { Title: "Django Unchained", Year: "2012", Rated: "R", Released: "25 Dec 2012", Runtime: "165 min", Genre: "Drama, Western", Director: "Quentin Tarantino", Actors: "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio", Plot: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.", Poster: "https://image.tmdb.org/t/p/w500/7oWY85jA2ea1z6L2aH3k4Wd9a6c.jpg", imdbRating: "8.4" },
  m_wes_2: { Title: "True Grit", Year: "2010", Rated: "PG-13", Released: "22 Dec 2010", Runtime: "110 min", Genre: "Drama, Western", Director: "Joel Coen, Ethan Coen", Actors: "Jeff Bridges, Hailee Steinfeld, Matt Damon", Plot: "A stubborn teenager enlists the help of a tough U.S. Marshal to track down her father's killer.", Poster: "https://image.tmdb.org/t/p/w500/51453907913025950c84af65.jpg", imdbRating: "7.6" },
  m_wes_3: { Title: "The Good, the Bad and the Ugly", Year: "1966", Rated: "Approved", Released: "29 Dec 1967", Runtime: "178 min", Genre: "Western", Director: "Sergio Leone", Actors: "Clint Eastwood, Eli Wallach, Lee Van Cleef", Plot: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.", Poster: "https://image.tmdb.org/t/p/w500/509316975850ff9c5deb0cd9.jpg", imdbRating: "8.8" },
  m_wes_4: { Title: "The Hateful Eight", Year: "2015", Rated: "R", Released: "30 Dec 2015", Runtime: "168 min", Genre: "Drama, Mystery, Thriller", Director: "Quentin Tarantino", Actors: "Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh", Plot: "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin inhabited by a collection of nefarious characters.", Poster: "https://image.tmdb.org/t/p/w500/469854523086cc02fe5d8800.jpg", imdbRating: "7.8" },
  // Fantasy
  m_fan_1: { Title: "The Chronicles of Narnia", Year: "2005", Rated: "PG", Released: "09 Dec 2005", Runtime: "143 min", Genre: "Adventure, Family, Fantasy", Director: "Andrew Adamson", Actors: "Tilda Swinton, Georgie Henley, William Moseley", Plot: "Four kids travel through a wardrobe to the land of Narnia and learn of their destiny to free it with the guidance of a mystical lion.", Poster: "https://image.tmdb.org/t/p/w500/5187092688054e9042af9f23.jpg", imdbRating: "6.9" },
  m_fan_2: { Title: "Harry Potter", Year: "2001", Rated: "PG", Released: "16 Nov 2001", Runtime: "152 min", Genre: "Adventure, Family, Fantasy", Director: "Chris Columbus", Actors: "Daniel Radcliffe, Rupert Grint, Emma Watson", Plot: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.", Poster: "https://image.tmdb.org/t/p/w500/547082299de196ea013d6.jpg", imdbRating: "7.6" },
  m_fan_3: { Title: "Lord of the Rings", Year: "2001", Rated: "PG-13", Released: "19 Dec 2001", Runtime: "178 min", Genre: "Action, Adventure, Drama", Director: "Peter Jackson", Actors: "Elijah Wood, Ian McKellen, Orlando Bloom", Plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", Poster: "https://image.tmdb.org/t/p/w500/461360370896922624d12aa1.jpg", imdbRating: "8.8" },
  m_fan_4: { Title: "Avatar", Year: "2009", Rated: "PG-13", Released: "18 Dec 2009", Runtime: "162 min", Genre: "Action, Adventure, Fantasy", Director: "James Cameron", Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver", Plot: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.", Poster: "https://image.tmdb.org/t/p/w500/45118758045943490279c0fa.jpg", imdbRating: "7.9" },
  // Romance
  m_rom_3: { Title: "Pride & Prejudice", Year: "2005", Rated: "PG", Released: "23 Nov 2005", Runtime: "129 min", Genre: "Drama, Romance", Director: "Joe Wright", Actors: "Keira Knightley, Matthew Macfadyen, Brenda Blethyn", Plot: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.", Poster: "https://image.tmdb.org/t/p/w500/494790108377be9c29b29330.jpg", imdbRating: "7.8" },
  // Fiction
  m_fic_1: { Title: "Interstellar", Year: "2014", Rated: "PG-13", Released: "07 Nov 2014", Runtime: "169 min", Genre: "Adventure, Drama, Sci-Fi", Director: "Christopher Nolan", Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain", Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", Poster: "https://image.tmdb.org/t/p/w500/gEU2QOc432i6p3B5a8fC6d18a.jpg", imdbRating: "8.6" },
  m_fic_2: { Title: "The Matrix", Year: "1999", Rated: "R", Released: "31 Mar 1999", Runtime: "136 min", Genre: "Action, Sci-Fi", Director: "Lana Wachowski, Lilly Wachowski", Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss", Plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.", Poster: "https://image.tmdb.org/t/p/w500/f89s12k.jpg", imdbRating: "8.7" },
  m_fic_3: { Title: "Blade Runner 2049", Year: "2017", Rated: "R", Released: "06 Oct 2017", Runtime: "164 min", Genre: "Action, Drama, Mystery", Director: "Denis Villeneuve", Actors: "Ryan Gosling, Harrison Ford, Ana de Armas", Plot: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.", Poster: "https://image.tmdb.org/t/p/w500/4787201430336a972678c304.jpg", imdbRating: "8.0" },
  m_fic_4: { Title: "Arrival", Year: "2016", Rated: "PG-13", Released: "11 Nov 2016", Runtime: "116 min", Genre: "Drama, Mystery, Sci-Fi", Director: "Denis Villeneuve", Actors: "Amy Adams, Jeremy Renner, Forest Whitaker", Plot: "A linguist works with the military to communicate with alien lifecforms after twelve mysterious spacecraft appear around the world.", Poster: "https://image.tmdb.org/t/p/w500/509198397868475647b2a1e5.jpg", imdbRating: "7.9" }
};

export const searchMovieByGenre = async (genreName) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY || "9b54b036";
  try {
    const response = await movieClient.get(`/?s=${encodeURIComponent(genreName)}&type=movie&apikey=${apiKey}`);
    if (response.data && response.data.Search && response.data.Search.length > 0) {
      return response.data.Search.slice(0, 4);
    }
    return MOCK_MOVIES[genreName] || MOCK_MOVIES.Action;
  } catch (error) {
    console.error(`Movie search failure for ${genreName}, falling back to mock movies:`, error);
    return MOCK_MOVIES[genreName] || MOCK_MOVIES.Action;
  }
};

export const fetchMovieDetails = async (imdbID) => {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY || "9b54b036";
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
