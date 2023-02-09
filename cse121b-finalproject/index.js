const pokemonList = [];
let pokemonSorted;

const array = ["300", "55", "32", "30", "31"];
console.log(array);
array.sort(function(a, b){return a - b});
console.log(array);

let newArticle = document.createElement("article");
document.querySelector("#regionContainer").appendChild(newArticle);

async function getNumber() {
    // Fetch the data from the API
    const response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
    // Check if the response was successful
    if (response.ok) {
        // Parse the response from JSON
        data = await response.json();
        // Loop through the array of pokemon and get the entry_number
        data.pokemon_entries.map((pokemon) => {
            const number = pokemon.entry_number;
            // Call the getData function passing in the entry_number
            getData(number)
        });
    }
    // Call the output function once all the data has been collected
    output()
}

// Get the data from the API


// Create the HTML for the Pokemon
function createPokemon() {
    // Create a div element
    const pokemonElement = document.createElement('div');
    // Add a class to the div element
    pokemonElement.classList.add('pokemon');
    // Get the name of the pokemon
    const name = pokemonData['name'][0].toUpperCase() + pokemonData['name'].slice(1);
    // Get the id of the pokemon
    const id = pokemonData['id'];
    // Get the image of the pokemon
    const image = pokemonData['sprites']['front_default'];
    // Get the type of the pokemon
    const type = pokemonData['types'][0]['type']['name'];
    // Add the html into the div element
    pokemonElement.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}">
        </div>
        <div class="info">
            <span class="number">${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;
    // Append the div element to the pokemon container
    pokemonContainer.appendChild(pokemonElement);
}

function createPokemon() {
    // store the id of the pokemon
    const id = pokemonData.id;
    // store the name of the pokemon
    const name = pokemonData.species.name;
    // create the html string for the pokemon
    const elementHtml = `${id}. ${name}`;
    // add the pokemon html to the pokemon list
    pokemonList.push(elementHtml);
}

function output() {
    // Sort the list of pokemon
    pokemonSorted = pokemonList.sort(function(a, b){return a-b});
    // Create a new h3 element
    let newH3 = document.createElement("h3");
    // Set the text of the new h3 element to the sorted list
    newH3.innerText = pokemonList;
    // Append the new h3 element to the article element
    document.querySelector("article").append(newH3);
}

function compare(a, b) {return b - a}

getNumber()