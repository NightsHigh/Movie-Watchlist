document.addEventListener('DOMContentLoaded', () => {
    const movieContainer = document.getElementById('movie-container');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Check if the watchlist is empty
    if (watchlist.length === 0) {
        movieContainer.innerHTML = '<p>Your watchlist is looking a little empty...</p>';
        return;
    }

    // Clear the default or previous content
    movieContainer.innerHTML = '';

watchlist.forEach(movieDetails => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-element');
    movieElement.setAttribute('data-id', movieDetails.imdbID); 
    const movieHTML = `
        <img src="${movieDetails.Poster}" alt="${movieDetails.Title} Poster" class="movie-poster">
        <div class="movie-details">
            <h2 class="movie-title">${movieDetails.Title}</h2>
            <div class="movie-meta">
                <span class="movie-duration">${movieDetails.Runtime}</span>
                <span class="movie-genre">${movieDetails.Genre}</span>
            </div>
            <p class="movie-rating">⭐ ${movieDetails.imdbRating}</p>
            <p class="movie-summary">${movieDetails.Plot}</p>
            <button class="remove-watchlist-btn">Remove</button>
        </div>
    `;
    movieElement.innerHTML = movieHTML;
    movieContainer.appendChild(movieElement);
});

});
// Event listener for the remove from watchlist button
document.getElementById('movie-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-watchlist-btn')) {
        const movieId = event.target.closest('.movie-element').getAttribute('data-id');
        removeMovieFromWatchlist(movieId);
    }
});

function removeMovieFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(movie => movie.imdbID !== movieId);
    // Update localStorage
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    // Remove the movie div from the DOM
    document.querySelector(`.movie-element[data-id="${movieId}"]`).remove();
}
