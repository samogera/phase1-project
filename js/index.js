window.onload = function() {
    // Fetch cat history from Wikipedia API
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

    // Fetch random cat fact from Cat Facts API
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

    // Draw random cat image from Cat API onto canvas
    const catCanvas = document.getElementById('catCanvas');
    const ctx = catCanvas.getContext('2d');
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const catImage = new Image();
            catImage.onload = function() {
                ctx.drawImage(catImage, 0, 0, catCanvas.width, catCanvas.height);
            };
            catImage.src = data[0].url;
        })
        .catch(error => {
            console.error('Error fetching cat image:', error);
        });
};
