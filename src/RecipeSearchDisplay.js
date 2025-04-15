import React, { useEffect, useState } from 'react';
import './RecipeSearchDisplay.css';

const RecipeSearchDisplay = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedFavourite, setSelectedFavourite] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.error('Error fetching recipes:', err));
  }, []);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedRecipe(null);
    setSelectedFavourite(null);

    if (value.trim() === '') {
      setFilteredRecipes([]);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setSelectedFavourite(null);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    setSelectedFavourite(null);
  };

  const toggleFavourite = (recipe) => {
    const alreadyAdded = favourites.find((fav) => fav.id === recipe.id);
    if (alreadyAdded) {
      setFavourites((prev) => prev.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavourites((prev) => [...prev, recipe]);
    }
  };

  const isFavourited = (recipe) =>
    favourites.some((fav) => fav.id === recipe.id);

  const handleFavouriteClick = (recipe) => {
    setSelectedFavourite(recipe);
    setSelectedRecipe(null);
  };

  const renderRecipeDetails = (recipe) => (
    <div className="recipe-details">
      <button onClick={handleBack} className="back-button">← Back</button>
      <img src={recipe.image} alt={recipe.name} className="recipe-image-large" />
      <h2 className="recipe-name">{recipe.name}</h2>
      <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <div className="instructions">
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
      </div>
      <button onClick={() => toggleFavourite(recipe)} className="favorite-button">
        {isFavourited(recipe) ? '💔 Remove from Favourites' : '❤️ Add to Favourites'}
      </button>
    </div>
  );

  return (
    <div className="page-wrapper bg-orange-50">
      <div className="hero-section">
        <h1>🍽️ Welcome to Recipe Finder</h1>
        <p>Find and save your favourite recipes!</p>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {selectedRecipe && renderRecipeDetails(selectedRecipe)}
      {selectedFavourite && renderRecipeDetails(selectedFavourite)}

      {!selectedRecipe && !selectedFavourite && (
        <>
          {search.trim() && (
            <div className="recipe-grid">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <div className="recipe-card" key={recipe.id} onClick={() => handleSelect(recipe)}>
                    <img src={recipe.image} alt={recipe.name} className="recipe-thumb" />
                    <h3>{recipe.name}</h3>
                    <p>⏱ {recipe.cookTimeMinutes} mins</p>
                  </div>
                ))
              ) : (
                <p className="no-result">No recipes found for "{search}"</p>
              )}
            </div>
          )}

          {!search.trim() && favourites.length > 0 && (
            <div className="favourites-list">
              <h2>❤️ Your Favourite Recipes</h2>
              <div className="recipe-grid">
                {favourites.map((fav) => (
                  <div className="recipe-card" key={fav.id}>
                    <img
                      src={fav.image}
                      alt={fav.name}
                      className="recipe-thumb"
                      onClick={() => handleFavouriteClick(fav)}
                    />
                    <h3>{fav.name}</h3>
                    <button className="remove-button" onClick={() => toggleFavourite(fav)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeSearchDisplay;
