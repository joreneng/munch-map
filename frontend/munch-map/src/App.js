import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";

function App() {
  return (
    <div className="App">
      Hello world!
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
