import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchMovies from "../components/TMDB_API/SearchMovies";
import "../styles/SearchedMovie.css";

const SearchedMovie = ({input}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Scroll to top when component is loaded
    window.scrollTo(0, 0);
  }, [input]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <SearchMovies input={input} setData={setMovies} />
      <p className="search-results">{`Résultat pour la recherche : ${input}`}</p>
      {movies.length > 0 ? (
        <div className="movies">
          {movies.map((movie) => (
            movie.poster_path &&(
            <NavLink
              key={movie.id}
              className="card"
              onClick={() => window.scrollTo(0, 0)}
              to={`/movie-page/${movie.id}`}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  title={movie.title || movie.name}
                  className="movie-position"
                />
              )}
            </NavLink>)
          ))}
        </div>
      ) : (
        <p className="no-results">Aucun résultat trouvé pour votre recherche.</p>
      )}
    </div>
  );
};

export default SearchedMovie;
