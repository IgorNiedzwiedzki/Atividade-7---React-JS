import react from "react";

const RecipeCard = ({recipe}) => {
    const { idMeal, strMeal, strCategory, strMealThumb } = recipe;
    return (
        <div className="card">
           <img 
                src={strMealThumb}
                alt={strMeal}
                className="card-image"
           /> 
           <div className="card-body">
                <spam className="category">{strCategory}</spam>
                <h3>{strMeal}</h3>
                <a href={"https://www.themealdb.com/meal/"+idMeal} target="_blank">Ingredientes</a>
           </div>
        </div>
    );
}

export default RecipeCard;