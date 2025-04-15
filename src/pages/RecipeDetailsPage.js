import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';


const RecipeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => {
        const found = data.recipes.find((r) => r.id === parseInt(id));
        setRecipe(found);
      });
  }, [id]);

  useEffect(() => {
    const favs = localStorage.getItem('favourites');
    if (favs) setFavourites(JSON.parse(favs));
  }, []);

  const toggleFavourite = () => {
    if (!recipe) return;
    const exists = favourites.find((fav) => fav.id === recipe.id);
    const updated = exists
      ? favourites.filter((fav) => fav.id !== recipe.id)
      : [...favourites, recipe];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const isFavourite = recipe && favourites.some((fav) => fav.id === recipe.id);

  if (!recipe) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-orange-50 min-h-screen rounded-xl shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-[150px] h-[150px] object-cover rounded-xl mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-rose-700 mb-2">{recipe.name}</h2>
        <p className="text-gray-600 mb-4">
          <strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins
        </p>

        <h3 className="text-lg font-semibold text-left mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside text-left mb-4 text-gray-700">
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold text-left mb-2">Instructions:</h3>
        <p className="text-left text-gray-700">{recipe.instructions}</p>

        <button
          onClick={toggleFavourite}
          className="mt-6 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
        >
          {isFavourite ? '💔 Remove from Favourites' : '❤️ Add to Favourites'}
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
