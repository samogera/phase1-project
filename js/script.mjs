import fetch from 'node-fetch';
import fs from 'fs/promises';

const apiUrl = 'https://api.thecatapi.com/v1/images/search';
const numberOfCats = 100; // Change this number to generate more or fewer cat images

async function fetchCatImages() {
  try {
    const response = await fetch(`${apiUrl}?limit=${230}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cat images: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(cat => ({
      id: cat.id,
      url: cat.url
    }));
  } catch (error) {
    console.error('Error fetching cat images:', error);
    return [];
  }
}

async function generateDbJson() {
  const catImages = await fetchCatImages();
  const dbData = {
    cats: catImages
  };
  try {
    await fs.writeFile('db.json', JSON.stringify(dbData, null, 2));
    console.log('db.json file has been generated successfully.');
  } catch (error) {
    console.error('Error writing to db.json:', error);
  }
}

generateDbJson();
