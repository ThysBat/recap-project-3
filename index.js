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
let page = 1;
let cardData = await fetchCharacters();
let maxPage = cardData.info.pages;
const searchQuery = "";

pagination.textContent = page + " / " + maxPage;
handleCharacters(cardData.results);

nextButton.addEventListener("click", async () => {
  try {
    if (page < maxPage) {
      page++;
      cardData = await fetchCharacters(page);
      pagination.textContent = page + " / " + maxPage;
      handleCharacters(cardData.results);
    } else {
      console.error("no next page available");
    }
  } catch (error) {
    console.log(error);
  }
});

prevButton.addEventListener("click", async () => {
  try {
    if (page > 1) {
      page--;
      cardData = await fetchCharacters(page);
      pagination.textContent = page + " / " + maxPage;
      handleCharacters(cardData.results);
    } else {
      console.error("no previous page available");
    }
  } catch (error) {
    console.log(error);
  }
});

async function fetchCharacters(url = page) {
  try {
    cardContainer.innerHTML = "";
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=" + url
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

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
