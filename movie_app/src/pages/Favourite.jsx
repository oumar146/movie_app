import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MoviesModal from "../components/MovieModal";
import { useModal } from "../components/context/ModalContext";
import { useFavorites } from "../components/context/FavoritesContext";

const Favourite = () => {
  const { openMovieModal, closeMovieModal } = useModal();
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Utilisez useFavorites pour accéder à favouriteDetails
  const { favourites, favouriteDetails } = useFavorites();

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

  useEffect(() => {
    console.log("favouriteDetails in Favourite:",favourites, favouriteDetails); 
  }, [favouriteDetails]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      {favouriteDetails && favouriteDetails.length > 0 ? (
        <div
          className={`movies ${favouriteDetails.length >= 4 ? "centered" : ""}`}
        >
          {favouriteDetails.map(
            (movie) =>
              movie.poster_path && (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => openModal(movie)}
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