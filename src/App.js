// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_KEY = 'c6f99c51'
const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

const  App = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([]);

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search)
  }

  const onHitEnter = (e) => {
    var code = e.key;
    // console.log("code: ", code)
    if (code === 'Enter') {
      searchMovie(searchTerm)
    }
  }

  useEffect(() => {
    searchMovie('Spiderman')
  }, [])

  return (
    <div className="app">
     <h1>MovieLand</h1>

     <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={onHitEnter}/>
        <img 
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
          />
     </div>

     {movies?.length > 0
       ? (
          <div className='container'>
            {movies.map((movie, idx) => (
              <MovieCard key={idx} movie={movie}/>
            ))}
          </div> 
        ) : (
          <div className='empty'>
            <h1>No movies found! </h1>
          </div>
        )}
    </div>
  );
}

export default App;
