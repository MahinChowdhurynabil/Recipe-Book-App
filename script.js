const API_KEY = "1a35c92ad71a47ee9c64aa8f310f4816";
const recipeList = document.querySelector(".recipe-list");

function displayRecipes(recipes) {
  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItem = document.createElement("li");
    recipeItem.classList.add("recipe-item");
    recipeList.appendChild(recipeItem);

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = "recipe image";
    recipeItem.appendChild(recipeImage);

    const recipeTitle = document.createElement("h2");
    recipeTitle.innerHTML = recipe.title;
    recipeItem.appendChild(recipeTitle);

    const recipeIngrediants = document.createElement("p");
    recipeIngrediants.innerHTML = `<strong>Ingrediants</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;
    recipeItem.appendChild(recipeIngrediants);

    const viewRecipe = document.createElement("a");
    viewRecipe.classList.add("btn", "btn-primary"); // Adding Bootstrap classes
    viewRecipe.textContent = "View Recipe";
    viewRecipe.id = "btn";

    viewRecipe.href = recipe.sourceUrl;
    recipeItem.appendChild(viewRecipe);
    // const viewRecipe = document.createElement("a");
    // viewRecipe.classList.add("btn btn-primary");
    // // viewRecipe.setAttribute("id, btn");
    // recipeItem.appendChild(viewRecipe);
    // // recipeLink = document.createElement("a");
    // // recipeLink.href = recipe.sourseUrl;
    // // recipeLink.innerHTML = "View Recipe";
    // // recipeItem.appendChild(recipeLink);
  });
}

async function getRecipe() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  const data = await response.json();
  return data.recipes;
}

async function init() {
  const recipes = await getRecipe();
  displayRecipes(recipes);
}

init();
