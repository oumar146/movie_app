import React, { useEffect } from "react";
// Importation du token d'authentification depuis le fichier de configuration
import config from '../../config';

/*
Ce composant à besoins des props suivant : 
- url = url de la catégorie de film (voir documentation TMDB) 
- setData = fonction pour changer la valeur d'un state 
*/
const Movies = (props) => {

    useEffect(() => {
        // Options de la requête fetch
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${config.TOKEN}` // Authentification avec le token
            }
        };

        // Requête fetch à l'API TMDb
        fetch(`${props.url}`, options)
            .then(response => response.json())
            .then(response => props.setData(response.results))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
        </div>
    );
};

export default Movies;
