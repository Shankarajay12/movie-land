import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=8ab744b5";

function errorOcc(error)
{
  console.log("Error => "+error);
}


function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");


  const searchMovies = async (title) => {
    await fetch(`${API_URL}&s=${title}`).then(res=>res.json()).then(json=>{
      setMovies(json.Search)
    }).catch(errorOcc)
    
}

  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <div className="app">
      <h1>Movie Box</h1>
      <small>&#169; Ajay Shankar</small>

      <div className="search">
        <input
          placeholder="Enter your movie"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(search);
          }}
        ></img>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.title} movie1={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
