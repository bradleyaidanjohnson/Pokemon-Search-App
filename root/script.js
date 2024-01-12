const input = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

let pokemon = {
  name:"",
  id: "",
  weight:"",
  height:"",
  types:[],
  hp:"",
  attack:"",
  defense:"",
  specialAttack:"",
  specialDefense:"",
  speed:"",
  imgSrc: ""}

const pokeApiAllUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const specialCharsRegEx = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
const spacesRegEx = /\s/g;
const searchFormatter = (str) => str.toLowerCase().replace(specialCharsRegEx, "").replace(spacesRegEx, "-")

const fetchPokemon = async (pokemon) => {
  try {
    const res = await fetch(pokeApiAllUrl+pokemon);
    const data = await res.json();
    updatePage(data)
  } catch (err) {
    alert("Pokémon not found");
  }
}

searchButton.addEventListener("click", () => {
  const searchableInput = searchFormatter(input.value);
  fetchPokemon(searchableInput);
})

const updatePage = (pokemonData) => {
  //console.log(pokemonData)
  pokemon.name = pokemonData.name;
  pokemon.id = pokemonData.id;
  pokemon.weight = pokemonData.weight;
  pokemon.height = pokemonData.height;
  pokemon.hp = pokemonData.stats[0].base_stat;
  pokemon.attack = pokemonData.stats[1].base_stat;
  pokemon.defense = pokemonData.stats[2].base_stat;
  pokemon.specialAttack = pokemonData.stats[3].base_stat;
  pokemon.specialDefense = pokemonData.stats[4].base_stat;
  pokemon.speed = pokemonData.stats[5].base_stat;
  pokemon.imgSrc = pokemonData.sprites.front_default;

  pokemon.types = [];
  pokemonData.types.forEach(type => {
    pokemon.types.push(type.type.name);
  })

  pokemonName.innerText = pokemon.name.toUpperCase();
  pokemonId.innerText = pokemon.id;
  pokemonWeight.innerText = `Weight: ${pokemon.weight}`;
  pokemonHeight.innerText = `Height: ${pokemon.height}`;
  pokemonHp.innerText = pokemon.hp;
  pokemonAttack.innerText = pokemon.attack;
  pokemonDefense.innerText = pokemon.defense;
  pokemonSpecialAttack.innerText = pokemon.specialAttack;
  pokemonSpecialDefense.innerText = pokemon.specialDefense;
  pokemonSpeed.innerText = pokemon.speed;
  
  pokemonImg.innerHTML = `<img src="${pokemon.imgSrc}" id="sprite" alt="${pokemon.name} sprite">`;

  pokemonTypes.innerText = "";

  for (let i = 0; i < pokemon.types.length; i++) {
    if (i > 0) {
      pokemonTypes.innerHTML += " ";
    }
    pokemonTypes.innerHTML += `<span id="pokemon-type">${pokemon.types[i].toUpperCase()}</span>`;
  }
  //console.log(pokemon);
}