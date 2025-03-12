import React, { useState, useContext } from "react";
// import { useModal } from "./context/ModalContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useFavorites } from "./context/FavoritesContext.jsx"; 

import "../styles/header.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    color: "black",
    backgroundColor: "#ffc03d",
  },
}));

function HeaderBadge(props) {
  return (
    <IconButton aria-label="favourite">
      <StyledBadge badgeContent={props.number} color="primary">
        {props.children}
      </StyledBadge>
    </IconButton>
  );
}

// Logo du site
const Logo = ({ setInput, setInputSearchBar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/home" || location.pathname === "/") {
      setInput("");
      setInputSearchBar("");
    } else {
      navigate("/home");
    }
  };

  return (
    <h1 onClick={handleClick} style={{ cursor: "pointer" }}>
      FilmTV
    </h1>
  );
};

const Header = ({ setInput, setInputSearchBar }) => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { favourites } = useFavorites(); 
  

  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem("token");
    navigate("/#/home");
  };
  

  return (
    <header>
      <nav className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <Logo setInput={setInput} setInputSearchBar={setInputSearchBar} />
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <NavLink to="/home">Home</NavLink>
          <NavLink to={`/${user ? "favourites" : "login"}`}>
            <HeaderBadge
              number={favourites.length ? favourites.length : null}
              className="hidden lg:flex favoris"
            >
              <div
                style={{ fontSize: "16px" }}
                className="text-white block font-semibold "
              >
                Favoris
              </div>
            </HeaderBadge>
          </NavLink>{" "}
          {user ? (
            <button onClick={handleLogout}>Se déconnecter</button>
          ) : (
            <NavLink to="/login">Se connecter</NavLink>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2">
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="dialog-panel fixed inset-0 z-10 p-5">
          <div className="flex justify-between items-center mb-4">
            <NavLink
              onClick={() => {
                setInput("");
                setMobileMenuOpen(false);
              }}
              className="text-xl font-bold"
            >
              FilmTV
            </NavLink>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            <NavLink
              to="/home"
              className="block text-sm font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to={`/${user ? "favourites" : "login"}`}
              className="block text-sm font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HeaderBadge
                number={favourites.length ? favourites.length : null}
                className="hidden lg:flex favoris"
              >
                <div
                  className="text-white text-sm block font-semibold"
                >
                  Favoris
                </div>
              </HeaderBadge>
            </NavLink>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-semibold"
              >
                Se déconnecter
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block text-sm font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Se connecter
              </NavLink>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
