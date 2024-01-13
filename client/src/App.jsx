import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { router } from "./routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// Attach access token
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  config.headers.Authorization = accessToken? `Bearer ${accessToken}` : "";
  return config;
}, (error) => {
  return Promise.reject(error)
})

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
