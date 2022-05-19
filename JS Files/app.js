// Fetching the JSON Data and calling all the functions to prepare recommendations

// <------------------------ Selecting Elements from HTML ----------------------------------->
const search_btn = document.querySelector('.search-button');
const search_input = document.querySelector('.search-text');
const searched_movie_info = document.querySelector('.searched-movie-info');
const searched_movie_poster = document.querySelector('.searched-movie-poster .movie-poster');
const searched_movie_title = document.querySelector('.searched-movie-title');
const searched_movie_overview = document.querySelector('.searched-movie-overview');
const searched_movie_genres = document.querySelector('.searched-movie-genres');
const recommendations_container = document.querySelector('.recommendations');
const rating_container = document.querySelector('.ratings')
const like_btn = document.querySelector('.like-button');
const dislike_btn = document.querySelector('.dislike-button');
const recommendation_header = document.querySelector('.recommendations-header');
const root_element = document.documentElement;
const stock_img_URL = "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-red-creative-movie-poster-background-image_178867.jpg";
// <------------------------ End of Selecting Elements from HTML ---------------------------->

fetch("./movies.json")
.then((res) => res.json())
.then((data) => {
    let movies = format_data(data);
    remove_stop_words(movies);

    let freq_counter = new Map();
    frequency_counter(movies, freq_counter);

    let most_frequent_words = top_K_frequent_words(freq_counter, 100);
    let vectorized_matrix = vectorization(movies, most_frequent_words);
    let similarity_matrix = build_similarity_matrix(vectorized_matrix);

    search_btn.addEventListener('click', () => {
        change_movie(data, movies, search_input.value, similarity_matrix);
    });
    window.addEventListener('keydown', (e) => {
        if(!e.repeat && e.code === "Enter") 
            change_movie(data, movies, search_input.value, similarity_matrix);
    })

});

function change_movie(data, movies, movie_name, similarity_matrix) {
    const movie_index = is_movie_present(movie_name, movies);
    rating_container.classList.add('display-none');
    remove_recommendation_container();

    if(movie_index === -1) return;
    
    const searched_movie = movies[movie_index];
    
    add_searched_movie_container();

    searched_movie_poster.src = searched_movie.image;
    searched_movie_title.innerText = `${searched_movie.title} (${data[searched_movie.id - 1].year})`;
    searched_movie_overview.innerText = data[searched_movie.id - 1].Overview;
    update_genres(data, searched_movie);

    like_btn.addEventListener('click', () => {
        let recommendations = recommend(movie_index, movies, similarity_matrix, 1);
        add_recommendation_container();
        update_recommendations(recommendations);
        change_movie_on_recommendation_click(data, movies, similarity_matrix);
    })
    dislike_btn.addEventListener('click', () => {
        let recommendations = recommend(movie_index, movies, similarity_matrix, 0);
        add_recommendation_container();
        update_recommendations(recommendations);
        change_movie_on_recommendation_click(data, movies, similarity_matrix);
    })
    
}

function add_searched_movie_container() {
    searched_movie_info.classList.remove('display-none');
    rating_container.classList.remove('display-none');
}

function update_genres(data, searched_movie) {
    const movie_genres_arr = data[searched_movie.id - 1].genres;
    searched_movie_genres.innerHTML = '';

    for(let genre of movie_genres_arr) {
        const new_genre = document.createElement('span');
        new_genre.innerText = genre;
        searched_movie_genres.append(new_genre);
    }
}

function update_recommendations(recommendations) {
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

function add_recommendation_container() {
    recommendations_container.classList.remove('display-none');
    recommendation_header.classList.remove('display-none');
}

function remove_recommendation_container() {
    searched_movie_info.classList.add('display-none');
    searched_movie_poster.src = stock_img_URL;
    recommendations_container.classList.add('display-none');
    recommendation_header.classList.add('display-none');
}

function change_movie_on_recommendation_click(data, movies, similarity_matrix) {
    const recommended_movies = document.querySelectorAll('.recommendations div');

    for(let i = 0; i < recommended_movies.length; i++) {
        recommended_movies[i].addEventListener('click', () => {
            const current_recommended_movie_title = recommended_movies[i].dataset.title;
            remove_recommendation_container();
            change_movie(data, movies, current_recommended_movie_title, similarity_matrix);
            scroll_to_top();
        });
    }
}

function scroll_to_top() {
    root_element.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}