import React, { useState } from "react";
// import "../styles/favourite.css";
import FetchFavourites from "../components/API_MOVIE_APP/FetchFavourites";
import Header from "../components/Header";
import MoviesModal from "../components/MovieModal";
import { useModal } from "../components/context/ModalContext";

const Favourite = () => {
  const { openMovieModal, closeMovieModal } = useModal();
  const [favourites, setFavourites] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalShow(true);
    openMovieModal();
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalShow(false);
    closeMovieModal();
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <FetchFavourites setData={setFavourites} data = {favourites} />
      <Header />
      {favourites.length > 0 ? (
        <div className={`movies ${favourites.length >= 4 ? "centered" : ""}`}>
          {favourites.map(
            (movie) =>
              movie.poster_path && (
                <div
                  key={movie.id}
                  className="movie-card" // Utilisation de la nouvelle classe
                  onClick={() => openModal(movie)} // Ouvre le modal avec les détails du film
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    title={movie.title || movie.name}
                    className="movie-position"
                  />
                  <p className="movie-title">
                    {movie.title
                      ? movie.title
                      : "Le titre n'est pas disponible"}
                  </p>
                </div>
              )
          )}
        </div>
      ) : (
        <p className="no-results">Pas de favoris</p>
      )}
      {modalShow && selectedMovie && (
        <MoviesModal
          closeModal={closeModal}
          movieDetails={selectedMovie}
          modalShow={modalShow}
        />
      )}
    </div>
  );
};

export default Favourite;
