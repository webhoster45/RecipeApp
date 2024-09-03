fetch("people.json").then(response=>response.json()).then(value=>value.forEach(value=>
  console.log(value.name))
) 



const pi = document.getElementById('pi');
const input = document.getElementById('input');
const img = document.getElementById('img');
const instruction = document.getElementById('instruction');
const ingredient=document.getElementById('ingredient')
// URL of the Spoonacular API endpoint for complex search
const searchUrl = 'https://api.spoonacular.com/recipes/complexSearch';

// URL of the Spoonacular API endpoint for recipe information
const infoUrl = 'https://api.spoonacular.com/recipes/informationBulk';

// Your Spoonacular API key
const apiKey = '47db9adb797b416294bf22cc5c7f2f25';

// Function to search for recipes with complex criteria
async function searchComplexRecipes() {
  try {
    // Get the input value for the search query
    const searchTerm = input.value;

    // Construct the full URL with the search term and number of results
    const response = await fetch(`${searchUrl}?query=${searchTerm}&number=1&apiKey=${apiKey}`);
    
    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const searchResults = await response.json();

    // Get the recipe ID from the search results
    const recipeId = searchResults.results[0]?.id;
    if (!recipeId) {
      pi.textContent = "No recipes found.";
      img.src = "";
      instruction.textContent = "";
      return;
    }

    // Fetch detailed information about the recipe
    const infoResponse = await fetch(`${infoUrl}?ids=${recipeId}&apiKey=${apiKey}`);
    if (!infoResponse.ok) {
      throw new Error(`HTTP error! Status: ${infoResponse.status}`);
    }

    // Parse the JSON data
    const recipeInfo = await infoResponse.json();

    // Display the first recipe's title, image, and instructions
    if (recipeInfo.length > 0) {
      const recipe = recipeInfo[0];
      console.log(`Title: ${recipe.title}`);
      console.log(`Image: ${recipe.image}`);
      img.src = recipe.image;
      pi.textContent = recipe.title;
      instruction.innerHTML = recipe.instructions || "No instructions available.";
      
    } else {
      pi.textContent = "No recipe details found.";
      img.src = "";
      instruction.textContent = "";
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    pi.textContent = "An error occurred while fetching recipes.";
    img.src = "";
    instruction.textContent = "";
  }
}

// Call the function (you might want to call this on a button click or form submission)