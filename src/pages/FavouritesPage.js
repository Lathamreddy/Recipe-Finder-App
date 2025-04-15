import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = localStorage.getItem('favourites');
    if (favs) setFavourites(JSON.parse(favs));
  }, []);

  const removeFromFavourites = (id) => {
    const updated = favourites.filter((fav) => fav.id !== id);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-orange-50 min-h-screen rounded-xl shadow-md">
      <button
      onClick={()=> navigate('/home')}
      className="mb-4 px-4 py-2 text-black rounded "
      >
         ← Back to Home
      </button>
      <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">❤️ Favourite Recipes</h2>

      {favourites.length === 0 ? (
        <p className="text-center text-gray-600">No favourites yet!</p>
      ) : (
        <ul className="space-y-3">
          {favourites.map((recipe) => (
            <li
              key={recipe.id}
              className="flex justify-between items-center p-3 bg-white rounded-md shadow hover:bg-rose-50"
            >
              <span onClick={() => navigate(`/recipe/${recipe.id}`)} className="cursor-pointer text-rose-700">
                {recipe.name}
              </span>
              <button
                onClick={() => removeFromFavourites(recipe.id)}
                className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPage;
