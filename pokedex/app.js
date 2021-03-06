// DOM objects
const mainScreen = document.querySelector(".main-screen");
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeHeight = document.querySelector(".poke-height");
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const aButton = document.querySelector(".abutton");
const dPadUp = document.querySelector(".top")
const dPadDown = document.querySelector(".bottom")
const dPadLeft = document.querySelector(".left")
const dPadRight = document.querySelector(".right")
let currentPokemon = 249 


// constants and variables
const TYPES = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

let prevUrl = null;
let nextUrl = null;


// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
  mainScreen.classList.remove("hide");
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

const fetchPokeList = url => {
    fetch(url)
 .then(res => res.json())
 .then(data => {
    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;

    for (let i = 0; i < pokeListItems.length ; i++) {
      const pokeListItem = pokeListItems[i];
      const resultData = results[i];
 

      if (resultData) {
       const { name, url } = resultData;
       const urlArray = url.split('/');
       const id = urlArray[urlArray.length - 2];
       pokeListItem.textContent = id + ". " + capitalize(name);
      } else {
       pokeListItem.textContent = "";
      }
    }
 });
}
const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
}

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
}

const handleLeftAButtonClick = (e) => {
fetchPokeData (Math.floor((Math.random() * 898) + 1))
}

 const handleDPadUpClick = (e) => {
   if (currentPokemon < 2) {
     return
   }
   fetchPokeData (currentPokemon - 1)
 }

 const handleDPadDownClick = (e) => {
   if (currentPokemon > 897){
     return
   }
   fetchPokeData (currentPokemon + 1)
 }

 const handleDPadLeftClick = (e) => {
   if (currentPokemon < 11) return
   fetchPokeData (currentPokemon - 10)
 }

const handleDPadRightClick = (e) => {
  if (currentPokemon > 888 ) return
  fetchPokeData (currentPokemon + 10)
}

const handleListItemClick = (e) => {
 if (!e.target) return;

 const listItem = e.target;
 if (!listItem.textContent) return;

 const id = listItem.textContent.split('.')[0];
 fetchPokeData(id);

};

const fetchPokeData = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then((res) => res.json())
  .then((data) => {
    resetScreen();

   currentPokemon = id

    const dataTypes = data["types"];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];
    pokeTypeOne.textContent = capitalize(dataFirstType["type"]["name"]);
    if (dataSecondType) {
      pokeTypeTwo.classList.remove("hide");
      pokeTypeTwo.textContent = capitalize(dataSecondType["type"]["name"]);
    } else {
      pokeTypeTwo.classList.add("hide");
      pokeTypeTwo.textContent = "";
    }
    mainScreen.classList.add(dataFirstType["type"]["name"]);

    pokeName.textContent = capitalize(data["name"]);
    pokeId.textContent = '#' + data["id"].toString().padStart(3, '0');
    pokeWeight.textContent = data["weight"];
    pokeHeight.textContent = data["height"];
    pokeFrontImage.src = data["sprites"]["front_default"] || "";
    pokeBackImage.src = data["sprites"]["back_default"] || "";
  });

}

 // Adding Event Listeners
 leftButton.addEventListener('click', handleLeftButtonClick);
 rightButton.addEventListener('click', handleRightButtonClick);
 aButton.addEventListener('click', handleLeftAButtonClick);
 dPadUp.addEventListener('click', handleDPadUpClick);
 dPadDown.addEventListener('click', handleDPadDownClick);
 dPadLeft.addEventListener('click', handleDPadLeftClick);
 dPadRight.addEventListener('click', handleDPadRightClick);
 for (const pokeListItem of pokeListItems){
      pokeListItem.addEventListener('click', handleListItemClick)
 }

 // initialize App
 fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
 fetchPokeData(currentPokemon)