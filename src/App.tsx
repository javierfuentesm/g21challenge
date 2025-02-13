import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StateProvider } from "./context/StateContext";
import { Home } from "./screens/Home/Home";
import { Quiz } from "./screens/Quiz/Quiz";
import { Results } from "./screens/Results/Results";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 py-6 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
              <Route
                path="*"
                element={<div className="text-center">404 Not Found</div>}
              />
            </Routes>
          </div>
        </Router>
      </StateProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
