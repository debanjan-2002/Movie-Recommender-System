// <------------------------ Selecting Elements from HTML ----------------------------------->
const search_btn = document.querySelector('.search-button');
const search_input = document.querySelector('.search-text');
const movie_not_found_message = document.querySelector('.not-found');
const search_suggestions = document.querySelector('.search-suggestions');
const searched_movie_info = document.querySelector('.searched-movie-info');
const searched_movie_poster = document.querySelector('.searched-movie-poster .movie-poster');
const searched_movie_title = document.querySelector('.searched-movie-title');
const searched_movie_overview = document.querySelector('.searched-movie-overview');
const searched_movie_genres = document.querySelector('.searched-movie-genres');
const searched_movie_casts = document.querySelector('.cast-names');
const searched_movie_directors = document.querySelector('.director-names');
const recommendations_container = document.querySelector('.recommendations');
const rating_container = document.querySelector('.ratings')
const like_btn = document.querySelector('.like-button');
const dislike_btn = document.querySelector('.dislike-button');
const recommendation_header = document.querySelector('.recommendations-header');
const root_element = document.documentElement;
const stock_img_URL = "Images/stock poster.jpg";
// <------------------------ End of Selecting Elements from HTML ---------------------------->

// Fetching the JSON Data and calling all the functions to prepare recommendations

fetch("./movies.json")
.then((res) => res.json())
.then((data) => {
    let movies = formatData(data);
    removeStopWords(movies);

    let freq_counter = new Map();
    frequencyCounter(movies, freq_counter);

    let most_frequent_words = topKFrequentWords(freq_counter, 5000);
    let vectorized_matrix = vectorization(movies, most_frequent_words);
    let similarity_matrix = buildSimilarityMatrix(vectorized_matrix);

    search_input.addEventListener("keyup",(e) => {
        if(e.code !== "Enter")
            updateSuggestions(search_input, search_suggestions);
        else 
            removeSuggestionsContainer();
    });
    search_btn.addEventListener('click', () => {
        changeMovie(data, movies, search_input.value, similarity_matrix);
    });
    window.addEventListener('keydown', (e) => {
        if(!e.repeat && e.code === "Enter") {
            changeMovie(data, movies, search_input.value, similarity_matrix);
        }
    });
    window.addEventListener('click', () => {
        removeSuggestionsContainer();
    })

});

function changeMovie(data, movies, movie_name, similarity_matrix) {
    const movie_index = isMoviePresent(movie_name, movies);
    removeRatingContainer();
    removeRecommendationContainer();
    removeSuggestionsContainer();
    
    if(movie_index === -1) {
        if(movie_name.length) addNotFoundMessage();
        else removeNotFoundMessage();
        return;
    }
    const searched_movie = movies[movie_index];
    
    removeNotFoundMessage();
    addSearchedMovieContainer();

    searched_movie_poster.src = searched_movie.image;
    searched_movie_title.innerText = `${searched_movie.title} (${data[searched_movie.id - 1].year})`;
    searched_movie_overview.innerText = data[searched_movie.id - 1].Overview;
    updateGenres(data, searched_movie);
    updateCasts(data, searched_movie);
    updateDirectors(data, searched_movie);

    like_btn.addEventListener('click', () => {
        let recommendations = recommend(movie_index, movies, similarity_matrix, 1);
        addRecommendationContainer();
        updateRecommendations(recommendations);
        changeMovieOnRecommendationClick(data, movies, similarity_matrix);
    })
    dislike_btn.addEventListener('click', () => {
        let recommendations = recommend(movie_index, movies, similarity_matrix, 0);
        addRecommendationContainer();
        updateRecommendations(recommendations);
        changeMovieOnRecommendationClick(data, movies, similarity_matrix);
    })
    
}

function addNotFoundMessage() {
    movie_not_found_message.classList.remove('display-none');
}

function removeNotFoundMessage() {
    movie_not_found_message.classList.add('display-none');
}

function removeRatingContainer() {
    rating_container.classList.add('display-none');
}

function addSearchedMovieContainer() {
    searched_movie_info.classList.remove('display-none');
    rating_container.classList.remove('display-none');
}

function updateGenres(data, searched_movie) {
    const movie_genres_arr = data[searched_movie.id - 1].genres;
    searched_movie_genres.innerHTML = '';

    for(let genre of movie_genres_arr) {
        const new_genre = document.createElement('span');
        new_genre.innerText = genre;
        searched_movie_genres.append(new_genre);
    }
}

function updateCasts(data, searched_movie) {
    const movie_casts_arr = data[searched_movie.id - 1].cast;
    searched_movie_casts.innerHTML = '';

    for(let cast of movie_casts_arr) {
        const new_cast = document.createElement('span');
        new_cast.innerText = cast;
        searched_movie_casts.append(new_cast);
    }
}

function updateDirectors(data, searched_movie) {
    const movie_directors_arr = data[searched_movie.id - 1].Directors;
    searched_movie_directors.innerHTML = '';

    for(let director of movie_directors_arr) {
        const new_director = document.createElement('span');
        new_director.innerText = director;
        searched_movie_directors.append(new_director);
    }
}

function updateRecommendations(recommendations) {
    recommendations_container.innerHTML = '';

    for(let i=0; i<5; i++) {
        const new_movie = recommendations[i]; 
        const new_img_div = document.createElement('div');
        const new_img = document.createElement('img');
        new_img_div.dataset.title = new_movie.title;
        new_img.src = new_movie.image;
        new_img.classList.add('poster-shadow');

        new_img_div.append(new_img);
        recommendations_container.append(new_img_div);
    }
}

function addRecommendationContainer() {
    recommendations_container.classList.remove('display-none');
    recommendation_header.classList.remove('display-none');
}

function removeRecommendationContainer() {
    searched_movie_info.classList.add('display-none');
    searched_movie_poster.src = stock_img_URL;
    recommendations_container.classList.add('display-none');
    recommendation_header.classList.add('display-none');
}

function changeMovieOnRecommendationClick(data, movies, similarity_matrix) {
    const recommended_movies = document.querySelectorAll('.recommendations div');

    for(let i = 0; i < recommended_movies.length; i++) {
        recommended_movies[i].addEventListener('click', () => {
            const current_recommended_movie_title = recommended_movies[i].dataset.title;
            scrollToTop();
            removeRecommendationContainer();
            changeMovie(data, movies, current_recommended_movie_title, similarity_matrix);
        });
    }
}

function scrollToTop() {
    root_element.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}