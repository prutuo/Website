const apiKey = 'bd1e77ed2c8a0a156c6f75e26fb8896b'; // Your TMDb API key

const searchInput = document.querySelector('.search-box');
const movieList = document.querySelector('.show-list');
let timeoutId;
let page = 1; // Track the current page number
let fetchingShows = false; // Flag to prevent concurrent fetch requests


// Function to fetch and display movies
function fetchShows(url) {
  fetchingShows = true; // Set flag to indicate fetching is in progress
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(tv => {
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        if (tv.poster_path) {
          image.src = `https://image.tmdb.org/t/p/w200${tv.poster_path}`;
          image.alt = tv.title;
        } else {
          image.src = `https://github.com/prutuo/website/blob/main/404.png?raw=true`;
          image.alt = "404 Error";
        }
        image.addEventListener('click', () => {
          openEmbeddedPlayerInNewTab(tv.id); // Open embedded player in new tab with movie ID
        });
        listItem.appendChild(image);
        const title = document.createElement('p');
        title.textContent = tv.title;
        listItem.appendChild(title);
        movieList.appendChild(listItem);
      });
      fetchingShows = false; // Reset flag after fetching is complete
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      fetchingShows = false; // Reset flag if there's an error
    });
}

// Function to open embedded player in new tab with movie ID
function openEmbeddedPlayerInNewTab(showId) {
  // Open a new tab with the embedded player URL
  window.open(`https://embed.su/embed/tv/${showId}`, '_blank');
}

// Function to fetch and display popular movies
function fetchPopularShows() {
  fetchShows(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`);
}

// Call the function to fetch and display popular movies on page load
fetchPopularShows();

// Event listener for scroll events
window.addEventListener('scroll', function() {
  // Check if the user has scrolled to the bottom of the page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !fetchingShows) {
    page++; // Increment page number
    fetchPopularShows(); // Fetch more movies
  }
});

// Event listener for search input
searchInput.addEventListener('input', function() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const query = this.value.trim();
    if (query !== '') {
      page = 1; // Reset page number for new search
      showList.innerHTML = ''; // Clear previous results
      fetchShows(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&page=${page}`);
    } else {
      fetchPopularShows(); // If search input is empty, fetch and display popular movies again
    }
  }, 500); // Delay search by 500 milliseconds
});
// Function to fetch and display movies by genre
function fetchShowsByGenre(genreId) {
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=${page}`;

  fetchShows(url);
}

// Event listener for genre buttons
const genreButtons = document.querySelectorAll('.genre-button');
genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const genreId = button.dataset.genreId;
    page = 1; // Reset page number
    showList.innerHTML = ''; // Clear previous results
    fetchShowsByGenre(genreId);
  });
});

document.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent pop-up triggers from links or scripts
}, true);