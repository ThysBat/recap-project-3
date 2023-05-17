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
handleCharacters(cardData.results);

nextButton.addEventListener("click", async () => {
  console.log("click");
  try {
    const data = await fetchCharacters(cardData.info.next);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

async function fetchCharacters(
  url = "https://rickandmortyapi.com/api/character"
) {
  try {
    cardContainer.innerHTML = "";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      console.error("response is not ok!");
    }
  } catch (error) {
    console.log(error);
  }
}

function handleCharacters(characters) {
  characters.forEach((character) => {
    const characterCard = createCharacterCard(
      character.name,
      character.status,
      character.type,
      character.episode.length,
      character.image
    );

    cardContainer.append(characterCard);
  });
}
