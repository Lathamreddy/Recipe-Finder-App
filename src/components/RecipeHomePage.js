// import React, { useEffect, useState } from 'react';
// import './RecipeHomePage.css';

// const RecipeHomePage = () => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     fetch('https://dummyjson.com/recipes')
//       .then((res) => res.json())
//       .then((data) => setRecipes(data.recipes))
//       .catch((err) => console.error('Error fetching recipes:', err));
//   }, []);

//   return (
//     <div className="homepage-container">
//       <h1 className="homepage-title">🍽️ Trending Recipes </h1>
//       <div className="card-grid">
//         {recipes.slice(0, 9).map((recipe, index) => (
//           <div className="recipe-card" key={recipe.id}>
            
            
//             <img src={recipe.image} alt={recipe.name} className="card-image" />
//             <div className="card-details">
//               <h2 className="card-title">{recipe.name}</h2>
//               <p className="card-description">
//                 {Array.isArray(recipe.cuisine)
//                   ? recipe.cuisine.join(', ')
//                   : recipe.cuisine || 'Unknown Cuisine'}
//               </p>
//               <div className="card-meta">
//                 <span className="time">{30 + index * 3} min</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecipeHomePage;


import React, { useEffect, useState } from 'react';
import './RecipeHomePage.css';
import { Link } from 'react-router-dom';
 
const RecipeHomePage = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.error('Error fetching recipes:', err));
  }, []);
  return (
    <div className="homepage-container">
      <div className="header">
        <nav className='hh1'>
 
          <Link to="/">🏠 Home</Link>
          <Link to="/search">🔍 Search</Link>
          <Link to="/favourites">❤️Favourites    </Link>
          <Link to="/logout" className="btn btn-danger ms-2" >    Logout</Link>
        </nav>
      </div>
      <h1 className="homepage-title">🍽️ Trending Recipes</h1>
 
      <div className="card-grid">
 
 
        {recipes.slice(0, 9).map((recipe, index) => (
          <div className="recipe-card" key={recipe.id}>
 
 
            <img src={recipe.image} alt={recipe.name} className="card-image" />
            <div className="card-details">
              <h2 className="card-title">{recipe.name}</h2>
              <p className="card-description">
                {Array.isArray(recipe.cuisine)
                  ? recipe.cuisine.join(', ')
                  : recipe.cuisine || 'Unknown Cuisine'}
              </p>
              <div className="card-meta">
                <span className="time">{30 + index * 3} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
 
    </div>
 
  );
};
 
export default RecipeHomePage;