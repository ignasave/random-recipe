const getMealBtn = document.querySelector("#get_meal");
const fullMeal = document.querySelector("#meal");

getMealBtn.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      const meal = formatMeal(data.meals[0]);
      fullMeal.innerHTML = getMealHTML(meal);
    })
    .catch((error) => {
      console.error(error);
    });
});

const formatMeal = (meal) => {
  return {
    dateModified: meal.dateModified,
    idMeal: meal.idMeal,
    area: meal.strArea,
    category: meal.strCategory,
    creativeCommonsConfirmed: meal.creativeCommonsConfirmed,
    drinkAlternate: meal.drinkAlternate,
    imageSource: meal.imageSource,
    ingredients: formatIngredientsFromMeal(meal),
    instructions: meal.strInstructions,
    mealName: meal.strMeal,
    mealThumb: meal.strMealThumb,
    source: meal.strSource,
    tags: meal.strTags,
    youtube: meal.strYoutube,
  };
};

const formatIngredientsFromMeal = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal["strIngredient" + i]) {
      const ingredient = {
        name: meal["strIngredient" + i],
        measure: meal["strMeasure" + i],
      };
      ingredients.push(ingredient);
    }
  }

  return ingredients;
};


const getMealHTML = (meal) => {
  return `<div class="meal-container">
        <div class="columns">
        <img src="${meal.mealThumb}" alt="Meal Image">
        <div class="recipe-title">${meal.mealName}</div>
        ${meal.category ? `<p class= "style-p">Category: ${meal.category}</p>` : ""}
        ${meal.area ? `<p class= "style-p">Area: ${meal.area}</p>` : ""}
        ${meal.tags ? `<p class= "style-p">Tag: ${meal.tags}</p>` : ""}
        <div class="ingredients"><p class="style-p">Ingredients:</p>
        <ul>
        ${meal.ingredients.map((ingredient) =>
            ` <li>${ingredient.name}: ${ingredient.measure}</li>`).join("")}				
            </ul>
            </div>
            <br>
            <div class="recipeInstructions">${meal.instructions}</div>
         </div>
         </div>
         ${
            meal.youtube
             ? `<div class="video-recipe">
                Video Recipe:
             <div class= "video-frame">
         <iframe width="800px" height="500px" src="https://www.youtube.com/embed/${meal.youtube}">
        </iframe></div>
            </div>`
             : ""
         }
                `
};


