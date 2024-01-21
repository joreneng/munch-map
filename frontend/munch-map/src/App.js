import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Feed from "./pages/feed";
import Upload from "./pages/upload";
import Profile from "./pages/profile";
import OrderHistory from "./pages/orderHistory"
import Dropoffs from "./pages/Dropoffs";
import Pickups from "./pages/Pickups";

function App() {
  return (
    <div className="App flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/dropoffs" element={<Dropoffs />} />
          <Route path="/pickups" element={<Pickups />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
