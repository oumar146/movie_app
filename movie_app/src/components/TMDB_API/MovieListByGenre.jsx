import { useEffect } from 'react'
const { API_KEY_TMDB, TOKEN } = require('../../config.json');

/*Ce composant à besoins des props suivant : id = id du film et setData = fonction pour changer la valeur d'un state */
const MovieListByGenre = (props) => {

    useEffect(() => {

        if (!props.id) return
        async function fetchData() {

            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY_TMDB}&with_genres=${props.id}`
                , {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${TOKEN}`
                    },
                })
            const data = await response.json()
            props.setData(data.results)
        }

        fetchData()

    }, [props.id])



    return (
        <div>

        </div>
    )

}

export default MovieListByGenre