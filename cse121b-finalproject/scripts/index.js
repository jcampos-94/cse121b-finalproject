//Create an array for each region to store their belonging pokemon data:
const kanto = [];
const johto = [];
const hoenn = [];
const sinnoh = [];
const unova = [];
const kalos = [];
const alola = [];
const galar = [];
const hisui = [];
const paldea = [];

//Create an "article" element and append it to the div with with an id of regionContainer:
let newArticle = document.createElement("article");
document.querySelector("#regionContainer").appendChild(newArticle);

//Create an async function called getNumber that gets the pokemon entry number from the pokeapi url:
async function getNumber() {
  const response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
  if (response.ok) {
    data = await response.json();
    data.pokemon_entries.map((pokemon) => {
      const number = pokemon.entry_number;
      //Call the getData function with 'number' as a parameter:
      getData(number);
    });
  }
}

//Create an async function called getData that uses the parameter 'number' to extract the relevan data of all pokemon from the pokeapi url:
async function getData(number) {
  const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  if (response2.ok) {
      //Store all data received in 'pokemonData':
      pokemonData = await response2.json();
      //Call the createPokemon function with 'pokemonData' as a parameter:
      createPokemon(pokemonData);
  }
}

//Create a function called createPokemon with 'pokemonData' as a parameter.
//This functions extracts the specific data we need and sorts it by region:
function createPokemon(pokemonData) {
  const id = pokemonData.id;
  const name = pokemonData.species.name;
  const image = pokemonData.sprites.other["official-artwork"].front_default;
  //Call on the getTypesofPokemon function to get the pokemon types:
  const types = getTypesOfPokemon(pokemonData);
  //Store the required data of each pokemon in an object:
  const elementHtml = {
    pokemonId: id,
    pokemonName: name.charAt(0).toUpperCase() + name.slice(1),
    pokemonTypes: types,
    pokemonImage: image,
  };
  //Assign the pokemon data to its corresponding region array based on their pokemon id:
  //Because there are more than a thousand pokemon, we sort the list every time it receives new data to avoid errors.
  if (elementHtml.pokemonId <= 151) {
    kanto.push(elementHtml);
    sortList(kanto);
  }
  else if (elementHtml.pokemonId <= 251) {
    johto.push(elementHtml);
    sortList(johto);
  }
  else if (elementHtml.pokemonId <= 386) {
    hoenn.push(elementHtml);
    sortList(hoenn);
  }
  else if (elementHtml.pokemonId <= 493) {
    sinnoh.push(elementHtml);
    sortList(sinnoh);
  }
  else if (elementHtml.pokemonId <= 649) {
    unova.push(elementHtml);
    sortList(unova);
  }
  else if (elementHtml.pokemonId <= 721) {
    kalos.push(elementHtml);
    sortList(kalos);
  }
  else if (elementHtml.pokemonId <= 809) {
    alola.push(elementHtml);
    sortList(alola);
  }
  else if (elementHtml.pokemonId <= 898) {
    galar.push(elementHtml);
    sortList(galar);
  }
  else if (elementHtml.pokemonId <= 905) {
    hisui.push(elementHtml);
    sortList(hisui);
  }
  else if (elementHtml.pokemonId <= 1008) {
    paldea.push(elementHtml);
    sortList(paldea);
  }
}

//Create a function with a 'list' as a parameter that sorts the data inside an array of objects based on the pokemonId:
function sortList(list) {
  list.sort((a, b) => (a.pokemonId > b.pokemonId) ? 1 : (a.pokemonId < b.pokemonId) ? -1 : 0);
} 

//Create a function called getTypesOfPokemon that iterates through pokemon data to extract their types
//because some pokemon can have two types instead of one:
const getTypesOfPokemon = (pokemon) => {
  const types = pokemon.types.map((type) => type.type.name);
  return types.join(", ");
};

//Create the output function with a region list as a parameter to create the DOM elements to be displayed:
function output(region) {
  const html = region.map(
    (pokemon) => `<div class = "pokemonCard">
    <h2>Pokemon Name: ${pokemon.pokemonName}</h2>
    <h3>Pokedex Number: ${pokemon.pokemonId}</h3>
    <h3>Types: ${pokemon.pokemonTypes}</h3>
    <img src="${pokemon.pokemonImage}" />
    </div>`
  );
  document.querySelector("article").innerHTML = html.join("");
};

//Create a variable an assign it to the selectRegion element:
const selectRegion = document.getElementById("selectRegion");
//Add an event listener to the variable to run the output function depending on the selectRegion value:
if (selectRegion) {
  selectRegion.addEventListener("change", (e) => {
    const region = e.target.value;
    if (region == "Kanto") {
      output(kanto);
    }
    else if (region == "Johto") {
      output(johto);
    }
    else if (region == "Hoenn") {
      output(hoenn);
    }
    else if (region == "Sinnoh") {
      output(sinnoh);
    }
    else if (region == "Unova") {
      output(unova);
    }
    else if (region == "Kalos") {
      output(kalos);
    }
    else if (region == "Alola") {
      output(alola);
    }
    else if (region == "Galar") {
      output(galar);
    }
    else if (region == "Hisui") {
      output(hisui);
    }
    else if (region == "Paldea") {
      output(paldea);
    }
    else {
      console.log("Error");
    }
  });
}

//Start the script by running the getNumber function:
getNumber()