import React, { useEffect } from "react";
// Importation du token d'authentification depuis le fichier de configuration
const { TOKEN } = require('../../config.json');

/*Ce composant à besoins du props suivant :  setData qui est une fonction qui sert à changer la valeur d'un state */
const MovieGenres = (props) => {

    useEffect(() => {
        // Options de la requête fetch
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN}` // Authentification avec le token
            }
        };

        // Requête fetch à l'API TMDb
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR', options)
            .then(response => response.json())
            .then(response => props.setData(response.genres))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
        </div>
    );
};

export default MovieGenres;








