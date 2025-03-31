const apiKey = 'bd1e77ed2c8a0a156c6f75e26fb8896b'; // Your TMDb API key

const searchInput = document.querySelector('.search-box');
const movieList = document.querySelector('.movie-list');
let timeoutId;
let page = 1; // Track the current page number
let fetchingMovies = false; // Flag to prevent concurrent fetch requests


// Function to fetch and display movies
function fetchMovies(url) {
  fetchingMovies = true; // Set flag to indicate fetching is in progress
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(movie => {
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        if (movie.poster_path) {
          image.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
          image.alt = movie.title;
        } else {
          image.src = `https://github.com/Prutuo/theque/blob/main/404.png?raw=true`;
          image.alt = "404 Error";
        }
        image.addEventListener('click', () => {
          openEmbeddedPlayerInNewTab(movie.id); // Open embedded player in new tab with movie ID
        });
        listItem.appendChild(image);
        const title = document.createElement('p');
        title.textContent = movie.title;
        listItem.appendChild(title);
        movieList.appendChild(listItem);
      });
      fetchingMovies = false; // Reset flag after fetching is complete
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      fetchingMovies = false; // Reset flag if there's an error
    });
}

// Function to open embedded player in new tab with movie ID
function openEmbeddedPlayerInNewTab(movieId) {
  // Open a new tab with the embedded player URL
  window.open(`https://embed.su/embed/movie/${movieId}`, '_blank');
}

// Function to fetch and display popular movies
function fetchPopularMovies() {
  fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
}

// Call the function to fetch and display popular movies on page load
fetchPopularMovies();

// Event listener for scroll events
window.addEventListener('scroll', function() {
  // Check if the user has scrolled to the bottom of the page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !fetchingMovies) {
    page++; // Increment page number
    fetchPopularMovies(); // Fetch more movies
  }
});

// Event listener for search input
searchInput.addEventListener('input', function() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const query = this.value.trim();
    if (query !== '') {
      page = 1; // Reset page number for new search
      movieList.innerHTML = ''; // Clear previous results
      fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`);
    } else {
      fetchPopularMovies(); // If search input is empty, fetch and display popular movies again
    }
  }, 500); // Delay search by 500 milliseconds
});
// Function to fetch and display movies by genre
function fetchMoviesByGenre(genreId) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=${page}`;

  fetchMovies(url);
}

// Event listener for genre buttons
const genreButtons = document.querySelectorAll('.genre-button');
genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const genreId = button.dataset.genreId;
    page = 1; // Reset page number
    movieList.innerHTML = ''; // Clear previous results
    fetchMoviesByGenre(genreId);
  });
});

// Save original window.open
const originalOpen = window.open;

// Override window.open
window.open = function(url, name, specs) {
    if (url.includes("embed.su")) {
        return originalOpen(url, name, specs); // Allow pop-up
    } else {
        console.warn("Pop-up blocked: " + url);
        return null; // Block pop-up
    }
};