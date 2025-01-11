import { useEffect } from 'react'
// Importation du token d'authentification depuis le fichier de configuration
const { TOKEN } = require('../../config.json');

/*Ce composant à besoins des props suivant : id = id du film et setData = fonction pour changer la valeur d'un state */
const SearchMovies = (props) => {

    useEffect(() => {

        // Options de la requête fetch
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN}` // Authentification avec le token
            }
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${props.input}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => props.setData(response.results))
            .catch(err => console.error(err));

    }, [props.input])

    return (
        <div>

        </div>
    )
}


export default SearchMovies;
