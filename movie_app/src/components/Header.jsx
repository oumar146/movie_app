import { useState } from "react";
import "../styles/header.css";
// Logo du site
const Logo = ({ setInput, setInputSearchBar }) => {
  return (
    <h1
      className="logo"
      onClick={() => {
        setInput("");
        setInputSearchBar("");
      }}
    >
      StreamFlix
    </h1>
  );
};

// Barre de recherche
function SearchBar({ input, setInput, inputSearchBar, setInputSearchBar }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(inputSearchBar);
    console.log("recherche : ", inputSearchBar, input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar horizontal-alignment">
      <input
        type="text"
        placeholder="Ex : Harry Potter"
        value={inputSearchBar}
        onChange={(event) => setInputSearchBar(event.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="currentColor"
        viewBox="0 0 16 16"
        onClick={handleSubmit}
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    </form>
  );
}

//Componsant principale
const Header = ({ input, setInput }) => {
  const [inputSearchBar, setInputSearchBar] = useState("");

  return (
    <header>
      <Logo setInput={setInput} setInputSearchBar={setInputSearchBar} />
      <SearchBar
        input={input}
        setInput={setInput}
        inputSearchBar={inputSearchBar}
        setInputSearchBar={setInputSearchBar}
      />
    </header>
  );
};

export default Header;
