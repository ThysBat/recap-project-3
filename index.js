import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

const cardData = await fetchCharacters();

cardData.forEach((character) => {
  const characterCard = createCharacterCard(
    character.name,
    character.status,
    character.type,
    character.episode.length,
    character.image
  );

  cardContainer.append(characterCard);
});

async function fetchCharacters() {
  try {
    cardContainer.innerHTML = "";
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (response.ok) {
      const data = await response.json();

      return data.results;
    } else {
      console.error("response is not ok!");
    }
  } catch (error) {
    console.log(error);
  }
}
