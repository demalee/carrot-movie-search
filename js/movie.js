const apiKey = 'c2d56746';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
let currentPage = 1;
const resultsPerPage = 4;
let loadMoreButton = null;

searchButton.addEventListener('click', searchMovies);

function searchMovies() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        alert('Please enter a movie title');
        return;
    }

    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                if (data.Search && data.Search.length > 0) {
                    displayMovies(data.Search);
                } else {
                    displayErrorMessage('No results found.');
                }
            } else {
                displayErrorMessage(data.Error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayErrorMessage('An error occurred. Please try again.');
        });
    function displayErrorMessage(message) {
        resultsContainer.innerHTML = '';
        const errorContainer = document.createElement('div');
        errorContainer.classList.add('error-message');
        errorContainer.textContent = message;
        resultsContainer.appendChild(errorContainer);
    }
}
// displayMovies  uses JavaScript DOM manipulation to create and append the necessary HTML elements for each movie in the movies array.
function displayMovies(movies) {
    if (currentPage === 1) {
        resultsContainer.innerHTML = '';
    }
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedMovies = movies.slice(start, end);
    const moviesInRows = chunkArray(paginatedMovies, 3);

    const section = document.createElement('section');
    section.id = 'iq-favorites';

    const containerFluid = document.createElement('div');
    containerFluid.classList.add('container-fluid');

    const favouriteSlider = document.createElement('div');
    favouriteSlider.classList.add('favourite-slider');

    const swiper = document.createElement('div');
    swiper.classList.add('swiper', 'pt-2', 'pt-md-4', 'pt-lg-4', 'iq-rtl-direction');
    swiper.setAttribute('data-swiper', 'common-slider');

    const swiperWrapper = document.createElement('ul');
    swiperWrapper.classList.add('swiper-wrapper', 'p-0', 'm-0');

    moviesInRows.forEach(row => {
        const rowContainer = document.createElement('li');
        rowContainer.classList.add('swiper-slide', 'slide-item');

        // forEach loop iterates over each movie in the movies array
        row.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('block-images', 'position-relative');

            const imgBox = document.createElement('div');
            imgBox.classList.add('img-box');

            const img = document.createElement('img');
            const posterUrl = movie.Poster === 'N/A' ? 'no-for-carrot-movies.png' : movie.Poster;
            img.src = posterUrl;
            img.alt = `${movie.Title} Poster`;
            img.classList.add('img-fluid');
            img.loading = 'lazy';

            imgBox.appendChild(img);

            const blockDescription = document.createElement('div');
            blockDescription.classList.add('block-description');

            const title = document.createElement('h6');
            title.classList.add('iq-title');

            const viewDetailsButton = document.createElement('button');
            viewDetailsButton.classList.add('details-button');
            viewDetailsButton.textContent = 'View Details';
            viewDetailsButton.addEventListener('click', () => getMovieDetails(movie.imdbID));
            title.appendChild(viewDetailsButton);

            const movieTime = document.createElement('div');
            movieTime.classList.add('movie-time', 'd-flex', 'align-items-center', 'my-2');
            const year = document.createElement('span');
            year.classList.add('text-white');
            title.textContent = `Movie Title: ${movie.Title}`;
            year.textContent = `Year: ${movie.Year}`;
            movieTime.appendChild(year);

            blockDescription.appendChild(title);
            blockDescription.appendChild(movieTime);
            blockDescription.appendChild(viewDetailsButton);
            movieCard.appendChild(imgBox);
            movieCard.appendChild(blockDescription);

            rowContainer.appendChild(movieCard);
        });

        swiperWrapper.appendChild(rowContainer);
    });

    swiper.appendChild(swiperWrapper);

    favouriteSlider.appendChild(swiper);
    containerFluid.appendChild(favouriteSlider);
    section.appendChild(containerFluid);
    resultsContainer.appendChild(section);

    if (end < movies.length) {
        if (!loadMoreButton) {
            loadMoreButton = document.createElement('button');
            loadMoreButton.classList.add('load-more-button');
            loadMoreButton.textContent = 'Load More';
            loadMoreButton.addEventListener('click', loadMoreMovies);
            resultsContainer.appendChild(loadMoreButton);
        }
    } else {
        if (loadMoreButton) {
            loadMoreButton.remove();
            loadMoreButton = null;
        }
    }
}


function addLoadMoreButton() {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.classList.add('load-more-button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.addEventListener('click', loadMoreMovies);
    resultsContainer.appendChild(loadMoreButton);
}

function loadMoreMovies() {
    currentPage++;
    searchMovies();
}

function getMovieDetails(imdbId) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovieDetails(data);
            } else {
                alert(data.Error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}

function displayMovieDetails(movie) {
    alert(`Title: ${movie.Title}\nYear: ${movie.Year}\nPlot: ${movie.Plot}\nGenre: ${movie.Genre}`);
}
// chunkArray  splits the movies into rows with the desired number of movies (three in this case)
function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        chunkedArray.push(chunk);
    }
    return chunkedArray;
}
