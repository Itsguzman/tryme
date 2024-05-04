import { fetchBreeds, fetchCatByBreed, errorHere } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catLoader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

async function breedListOption() {
  catLoader.classList.remove('is-hidden');
  try {
    const breeds = await fetchBreeds();
    let breedsOption = breeds.map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    });

    breedSelect.insertAdjacentHTML('beforeend', breedsOption);
    catLoader.classList.add('is-hidden');
  } catch (error) {
    errorHere();
    console.error('Error fetching breeds:', error);
  }
}

breedListOption();

breedSelect.addEventListener('change', async e => {
  catLoader.classList.remove('is-hidden');
  let breedId = e.target.value;
  console.log(breedId);

  try {
    const Catbreeds = await fetchCatByBreed(breedId);
    const { url, breeds } = Catbreeds[0];
    const { name, description, temperament } = breeds[0];
    catInfo.innerHTML = `
     <div class="cat-container">
      <img src="${url}" alt="${name}" width="400" class="cat-image">
      <div class="cat-details">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
    </div>`;
    catLoader.classList.add('is-hidden');
    Notiflix.Notify.success('Success fetching data');
  } catch (error) {
    errorHere();
    console.error('Error fetching breeds:', error);
  }
});
