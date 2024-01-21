import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Feed from "./pages/feed";
import Upload from "./pages/upload";
import Profile from "./pages/profile";

function App() {
  return (
    <div className="App flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
