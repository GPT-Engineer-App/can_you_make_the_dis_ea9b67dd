import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index";
import FinalScores from "./pages/FinalScores";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/final-scores" element={<FinalScores />} />
      </Routes>
    </Router>
  );
}

export default App;
