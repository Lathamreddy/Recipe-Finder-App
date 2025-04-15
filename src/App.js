import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FavouritesPage from './pages/FavouritesPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import RecipeHomePage from './components/RecipeHomePage';
import Login from './pages/Login';
import Logout from './pages/LogOut';
import SignUp from './pages/SignUp';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  const hideNavPaths = ['/', '/signup'];

  // Hide navigation on login and signup pages
  if (hideNavPaths.includes(location.pathname)) return null;
};

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <Navigation />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<RecipeHomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
