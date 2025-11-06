import Navbar from "../src/components/Navbar";
import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import NewCard from "./pages/NewCard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/card' element={<CardPage />} />
        <Route path='/new-card' element={<NewCard />} />
      </Routes>
    </>
  );
}

export default App;
