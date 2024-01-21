import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Upload from "./pages/upload";

function App() {
  return (
    <div className="App flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
