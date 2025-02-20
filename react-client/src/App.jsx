import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [recent, setRecent] = useState([]);
  const [query, setQuery] = useState(""); // Search Query
const [results, setResults] = useState([]); // Search Results
const [isSearching, setIsSearching] = useState(false); // Tracks search state

  useEffect(() => {
    const getMovies = async () => {
      try {
        const url =
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODlhMGU5MmFkYzEzNWFkOTIzYzE0MjhkMTU1ZjQ1MSIsIm5iZiI6MTczOTYwNzQ5OS41ODUsInN1YiI6IjY3YjA0ZGNiZjJlMDg0YWY3ZjM2MWU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wIILZrZAI-E59SF0JMDnEAGwavCy6SGVxwbyN-DS-g8",
          },
        };

        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          const { results } = data;

          
        results.map((movie, i) => {
          if (i < 6) {
            // Add the Movie to the Trending State
            setTrending((prevState) => {
              return [...prevState, movie];
            });
          } else if (i > 5 && i < 12 && popular.length < 6) {
            // Add the Movie to the Popular State
            setPopular((prevState) => {
              return [...prevState, movie];
            });
          } else {  
            // Add the Movie to the Recent State
            setRecent((prevState) => {
              return [...prevState, movie];
            });
          } 
        });
      
          
          // Slice movies correctly
          setTrending(results.slice(0, 6));
          setPopular(results.slice(6, 12));
          setRecent(results.slice(12, 20));
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error(error);
      }
     };
    getMovies();
  }, []); // Empty dependency array ensures it runs only once

  const searchMovies = async (event) => {
    event.preventDefault();
    if (query.trim() === "") return;// Prevent empty searches
    setIsSearching(true); // Hide homepage when searching



    try {
    const response = await fetch(`${"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"}&query=${query}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODlhMGU5MmFkYzEzNWFkOTIzYzE0MjhkMTU1ZjQ1MSIsIm5iZiI6MTczOTYwNzQ5OS41ODUsInN1YiI6IjY3YjA0ZGNiZjJlMDg0YWY3ZjM2MWU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wIILZrZAI-E59SF0JMDnEAGwavCy6SGVxwbyN-DS-g8`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }


    const data = await response.json();
    setResults(data.results.slice(0, 6)); // Show only top 6 results
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};


  return (
    
    <>
       {/* <!-- Top Navigation Bar --> */}
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50">
      <div
        className="container mx-auto px-4 py-3 flex items-center justify-between"
      >
        <h1
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Moovee
        </h1>
        {/* Search Bar */}
      <form onSubmit={searchMovies} className="relative w-full max-w-xl mx-4">
        <input
          type="search"
          placeholder="Search movies & shows..."
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      {/* Search Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 px-4">
        {results.map((movie) => (
          <div key={movie.id} className="bg-gray-900 p-2 rounded-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg"
            />
            <h3 className="text-white font-semibold mt-2">{movie.title}</h3>
            <p className="text-gray-400 text-sm">{movie.release_date}</p>
          </div>
        ))}
      </div>
      </div>
    </nav>

    {/* <!-- Hero Section --> */}
    <section className="relative h-[85vh] mt-16">
      <div
        className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?movie')] bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        ></div>
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-end pb-16">
        <div className="text-white max-w-2xl">
          <h2 className="text-5xl font-bold mb-4">Featured Title</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold flex items-center gap-2"
          >
            Watch Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    {/* <!-- Movie Sections --> */}
    <main className="bg-black text-white pb-16">
      
      {/* Trending Section */}
      <MovieSection title="Trending Now" movies={trending} />

      {/* Popular Section */}
      <MovieSection title="Popular" movies={popular} />

      {/* Recent Section */}
      <MovieSection title="Recent Releases" movies={recent} />
    </main>
    </>

  );
}

// Reusable Component for Movie Sections
function MovieSection({ title, movies }) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="relative">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide px-16">
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start flex-none w-36 sm:w-48">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold truncate">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.release_date?.slice(0, 4)}</p>
            </div>
          ))}
          <button className="scroll-left absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="scroll-right absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
