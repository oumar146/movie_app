import React, { createContext, useState, useContext } from 'react';

// Création du contexte
const ModalContext = createContext();

// Provider pour gérer l'état du modal
export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openMovieModal = () => setModalOpen(true);
  const closeMovieModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ modalOpen, openMovieModal, closeMovieModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useModal = () => useContext(ModalContext);
