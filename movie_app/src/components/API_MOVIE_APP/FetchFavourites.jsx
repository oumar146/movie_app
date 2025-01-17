import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import config from "../../config";
const { TOKEN } = require("../../config.json");

/* Composant pour récupérer les favoris et les détails des films */
const FetchFavourites = ({ setData, data}) => {
  const { user } = useContext(UserContext); // Utilisation du contexte

  useEffect(() => {
    if (!user) return;

    const fetchFavourites = async () => {
      try {
        // Récupération des favoris (IDs uniquement)
        const response = await fetch(`${config.apiUrl}/favourite/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id }),
        });

        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors de la récupération des favoris"
          );
        }

        const data = await response.json();
        const favouriteIds = data.favourites; // Tableau contenant les IDs

        // Effectuer une requête pour chaque ID à l'API TMDB
        const movieDetailsPromises = favouriteIds.map((movie) =>
          fetch(
            `https://api.themoviedb.org/3/find/${movie.movie_id}?external_source=imdb_id`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${TOKEN}`,
              },
            }
          )
            .then((res) => {
              if (!res.ok)
                throw new Error(
                  `Erreur lors de la récupération des infos pour l'ID ${movie.movie_id}`
                );
              return res.json();
            })
            .then((movieData) => ({
              imdb_id: movie.movie_id, // Ajout de l'ID IMDb
              ...movieData.movie_results[0], // Merge des détails du film avec l'IMDB_ID
            }))
        );

        // Attendre que toutes les requêtes soient terminées
        const movieDetails = await Promise.all(movieDetailsPromises);

        // Mettre à jour le state avec les données complètes des films
        setData(movieDetails);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFavourites();
  }, [user, setData, data]);

  return <div></div>;
};

export default FetchFavourites;
