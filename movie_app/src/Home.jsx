import { useState } from "react";
import Header from "./components/Header";
import Movies from "./components/TMDB_API/Movies";
import MoviesCarousel from "./components/MoviesCarousel";
import SearchedMovie from "./components/SearchedMovie";
import "./styles/home.css";

const ClassicMoviesCarousel = () => {
  const [classicMovies, setClassicMovies] = useState([]);

  if (!classicMovies) {
    return <div>rien</div>;
  }

  return (
    <div>
      <Movies
        url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
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
        url="https://api.themoviedb.org/3/trending/movie/day?language=en-US"
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
        url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
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
  // style={{filter: "blur(5px)"}}
  return (
    <div  >
      <Header input={input} setInput={setInput} />
      {!input ? (
        <div>
          <ClassicMoviesCarousel />
          <TopRatedMoviesCarousel />
          <PopularMoviesCarousel />
        </div>
      ) : <SearchedMovie  input={input}/>}
    </div>
  );
};

export default Home;
