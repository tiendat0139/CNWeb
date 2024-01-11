import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <Router className="App">
      <div>
        <Routes>
          {router.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.layout ? (
                  <route.layout>
                    <route.element />
                  </route.layout>
                ) : (
                  <route.element />
                )
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
