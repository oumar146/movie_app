import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import config from "../../config";

const HandleFavourites = ({ movieId }) => {
  const [isFavourite, setIsFavourite] = useState(false); // Gérer l'état du favori
  const { user } = useContext(UserContext); // Utiliser le contexte utilisateur

  // Ajouter ou supprimer des favoris
  const toggleFavourite = async () => {
    if (!user) {
      console.log("Utilisateur non connecté");
      return;
    }

    try {
      let response;
      if (isFavourite) {
        // Supprimer des favoris
        response = await fetch(`${config.apiUrl}/favourite/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id, movie_id: movieId }),
        });
      } else {
        // Ajouter aux favoris
        response = await fetch(`${config.apiUrl}/favourite/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id, movie_id: movieId }),
        });
      }

      if (!response.ok) {
        throw new Error(
          isFavourite
            ? "Erreur lors de la suppression des favoris"
            : "Erreur lors de l'ajout aux favoris"
        );
      }

      console.log(
        isFavourite
          ? `Film ${movieId} supprimé des favoris`
          : `Film ${movieId} ajouté aux favoris`
      );
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // Vérifier si le film est déjà dans les favoris
    const checkFavouriteStatus = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${config.apiUrl}/favourite/status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id, movie_id: movieId }),
        });

        if (response.ok) {
          const { isFavourite } = await response.json();
          setIsFavourite(isFavourite);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des favoris", error.message);
      }
    };

    checkFavouriteStatus();
  }, [movieId, user]);

  return (
    <div>
      {movieId && (
        <button className="trailer-btn" onClick={toggleFavourite}>
          {isFavourite ? "Supprimer des favoris" : "Ajouter aux favoris"}
        </button>
      )}
    </div>
  );
};

export default HandleFavourites;
