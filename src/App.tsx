import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StateProvider } from "./context/StateContext";
import Home from "./screens/Home/Home";
import Quiz from "./screens/Quiz/Quiz";
import Results from "./screens/Results/Results";


function App(): JSX.Element {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;