import React, { useState } from "react";
import Slider from "react-slick";
import MovieGenres from "./TMDB_API/MovieGenres";
import MovieDetails from "./TMDB_API/MovieDetails";
import MoviesModal from "./MovieModal";
import { useModal } from "./context/ModalContext"; 
import "../styles/moviesCarousel.css";



const MoviesCarousel = (props) => {
  const { openMovieModal, closeMovieModal } = useModal(); 
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [genresList, setGenresList] = useState([]);

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
    openMovieModal()
    console.log("open : ", selectedMovie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalShow(false);
    closeMovieModal()
    setMovieDetails(false);
  };

  return (
    <div className="carousel-container">
      {props.moviesList.length > 0 && (
        <div>
          <MovieGenres id={genresList} setData={setGenresList} />
          {selectedMovie && (
            <div>
              <MovieDetails id={selectedMovie.id} setData={setMovieDetails} />
            </div>
          )}
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
      {modalShow && movieDetails && (
        <MoviesModal closeModal={closeModal} movieDetails={movieDetails} modalShow={modalShow}/>
      )}
    </div>
  );
};

export default MoviesCarousel;
