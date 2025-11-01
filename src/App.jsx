import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailsPage from "./components/DetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details" element={<DetailsPage />} />
    </Routes>
  );
}

export default App;
