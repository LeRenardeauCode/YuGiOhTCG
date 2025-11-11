import Navbar from "../src/components/Navbar";
import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NewCard from "./pages/NewCard";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/new-card" element={<NewCard />} />
      </Routes>
    </>
  );
}

export default App;
