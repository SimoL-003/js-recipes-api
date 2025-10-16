const cardsContainerElem = document.getElementById("cards-container");

axios.get("https://dummyjson.com/recipes").then((resp) => {
  console.log(resp);

  let card = "";
  for (let i = 0; i < resp.data.recipes.length; i++) {
    let { name, image, tags, difficulty } = resp.data.recipes[i];
    difficulty = difficulty.toLowerCase();

    console.log(resp.data.recipes[i]);

    tagsSpan = "";
    for (let ii = 0; ii < tags.length; ii++) {
      let curTag = tags[ii];
      tagsSpan += `<span class="badge">${curTag}</span>`;
    }

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
