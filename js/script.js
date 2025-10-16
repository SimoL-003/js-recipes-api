const cardsContainerElem = document.getElementById("cards-container");
const tagsInputElem = document.getElementById("tags");
const tagsInputValue = document.getElementById("tags").value;
const formElem = document.querySelector("form");

// axios.get("https://dummyjson.com/recipes/tags").then((resp) => {
//   const tagsArray = [];
//   for (let i = 0; i < resp.data.length; i++) {
//     tagsArray.push(resp.data[i]);
//   }
//   tagsArray.sort();
//   let tagsOption = `<option value="Qualsiasi">Tags</option>`;
//   for (let i = 0; i < tagsArray.length; i++) {
//     tagsOption += `<option value="${tagsArray[i]}">${tagsArray[i]}</option>`;
//   }
//   tagsInputElem.innerHTML = tagsOption;

//   formElem.addEventListener("submit", function (event) {
//     event.preventDefault();
//   });
// });

axios.get("https://dummyjson.com/recipes").then((resp) => {
  let card = "";
  const tagsArray = [];

  for (let i = 0; i < resp.data.recipes.length; i++) {
    let { name, image, tags, difficulty } = resp.data.recipes[i];
    difficulty = difficulty.toLowerCase();

    // FORM
    // Creazione dei valori del select dei tag
    let tagsOption = `<option value="Qualsiasi">Tags</option>`;
    for (let ii = 0; ii < tagsArray.length; ii++) {
      tagsOption += `<option value="${tagsArray[ii]}">${tagsArray[ii]}</option>`;
    }
    tagsInputElem.innerHTML = tagsOption;

    // CARD
    // Creazione badge per i tag da inserire nella card
    tagsSpan = "";
    for (let ii = 0; ii < tags.length; ii++) {
      let curTag = tags[ii];
      tagsSpan += `<span class="badge">${curTag}</span>`;
      if (contains(tagsArray, curTag) === false) {
        tagsArray.push(curTag);
      }
    }

    // Creazione card
    card += `
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
  }
  cardsContainerElem.innerHTML = card;
});

function contains(array, obj) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      return true;
    }
  }
  return false;
}
