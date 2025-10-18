# Recipe Filter App

## Italiano

Un'applicazione web che mostra una lista di ricette e permette di filtrare i risultati in base a **tag**, **difficoltà**, **meal type** e **cucina**.  
I dati sono ottenuti tramite un'API esterna.

---

### Descrizione

Questo progetto utilizza l'API di [dummyjson.com](https://dummyjson.com/recipes) per caricare un elenco di ricette.  
L'utente può selezionare diversi filtri da un form, e l'elenco delle card si aggiorna dinamicamente in base alle scelte effettuate.

---

### Tecnologie utilizzate

- **HTML5** — struttura della pagina  
- **CSS3** — stile e layout delle card  
- **JavaScript** — logica e gestione dei filtri  
- **Axios** — per effettuare le chiamate HTTP all'API  
- **API esterna:** `https://dummyjson.com/recipes`

---

### Funzionalità principali

- Visualizzazione dinamica di tutte le ricette in ordine alfabetico  
- Filtri combinabili per:
  - Tag  
  - Meal type  
  - Cuisine  
  - Difficoltà  
- Reset dei filtri con un clic  
- Interfaccia responsive e semplice da usare  

---

### Logica di funzionamento

1. Al caricamento, Axios scarica le ricette dall’API.  
2. I vari valori unici (tag, meal type, cuisine) vengono estratti e inseriti nei rispettivi `<select>`.  
3. L’utente può selezionare uno o più filtri dal form.  
4. Al submit, viene applicato un filtro `.filter()` sugli oggetti `recipes` per mostrare solo i risultati corrispondenti.  
5. Un reset ripristina la lista completa.

---

### Risultato

[Anteprima del progetto](https://simol-003.github.io/js-recipes-api/)

## English

A web application that displays a list of recipes and allows filtering results based on tags, difficulty, meal type, and cuisine.
The data is fetched from an external API.

---

### Description

This project uses the dummyjson.com API to load a list of recipes.
The user can select multiple filters from a form, and the recipe cards update dynamically according to the selected options.

---

### Technologies Used

- **HTML5** — page structure
- **CSS3** — card styling and layout
- **JavaScript** — logic and filter management
- **Axios** — to make HTTP requests to the API
- **External API**: `https://dummyjson.com/recipes`

---

### Main Features

- Dynamic display of all recipes in alphabetical order
- Combinable filters for:
  - Tags
  - Meal type
  - Cuisine
  - Difficulty
- One-click filter reset
- Responsive and user-friendly interface

---

### How It Works

1. On load, Axios fetches the recipes from the API.
2. Unique values (tags, meal type, cuisine) are extracted and added to their corresponding `<select>` elements.
3. The user can select one or more filters from the form.
4. On submit, a `.filter()` is applied to the `recipes` array to show only the matching results.
5. The reset button restores the full recipe list.

---

### Result

[Project preview](https://simol-003.github.io/js-recipes-api/)