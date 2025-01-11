import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Logo du site
const Logo = () => {
  return <h1 className="Logo">StreamFlix</h1>;
};

// Barre de recherche
function SearchBar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {

  };

  
  return (
    <header className="horizontal-alignment">
      <form onSubmit={handleSubmit} className="search-bar horizontal-alignment">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18" 
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          type="text"
          placeholder="Ex : Harry Potter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </header>
  );
}

//Componsant principale
const Header = () => {
  return(
  <div>
    <Logo />
    <SearchBar />
  </div>)

};

export default Header;
