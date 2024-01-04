import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./pages/auth/Activate";
import Private from "./pages/Private";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/auth/activate/:token" element={<Activate />} />
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <Private />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
