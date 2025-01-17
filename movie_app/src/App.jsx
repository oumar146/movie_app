import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Favourite from "./pages/Favourite";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ModalProvider } from "./components/context/ModalContext";
import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favourites" element={<Favourite />} />
          </Routes>
        </ModalProvider>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
