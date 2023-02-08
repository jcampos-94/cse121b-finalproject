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

let newArticle = document.createElement("article");
document.querySelector("#regionContainer").appendChild(newArticle);

async function getNumber() {
  const response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
  if (response.ok) {
    data = await response.json();
    data.pokemon_entries.map((pokemon) => {
      const number = pokemon.entry_number;
      getData(number);
    });
  }
}

async function getData(number) {
  const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  if (response2.ok) {
      pokemonData = await response2.json();
      createPokemon(pokemonData);
  }
}

function createPokemon(pokemonData) {
  const id = pokemonData.id;
  const name = pokemonData.species.name;
  const image = pokemonData.sprites.other["official-artwork"].front_default;
  const types = getTypesOfPokemon(pokemonData);
  const elementHtml = {
    pokemonId: id,
    pokemonName: name.charAt(0).toUpperCase() + name.slice(1),
    pokemonTypes: types,
    pokemonImage: image,
  };
  if (elementHtml.pokemonId <= 151) {
    kanto.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 251) {
    johto.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 386) {
    hoenn.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 493) {
    sinnoh.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 649) {
    unova.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 721) {
    kalos.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 809) {
    alola.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 898) {
    galar.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 905) {
    hisui.push(elementHtml);
  }
  else if (elementHtml.pokemonId <= 1008) {
    paldea.push(elementHtml);
  }
  sortList(kanto);
  sortList(johto);
  sortList(hoenn);
  sortList(sinnoh);
  sortList(unova);
  sortList(kalos);
  sortList(alola);
  sortList(galar);
  sortList(hisui);
  sortList(paldea);
}

function sortList(list) {
  list.sort((a, b) => (a.pokemonId > b.pokemonId) ? 1 : (a.pokemonId < b.pokemonId) ? -1 : 0);
} 

const getTypesOfPokemon = (pokemon) => {
  const types = pokemon.types.map((type) => type.type.name);
  return types.join(", ");
};

function output(region) {
  const html = region.map(
    (pokemon) => `
    <h2>Pokemon Name: ${pokemon.pokemonName}</h2>
    <h3>Pokedex Number: ${pokemon.pokemonId}</h3>
    <h3>Types: ${pokemon.pokemonTypes}</h3>
    <img src="${pokemon.pokemonImage}" />
    `
  );
  document.querySelector("article").innerHTML = html.join("");
};

const selectRegion = document.getElementById("selectRegion");
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

getNumber()