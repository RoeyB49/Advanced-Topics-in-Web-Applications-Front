import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/header/AppBar";
import Authorization from "./pages/authBox/Authorization.tsx";
import Home from "./pages/Home.tsx";
import ProfilePage from "./pages/profilePage/ProfilePage.tsx";
import SinglePostPage from "./pages/singlePost/singlePost.tsx";
import "./App.css";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <Router>
      <AppBar />
      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="auth-container">
                <Authorization />
              </div>
            }
          />
          <Route path="/feed" element={<Home />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/post/:id" element={<SinglePostPage />} />

          {/* Add a catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
