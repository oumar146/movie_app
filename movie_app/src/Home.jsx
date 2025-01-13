import { useState, useContext } from "react";
import Header from "./components/Header";
import Movies from "./components/TMDB_API/Movies";
import MoviesCarousel from "./components/MoviesCarousel";
import SearchedMovie from "./components/SearchedMovie";
import { useModal } from './components/context/ModalContext';
import "./styles/home.css";

const ClassicMoviesCarousel = () => {
  const [classicMovies, setClassicMovies] = useState([]);

  if (!classicMovies) {
    return <div>rien</div>;
  }

  return (
    <div>
      <Movies
        url="https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1"
        setData={setClassicMovies}
      />
      {classicMovies.length > 0 && (
        <MoviesCarousel title="Classiques" moviesList={classicMovies} />
      )}
    </div>
  );
};
const PopularMoviesCarousel = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  if (!popularMovies) {
    return <div>rien</div>;
  }

  return (
    <div>
      <Movies
        url="https://api.themoviedb.org/3/trending/movie/day?language=fr-FR"
        setData={setPopularMovies}
      />
      {popularMovies.length > 0 && (
        <MoviesCarousel title="Populaires" moviesList={popularMovies} />
      )}
    </div>
  );
};

const TopRatedMoviesCarousel = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  if (!topRatedMovies) {
    return <div>rien</div>;
  }

  return (
    <div>
      <Movies
        url="https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1"
        setData={setTopRatedMovies}
      />
      {topRatedMovies.length > 0 && (
        <MoviesCarousel title="Meilleures notes" moviesList={topRatedMovies} />
      )}
    </div>
  );
};

const Home = () => {
  const [input, setInput] = useState("");
  const { modalOpen } =   useModal(); 

  // Applique le flou si le modal est ouvert
  const blurStyle = modalOpen ? { filter: "blur(5px)" } : {};

  return (
    <div style={blurStyle}> {/* Applique le style ici */}
      <Header input={input} setInput={setInput} />
      {!input ? (
        <div>
          <ClassicMoviesCarousel />
          <TopRatedMoviesCarousel />
          <PopularMoviesCarousel />
        </div>
      ) : <SearchedMovie input={input} />}
    </div>
  );
};

export default Home;
