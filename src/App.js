import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Activate from "./pages/Activate";
import Private from "./pages/Private";
import Admin from "./pages/Admin";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/auth/activate/:token" element={<Activate />} />
          <Route path="/auth/password/forgot" element={<Forgot />} />
          <Route path="/auth/password/reset/:token" element={<Reset />} />
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
