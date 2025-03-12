import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";

// Exportez FavoritesContext
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);
  const [favouriteDetails, setFavouriteDetails] = useState([]);

  useEffect(() => {
    const fetchMyFavorites = async () => {
      if (!user){
        setFavourites([]);
        return;
      } 
      try {
        const response = await axios.post(`${config.apiUrl}/favourite/get`, {
          user_id: user.id,
        });
        setFavourites(response.data.favourites || []);

        const details = await Promise.all(
          response.data.favourites.map(async (movie) => {
            const movieResponse = await axios.get(
              `https://api.themoviedb.org/3/find/${movie.movie_id}?external_source=imdb_id`,
              {
                headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${config.TOKEN}`,
                },
              }
            );
            return {
              imdb_id: movie.movie_id,
              ...movieResponse.data.movie_results[0],
            };
          })
        );
        setFavouriteDetails(details);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris", error);
      }
    };
    fetchMyFavorites();
  }, [user]);

  const toggleFavorite = async (movieId, isFavorite, closeModal) => {
    if (!user) {
      closeModal();
      navigate("/login");

      return;
    }
    try {
      const url = isFavorite
        ? `${config.apiUrl}/favourite/delete`
        : `${config.apiUrl}/favourite/new`;
      const method = isFavorite ? "delete" : "post";

      await axios({
        method,
        url,
        data: { user_id: user.id, movie_id: movieId },
      });

      // Mettre à jour favourites
      setFavourites((prevFavorites) =>
        isFavorite
          ? prevFavorites.filter((favorite) => favorite.movie_id !== movieId)
          : [...prevFavorites, { movie_id: movieId }]
      );

      if (isFavorite) {
        setFavouriteDetails((prevDetails) =>
          prevDetails.filter((detail) => detail.imdb_id !== movieId)
        );
      } else {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/find/${movieId}?external_source=imdb_id`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${config.TOKEN}`,
            },
          }
        );
        setFavouriteDetails((prevDetails) => [
          ...prevDetails,
          {
            imdb_id: movieId,
            ...movieResponse.data.movie_results[0],
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de la modification des favoris", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favourites, toggleFavorite, favouriteDetails }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Exportez useFavorites pour une utilisation pratique
export const useFavorites = () => useContext(FavoritesContext);
