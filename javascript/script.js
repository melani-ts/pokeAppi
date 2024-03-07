const buttonFront = document.querySelector(".stats-button");
const cardContainer = document.querySelector(".card-container");
const cardTypeInfo = document.querySelector(".pokemon-info-type");
const cardFront = document.querySelector(".pokemon-card-front");
const cardBack = document.querySelector(".pokemon-card-back")
const buttonBack = document.querySelector(".stats-button-two")

const input = document.querySelector("#search-input");
const buttonSearch = document.querySelector("#search-button")
const pokemonName = document.querySelector(".pokemon-name");
const pokemonId = document.querySelector(".pokemon-id")
const pokemonHeight = document.querySelector("#height")
const pokemonWeight = document.querySelector("#weight");
const pokemonType = document.querySelector(".type-pokemon")
const pokemonTypeTwo = document.querySelector(".type-pokemon-two")
const pokemonImg = document.querySelector(".pokemon-image")
const pokemonHp = document.querySelector("#hp")
const pokemonAttack = document.querySelector("#attack");
const pokemonDefense = document.querySelector("#defense")
const pokemonSpDefense = document.querySelector("#sp-defense")
const pokemonSpAttack = document.querySelector("#sp-attack")
const pokemonSpeed = document.querySelector("#speed")

const typeStyles = {
  fire: ['--fire-color', '--fire-button'],
  water: ['--water-color', '--water-button'],
  steel: ['--steel-color', '--steel-button'],
  bug: ['--bug-color', '--bug-button'],
  dragon: ['--dragon-color', '--dragon-button'],
  electric: ['--electric-color', '--electric-button'],
  normal: ['--normal-color', '--normal-button'],
  grass: ['--grass-color', '--grass-button'],
  ice: ['--ice-color', '--ice-button'],
  fighting: ['--fighting-color', '--fighting-button'],
  poison: ['--poison-color', '--poison-button'],
  ground: ['--ground-color', '--ground-button'],
  flying: ['--flying-color', '--flying-button'],
  psychic: ['--psychic-color', '--psychic-button'],
  rock: ['--rock-color', '--rock-button'],
  ghost: ['--ghost-color', '--ghost-button'],
  dark: ['--dark-color', '--dark-button'],
  fairy: ['--fairy-color', '--fairy-button'],
};

const typePokemon = (data) => {
  const type = data.types[0].type.name.toLowerCase();
  if (typeStyles.hasOwnProperty(type)) {
    cardContainer.style.backgroundImage = `var(${typeStyles[type][0]})`;
    cardTypeInfo.style.backgroundColor = `var(${typeStyles[type][1]})`;
  }
};

const showCard = ((data) => {
  ({ name, id, height, weight } = data);
  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = `ID: ${id}`;
  pokemonHeight.textContent = `Height: ${height}`
  pokemonWeight.textContent = `Weight: ${weight}`
  cardTypeInfo.innerHTML = data.types
    .map(obj => `<span>${obj.type.name.toUpperCase()}</span>
      `).join('');
  pokemonImg.setAttribute('src', `${data.sprites.front_default}`);
  pokemonHp.textContent = `${data.stats[0].base_stat}`;
  pokemonAttack.textContent = `${data.stats[1].base_stat}`;
  pokemonDefense.textContent = `${data.stats[2].base_stat}`;
  pokemonSpAttack.textContent = `${data.stats[3].base_stat}`;
  pokemonSpDefense.textContent = `${data.stats[4].base_stat}`;
  pokemonSpeed.textContent = `${data.stats[5].base_stat}`;

  typePokemon(data)
})


const resetCard = () => {
  cardBack.style.display = "none";
  setTimeout(() => {
    cardFront.style.display = "block";
  }, 170)

};


const fetchData = async () => {
  const inputUser = input.value.trim().toLowerCase();

  if (!inputUser) {
    alert("Please enter a Pokémon name.");
    location.reload()
    return;
  }

  resetCard();

  try {

    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputUser}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    delayContainer();
    const data = await response.json();
    showCard(data);
    input.value = '';
  } catch (err) {
    alert(`Pokémon not found: ${err.message}`);
    location.reload()
  }
}

const delayContainer = (() => {
  setTimeout(() => {
    cardContainer.style.display = "flex"
    cardContainer.classList.add("animate__zoomIn")
    setTimeout(() => {
      cardContainer.classList.remove("animate__zoomIn")
    }, 500)
  }, 40)
})

const flipFront = () => {
  cardFront.style.display = "none"
  cardBack.style.display = "block"
  cardContainer.classList.add("animate__flipInY")
  setTimeout(() => {
    cardContainer.classList.remove("animate__flipInY")
  }, 300)
}

const flipBack = () => {
  cardFront.style.display = "block"
  cardBack.style.display = "none"
  cardContainer.classList.add("animate__flipInY")
  setTimeout(() => {
    cardContainer.classList.remove("animate__flipInY")
  }, 300)
}


buttonFront.addEventListener('click', flipFront);
buttonBack.addEventListener('click', flipBack);
buttonSearch.addEventListener('click', fetchData);
cardFront.addEventListener('click', flipFront);
cardBack.addEventListener('click', flipBack);
input.addEventListener('keydown', (e) => {
  if (e.key == "Enter") {
    fetchData()
  }
})
