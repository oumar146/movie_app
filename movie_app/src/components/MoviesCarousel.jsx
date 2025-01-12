import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import MovieGenres from "./TMDB_API/MovieGenres";
import { Button, Modal } from "react-bootstrap";
import "../styles/moviesCarousel.css";

const MoviesCarousel = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    // Ajoutez ici votre logique pour récupérer les genres (ex : MovieGenres)
  }, []); // Mettre un tableau vide pour ne l'exécuter qu'une fois

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 500,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalShow(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalShow(false);
  };

  return (
    <div className="carousel-container">
      {props.moviesList.length > 0 && (
        <div>
          <MovieGenres id={genresList} setData={setGenresList} />

          {props.title && <h4 className="carousel-title">{props.title}</h4>}
          <Slider {...settings} className="carousel custom-carousel">
            {props.moviesList.map(
              (movie) =>
                movie.backdrop_path && (
                  <div
                    key={movie.id}
                    className="card"
                    onClick={() => openModal(movie)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                      alt={movie.title}
                      title={movie.title}
                    />
                    <p className="movie-title">
                      {movie.title
                        ? movie.title
                        : "Le titre n'est pas disponible"}
                    </p>
                  </div>
                )
            )}
          </Slider>
        </div>
      )}

      {/* Modal */}
      {selectedMovie && (
        <Modal
          show={modalShow}
          onHide={closeModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {selectedMovie.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="horizontal-alignment space-between">
              <p>
                <strong>Date de sortie : </strong>
                {selectedMovie.release_date}
              </p>
              <p>
                <strong>Note : </strong>
                {selectedMovie.vote_average}
              </p>
              <p>
                <strong>
                  {selectedMovie.genre_ids.length > 1
                    ? "Genres : "
                    : "Genre : "}
                </strong>
                {genresList
                  .filter((genre) => selectedMovie.genre_ids.includes(genre.id))
                  .map((genre, index, array) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < array.length - 1 && ", "}
                    </span>
                  ))}
              </p>
            </div>
            <div className="horizontal-alignment">
              <img
                src={`https://image.tmdb.org/t/p/w300/${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                title={selectedMovie.title}
              />
              <div>
                              <strong>Description</strong>
              <p>
                {selectedMovie.overview ||
                  "Pas de description disponible pour ce film."}
              </p>
              </div>

            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default MoviesCarousel;
