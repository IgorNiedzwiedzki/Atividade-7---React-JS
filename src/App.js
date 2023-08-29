import React, {useEffect, useState} from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";


const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  //Adicionar Receita
  const [addRecipes, setAddRecipes] = useState(() => {
    const storedRecipes = sessionStorage.getItem('recipes');
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  
  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const addRecipe = (event) => {
    event.preventDefault();
    const newRecipe = { id, titulo, ingredientes, modoPreparo };
    setAddRecipes([...addRecipes, newRecipe]);
    setId('');
    setTitulo('');
    setIngredientes('');
    setModoPreparo('');
  };

  useEffect(() => {
    sessionStorage.setItem('recipes', JSON.stringify(addRecipes));
  }, [addRecipes]);

  // Buscar Receita
  const searcRecipes = async () =>{ 
    setIsLoading(true);
    const url = searchApi + query;
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    setRecipes(data.meals);
    setIsLoading(false)};

  useEffect(() => {
    searcRecipes();
  },[]);

  const handleSubmit = (event) => { 
    event.preventDefault();
    searcRecipes();
  }

  return (
    <div className="container">
     <h2>Hora da Larica</h2>

     <SearchBar
        isLoading={isLoading} 
        handleSubmit={handleSubmit}
        value={query}
        onChange={event => setQuery(event.target.value)}
        
     />
      
      <div className="app">
      <form onSubmit={addRecipe} className="recipe-form">
        <div className="top-section">
          <label>
            ID:
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
          </label>

          <label>
            Título:
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </label>

          <label>
            Ingredientes:
            <input type="text" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
          </label>

          <label>
            Modo de Preparo:
            <input type="text" value={modoPreparo} onChange={(e) => setModoPreparo(e.target.value)} />
          </label>
          
        </div>
        <button type="submit">Adicionar Receita</button>
        
        
      </form>  
    </div>

     <div className="recipes">
      {recipes ? recipes.map(recipe =>(
        <RecipeCard 
          key= {recipe.idMeal}
          recipe={recipe}
        />        
      ))
      : "Sem receitas!"}
     </div>
    
    <div>
    <ul>
  {addRecipes.map((recipe) => (
    <li key={recipe.id}>
      <h3>{recipe.titulo}</h3>
      <p>Ingredientes: {recipe.ingredientes}</p>
      <p>Modo de preparo: {recipe.modoPreparo}</p>
    </li>
      ))}
    </ul>
  </div>
    </div>

    
  
    
  );
}

export default App;
