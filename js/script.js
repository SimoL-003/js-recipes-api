const cardsContainerElem = document.getElementById("cards-container");
const tagsInputElem = document.getElementById("tags");
const formElem = document.querySelector("form");

axios
  .get("https://dummyjson.com/recipes?sortBy=name&order=asc")
  .then((resp) => {
    let card = "";
    const tagsArray = [];
    const difficultyArray = [];
    const mealTypeArray = [];
    const cuisineArray = [];

    for (let i = 0; i < resp.data.recipes.length; i++) {
      const curRecipe = resp.data.recipes[i];
      const { tags } = curRecipe;

      // CARD
      for (let ii = 0; ii < tags.length; ii++) {
        const curTag = tags[ii];
        // Creazione dell'array contenente tutti i tag
        if (contains(tagsArray, curTag) === false) {
          tagsArray.push(curTag);
        }
      }

      // Creazione delle opzioni del select dei tag
      let tagsOption = `<option value="">Tags</option>`;
      tagsArray.sort();
      for (let ii = 0; ii < tagsArray.length; ii++) {
        tagsOption += `<option value="${tagsArray[ii]}">${tagsArray[ii]}</option>`;
      }
      tagsInputElem.innerHTML = tagsOption;

      //   Creazione card tramite funzione
      card += createCard(resp.data.recipes[i]);
    }
    cardsContainerElem.innerHTML = card;

    // Tag filter
    formElem.addEventListener("submit", function (event) {
      event.preventDefault();
      let recipeFiltered = [];
      const tagsInputValue = document.getElementById("tags").value;
      console.log(tagsInputValue);
      for (let i = 0; i < resp.data.recipes.length; i++) {
        const curRecipe = resp.data.recipes[i];
        if (tagsInputValue && contains(curRecipe.tags, tagsInputValue)) {
          recipeFiltered.push(curRecipe);
        }
      }
      if (tagsInputValue === "") {
        recipeFiltered = resp.data.recipes;
      }
      console.log(recipeFiltered);

      card = "";
      for (let i = 0; i < recipeFiltered.length; i++) {
        card += createCard(recipeFiltered[i]);
        console.log(card);
      }
      console.log(card);
      cardsContainerElem.innerHTML = card;
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
  card = `
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

// Funzione per verificare se un elemento è contenuto in un array
function contains(array, elem) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === elem) {
      return true;
    }
  }
  return false;
}
