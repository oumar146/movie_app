import { useState } from "react";
import Header from "../components/Header";
import Movies from "../components/TMDB_API/Movies";
import MoviesCarousel from "../components/MoviesCarousel";
import SearchedMovie from "../components/SearchedMovie";
import SearchBar from "../components/SearchBar";
import { useModal } from '../components/context/ModalContext';
import "../styles/home.css";

const RecentMoviesCarousel = () => {
  const [recentMovies, setRecentMovies] = useState([]);

  if (!recentMovies) {
    return <div>Chargement des films récents...</div>;
  }

  return (
    <div>
      <Movies
        url="https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1"
        setData={setRecentMovies}
      />
      {recentMovies.length > 0 && (
        <MoviesCarousel title="Films les Plus Récents" moviesList={recentMovies} />
      )}
    </div>
  );
};

const PopularMoviesCarousel = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  if (!popularMovies) {
    return <div>Chargement des films populaires...</div>;
  }

  return (
    <div>
      <Movies
        url="https://api.themoviedb.org/3/trending/movie/day?language=fr-FR"
        setData={setPopularMovies}
      />
      {popularMovies.length > 0 && (
        <MoviesCarousel title="Films Populaires" moviesList={popularMovies} />
      )}
    </div>
  );
};

const TopRatedMoviesCarousel = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  if (!topRatedMovies) {
    return <div>Chargement des films les mieux notés...</div>;
  }

  return (
    <div>
      <Movies
        url="https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1"
        setData={setTopRatedMovies}
      />
      {topRatedMovies.length > 0 && (
        <MoviesCarousel title="Films les Mieux Notés" moviesList={topRatedMovies} />
      )}
    </div>
  );
};

const Home = () => {
  const [input, setInput] = useState("");
    const [inputSearchBar, setInputSearchBar] = useState("");
  const { modalOpen } =   useModal(); 

  // Applique le flou si le modal est ouvert
  const blurStyle = modalOpen ? { filter: "blur(5px)" } : {};

  return (
    <div style={blurStyle}> {/* Applique le style ici */}
      <Header input={input} setInput={setInput} setInputSearchBar={setInputSearchBar}/>
      <SearchBar
            inputSearchBar={inputSearchBar}
            setInputSearchBar={setInputSearchBar}
            setInput={setInput}
          />
      {!input ? (
        <div>
          <RecentMoviesCarousel />
          <TopRatedMoviesCarousel />
          <PopularMoviesCarousel />
        </div>
      ) : <SearchedMovie input={input} />}
    </div>
  );
};

export default Home;
