import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.error('Error fetching recipes:', err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === '') {
      setFilteredRecipes([]);
    } else {
      const filtered = recipes.filter((r) =>
        r.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-orange-50 min-h-screen rounded-xl shadow-md">
      <button
      onClick={()=> navigate('/home')}
      className="mb-4 px-4 text- rounded "
      >
         ← Back to Home
      </button>
      <h1 className="text-3xl font-bold text-center text-rose-600 mb-6">🍲 Recipe Finder</h1>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="🔍Search recipes..."
       
        className="w-full p-3 border border-gray-300 rounded-xl mb-6 text-lg"
      />
     

      {search && (
        <div className="bg-white p-4 rounded shadow">
          {filteredRecipes.length > 0 ? (
            <ul className="space-y-2">
              {filteredRecipes.map((recipe) => (
                <li
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="cursor-pointer text-rose-700 hover:bg-rose-50 p-2 rounded-md"
                >
                  {recipe.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recipes found for "{search}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
