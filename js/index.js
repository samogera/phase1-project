window.onload = function() {
    // Fetch cat history from Wikipedia API
    fetchCatHistory();

    // Fetch random cat fact from Cat Facts API
    fetchCatFact();

    // Load cat images from db.json
    fetchCatImages();
};

function fetchCatHistory() {
    fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Cat')
        .then(response => response.json())
        .then(data => {
            const historySection = document.getElementById('history');
            historySection.innerHTML = `
                <h2>Cat History</h2>
                <p>${data.extract}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching cat history:', error);
        });
}

function fetchCatFact() {
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            const factsSection = document.getElementById('facts');
            factsSection.innerHTML = `
                <h2>Random Cat Fact</h2>
                <p>${data.fact}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching cat fact:', error);
        });
}

function fetchCatImages() {
    fetch('https://json-server-8njc.onrender.com/cats')
        .then(response => response.json())
        .then(data => {
            const catImages = data.cats;
            const randomIndex = Math.floor(Math.random() * catImages.length);
            const randomCatImageUrl = catImages[randomIndex].url;
            displayCatImage(randomCatImageUrl);
        })
        .catch(error => {
            console.error('Error fetching cat images:', error);
        });
}

function displayCatImage(imageUrl) {
    const catCanvas = document.getElementById('catCanvas');
    const ctx = catCanvas.getContext('2d');
    const catImage = new Image();
    catImage.onload = function() {
        ctx.drawImage(catImage, 0, 0, catCanvas.width, catCanvas.height);
    };
    catImage.src = imageUrl;
}
