import React, { useState } from "react";
import MovieVideo from "./TMDB_API/MovieVideo";
import { Modal } from "react-bootstrap";

const TrailerButton = (props) => {
  const [trailer, setTrailer] = useState([]);
  return (
    <div>
      <MovieVideo id={props.movieId} setData={setTrailer} />
      {trailer.length > 0 && (
        <a
          className="trailer-btn"
          target="_blank"
          href={`https://www.youtube.com/watch?v=${trailer[0].key}`}
          rel="noopener noreferrer"
        >
          Voir le trailer
        </a>
      )}
    </div>
  );
};

const MoviesModal = ({closeModal, movieDetails, modalShow}) => {

  const formatDateToFrench = (dateString) => {
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const [year, month, day] = dateString.split("-");
    const dayWithoutZero = parseInt(day, 10); // Supprime le 0 initial
    const monthName = months[parseInt(month, 10) - 1];

    return `${dayWithoutZero} ${monthName} ${year}`;
  };

  const formatRuntime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`; // Moins d'une heure, juste les minutes
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${
      remainingMinutes > 0 ? `${remainingMinutes}min` : ""
    }`.trim();
  };


  return (
    <div>
      {movieDetails && (
        <Modal
          show={modalShow}
          onHide={closeModal}
          size="x-lg"
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="custom-modal"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {movieDetails.title || "Titre non disponible"}
            </Modal.Title>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={closeModal}
            >
              &times;
            </button>
          </Modal.Header>
          <Modal.Body>
            {/* Container de l'image et bouton */}
            <div className="modal-left">
              <img
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
                    : "https://via.placeholder.com/300x450?text=Image+non+disponible"
                }
                alt={movieDetails.title || "Image non disponible"}
                title={movieDetails.title || "Image non disponible"}
              />
              <TrailerButton movieId={movieDetails.id || ""} />
            </div>

            {/* Infos à droite */}
            <div className="modal-right">
              <strong>Description</strong>
              <p>
                {movieDetails.overview ||
                  "Pas de description disponible pour ce film."}
              </p>
              <p>
                <strong>Date de sortie : </strong>
                {movieDetails.release_date
                  ? formatDateToFrench(movieDetails.release_date)
                  : "Date non disponible"}
              </p>
              <p>
                <strong>Durée : </strong>
                {movieDetails.runtime
                  ? formatRuntime(movieDetails.runtime)
                  : "Non disponible"}
              </p>
              <p>
                <strong>Note : </strong>
                {parseFloat(movieDetails.vote_average).toFixed(1) || "Note non disponible"}
              </p>
              <p>
                <strong>
                  {movieDetails.genres && movieDetails.genres.length > 1
                    ? "Genres : "
                    : "Genre : "}
                </strong>
                {movieDetails.genres && movieDetails.genres.length > 0
                  ? movieDetails.genres.map((genre, index, array) => (
                      <span key={genre.id}>
                        {genre.name}
                        {index < array.length - 1 && ", "}
                      </span>
                    ))
                  : "Genres non disponibles"}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default MoviesModal;
