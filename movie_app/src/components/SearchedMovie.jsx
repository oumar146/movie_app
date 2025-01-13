import React, { useState, useEffect } from "react";
import SearchMovies from "../components/TMDB_API/SearchMovies";
import "../styles/SearchedMovie.css";
import MoviesModal from "./MovieModal";
import { useModal } from "./context/ModalContext";

const SearchedMovie = ({ input }) => {
  const { openMovieModal, closeMovieModal } = useModal();
  const [movies, setMovies] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Scroll to top when component is loaded
    window.scrollTo(0, 0);
  }, [input]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalShow(true);
    openMovieModal();
  };

  const closeModal = () => {
    setModalShow(false);
    setSelectedMovie(null);
    closeMovieModal();
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <SearchMovies input={input} setData={setMovies} />
      {movies.length > 0 ? (
        <div className="movies">
          {movies.map(
            (movie) =>
              movie.poster_path && (
                <div
                  key={movie.id}
                  className="card"
                  onClick={() => openModal(movie)} // Ouvre le modal avec les détails du film
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    title={movie.title || movie.name}
                    className="movie-position"
                  />
                </div>
              )
          )}
        </div>
      ) : (
        <p className="no-results">
          Aucun résultat trouvé pour votre recherche.
        </p>
      )}

      {/* Modal pour afficher les détails du film */}
      <MoviesModal
        modalShow={modalShow}
        closeModal={closeModal}
        movieDetails={selectedMovie}
      />
    </div>
  );
};

export default SearchedMovie;
