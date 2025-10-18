const cardsContainerElem = document.getElementById("cards-container");
const tagsInputElem = document.getElementById("tags");
const mealTypeInputElem = document.getElementById("meal-type");
const cuisineInputElem = document.getElementById("cuisine");
const formElem = document.querySelector("form");

axios
  .get("https://dummyjson.com/recipes?sortBy=name&order=asc")
  .then((resp) => {
    let card = "";
    const tagsArray = [];
    const mealTypeArray = [];
    const cuisineArray = [];

    for (let i = 0; i < resp.data.recipes.length; i++) {
      const curRecipe = resp.data.recipes[i];
      const { tags, mealType, cuisine } = curRecipe;

      // Array contenente tutti i tag
      for (let ii = 0; ii < tags.length; ii++) {
        const curTag = tags[ii];
        if (!contains(tagsArray, curTag)) {
          tagsArray.push(curTag);
        }
      }

      // Array contenente tutti i meal-type
      for (let ii = 0; ii < mealType.length; ii++) {
        const curMealType = mealType[ii];
        if (!contains(mealTypeArray, curMealType)) {
          mealTypeArray.push(curMealType);
        }
      }

      // Creazione dell'array contenente tutte le cuisine
      if (!contains(cuisineArray, cuisine)) {
        cuisineArray.push(cuisine);
      }

      // Creazione card tramite funzione
      card += createCard(resp.data.recipes[i]);
    }

    // Opzioni del select dei tag
    let tagsOption = `<option value="">Tags</option>`;
    tagsArray.sort();
    for (let ii = 0; ii < tagsArray.length; ii++) {
      tagsOption += `<option value="${tagsArray[ii]}">${tagsArray[ii]}</option>`;
    }
    tagsInputElem.innerHTML = tagsOption;

    // Opzioni del select dei mealType
    let mealTypeOption = `<option value="">Meal type</option>`;
    mealTypeArray.sort();
    for (let ii = 0; ii < mealTypeArray.length; ii++) {
      mealTypeOption += `<option value="${mealTypeArray[ii]}">${mealTypeArray[ii]}</option>`;
    }
    mealTypeInputElem.innerHTML = mealTypeOption;

    // Opzioni del select di cuisine
    let cuisineOption = `<option value="">Cuisine</option>`;
    cuisineArray.sort();
    for (let ii = 0; ii < cuisineArray.length; ii++) {
      cuisineOption += `<option value="${cuisineArray[ii]}">${cuisineArray[ii]}</option>`;
    }
    cuisineInputElem.innerHTML = cuisineOption;

    // Creazione card
    cardsContainerElem.innerHTML = card;

    // Tag filter
    formElem.addEventListener("submit", function (event) {
      event.preventDefault();
      const tagsInputValue = document.getElementById("tags").value;
      const difficultyInputValue = document.getElementById("difficulty").value;
      const mealTypeInputValue = document.getElementById("meal-type").value;
      const cuisineInputValue = document.getElementById("cuisine").value;

      let recipeFiltered = [];

      // Filtro
      recipeFiltered = resp.data.recipes.filter((curRecipe) => {
        const tagFilter =
          !tagsInputValue || contains(curRecipe.tags, tagsInputValue);
        const difficultyFilter =
          !difficultyInputValue ||
          curRecipe.difficulty === difficultyInputValue;
        const mealTypeFilter =
          !mealTypeInputValue ||
          contains(curRecipe.mealType, mealTypeInputValue);
        const cuisineFilter =
          !cuisineInputValue || curRecipe.cuisine === cuisineInputValue;
        return tagFilter && difficultyFilter && mealTypeFilter && cuisineFilter;
      });
      console.log(recipeFiltered);

      // Se non viene selezionato nessun filtro, mostra tutte le ricette
      if (
        tagsInputValue +
          difficultyInputValue +
          mealTypeInputValue +
          cuisineInputValue ===
        ""
      ) {
        recipeFiltered = resp.data.recipes;
      }

      // Creazione card dopo l'applicazione dei filtri
      card = "";
      for (let i = 0; i < recipeFiltered.length; i++) {
        card += createCard(recipeFiltered[i]);
      }
      cardsContainerElem.innerHTML = card;
    });

    // Reset filter
    formElem.addEventListener("reset", function () {
      cardsContainerElem.innerHTML = resp.data.recipes.map(createCard).join("");
    });
  });

// -------------------- FUNZIONI --------------------
// Funzione che crea la card (e i badge contenuti al suo interno)
function createCard(recipe) {
  let { name, image, tags, difficulty } = recipe;
  difficulty = difficulty.toLowerCase();
  let tagsSpan = "";
  for (let ii = 0; ii < tags.length; ii++) {
    const curTag = tags[ii];
    // Creazione badge per i tag da inserire nella card
    tagsSpan += `<span class="badge">${curTag}</span>`;
  }
  // Creazione card
  let card = `
                <div class="card">
                    <div class="card__img">
                        <img src="${image}"
                             alt="${name}">
                    </div>
                    <div class="card__text">
                        <h3>${name}</h3>
                        <div class="tags">
                            ${tagsSpan}
                        </div>
                        <div class="difficulty">
                            <span class="badge ${difficulty}">${difficulty}</span>
                        </div>
                    </div>
                </div>
    `;
  return card;
}

// Funzione per verificare se un elemento è contenuto in un array. LOL ho scoperto dopo che c'è un metodo apposta, ma lascerò questa mia creazione :-)
function contains(array, elem) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === elem) {
      return true;
    }
  }
  return false;
}
