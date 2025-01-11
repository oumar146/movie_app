import { useEffect } from 'react'
// Importation du token d'authentification depuis le fichier de configuration
const { TOKEN } = require('../../config.json');

/*Ce composant à besoins des props suivant : id = id du film et setData = fonction pour changer la valeur d'un state */
const MovieVideo = (props) => {

    useEffect(() => {

        // Options de la requête fetch
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN}` // Authentification avec le token
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${props.id}/videos?language=fr-FR`, options)
            .then(response => response.json())
            .then(response => props.setData(response.results))
            .catch(err => console.error(err));

    }, [props.id])

    return (
        <div>

        </div>
    )
}


export default MovieVideo;
