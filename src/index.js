const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');

searchBtn.addEventListener('click', () => {
    const title = searchBar.value;
    if (title) {
        // encodeURIComponent
        //  encodes a URI by replacing each instance of certain characters by one, two, three, 
        // or four escape sequences representing the UTF-8 encoding of the character
        fetch(`/.netlify/functions/searchMovies?title=${encodeURIComponent(title)}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
            displayMovies(data.Search)
            } else {
            alert("No results found")
            }
        })
        .catch(err => console.error("Error fetching data:", err))
    }
});
¨
// Ensures a non-empty trimmed string is returned, or falls back to a default
function toNonEmptyString(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

// Shortens a string to the given length
function truncateSummary(summary, maxLength) {
  const safe = toNonEmptyString(summary, '')
  return safe.length > maxLength ? safe.substring(0, maxLength) + '...' : safe
}


function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach((movie) => {
        const detailsUrl = `/.netlify/functions/getMovieDetails?imdbID=${movie.imdbID}`;

        fetch(detailsUrl)
        .then(response => response.json())
        .then(details => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie-element');

                const movieHTML = `
                    <img src="${details.Poster}" alt="${details.Title} Poster" class="movie-poster">
                    <div class="movie-details">
                        <h2 class="movie-title">${details.Title}</h2>
                        <div class="movie-meta">
                            <span class="movie-duration">${details.Runtime}</span>
                            <span class="movie-genre">${details.Genre}</span>
                        </div>
                        <p class="movie-rating">⭐ ${details.imdbRating}</p>
                        <p class="movie-summary">${truncateSummary(details?.Plot ?? "", 150)} <button class="read-more">Read more</button></p>
                        <button class="watchlist-btn">+ Watchlist</button>
                    </div>

                `;

                movieElement.innerHTML = movieHTML;
                movieContainer.appendChild(movieElement);
        
// Event listener for the Read More button
const readMoreBtn = movieElement.querySelector('.read-more');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', function() {
        // Traverse up to the movie-details div, then find the .movie-summary within it
        const summaryText = movieElement.querySelector('.movie-summary');
        if (summaryText) {
            summaryText.textContent = details.Plot; // Show full summary
            this.remove(); // Optionally remove the Read More button
        } else {
            console.error('Movie summary element not found');
        }
    });
}


                // Event listener for the Watchlist button
                const watchlistBtn = movieElement.querySelector('.watchlist-btn');
                watchlistBtn.addEventListener('click', function() {
                    addToWatchlist(details);
                });
            })
            .catch(error => console.error('Error fetching movie details:', error));
    });
}

function addToWatchlist(movieDetails) {
    // Retrieve existing watchlist from localStorage, or initialize to an empty array if none exists
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    // Add the new movieDetails to the watchlist array
    watchlist.push(movieDetails);
    
    // Save the updated watchlist back to localStorage
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    alert('Added to watchlist');
}


