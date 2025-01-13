import Home from "./Home";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ModalProvider } from "./components/context/ModalContext"; 

function App() {
  return (
    <HashRouter>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ModalProvider>
    </HashRouter>
  );
}

export default App;
