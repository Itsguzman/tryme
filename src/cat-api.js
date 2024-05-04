import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_YdkyQe0BN5EUzz621lHK6ymavDMyroNSgFQSjYvL15GC1yCzG7pJ5Sdt4rj7Nktb';

export async function fetchBreeds() {
  try {
    const response = await axios.get(`${BASE_URL}/breeds`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    // const breeds = response.data.map(breed => breed.name);
    const breeds = response.data;
    return breeds;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return [];
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/images/search?breed_ids=${breedId}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );

    // const breeds = response.data.map(breed => breed.name);
    const selectedBreeds = response.data;
    return selectedBreeds;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return [];
  }
}
