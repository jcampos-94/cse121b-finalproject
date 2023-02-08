const pokemonList = [];
let pokemonSorted;

const array = ["300", "55", "32", "30", "31"];
console.log(array);
array.sort(function(a, b){return a - b});
console.log(array);

let newArticle = document.createElement("article");
document.querySelector("#regionContainer").appendChild(newArticle);

async function getNumber() {
    const response = await fetch('https://pokeapi.co/api/v2/pokedex/1');
    if (response.ok) {
        data = await response.json();
        data.pokemon_entries.map((pokemon) => {
            const number = pokemon.entry_number;
            getData(number)
        });
    }
    output()
}

async function getData(number) {
    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    if (response2.ok) {
        pokemonData = await response2.json();
        //console.log(pokemonData)
        createPokemon()
    }
}

function createPokemon() {
    const id = pokemonData.id;
    const name = pokemonData.species.name;
    const elementHtml = `${id}. ${name}`;
    pokemonList.push(elementHtml);
}

function output() {
    pokemonSorted = pokemonList.sort(function(a, b){return a-b});
    let newH3 = document.createElement("h3");
    newH3.innerText = pokemonList;
    document.querySelector("article").append(newH3);
}

function compare(a, b) {return b - a}

getNumber()