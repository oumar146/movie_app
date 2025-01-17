import React, { useState, useContext } from "react";
// import { useModal } from "./context/ModalContext";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext"; 
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "../styles/header.css"; // Assurez-vous d'avoir ce fichier pour les styles

// Logo du site
const Logo = () => {
  return (
    <h1    >
      FilmTV
    </h1>
  );
};

// Header
const Header = ({ setInput,setInputSearchBar }) => {

  const { user, updateUser } = useContext(UserContext); // Utilisation du contexte
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <header >
      <nav className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <Logo/>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <NavLink to="/home">
            Home
          </NavLink>
          <NavLink to={user ? "/favourites" : "/login"}>
            Favoris
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
            
            >
              Se déconnecter
            </button>
          ) : (
            <NavLink
              to="/login"
            
            >
              Se connecter
            </NavLink>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 "
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="dialog-panel fixed inset-0 z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <NavLink to="/home" className="text-xl font-bold">
              FilmTV
            </NavLink>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 "
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            <NavLink
              to="/home"
              className="block text-sm font-semibold "
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/favourites"
              className="block text-sm font-semibold "
              onClick={() => setMobileMenuOpen(false)}
            >
              Favoris
            </NavLink>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-semibold "
              >
                Se déconnecter
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block text-sm font-semibold "
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
