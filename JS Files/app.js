// Fetching the JSON Data and calling all the functions to prepare recommendations

const btn = document.querySelector('.search-button');
const search_input = document.querySelector('.search-text');
const current_movie_poster = document.querySelector('.current-movie-poster img');
const current_movie_title = document.querySelector('.current-movie-title');
const current_movie_overview = document.querySelector('.current-movie-overview');
const current_movie_genres = document.querySelector('.current-movie-genres');
const recommendations_container = document.querySelector('.recommendations');

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

    btn.addEventListener('click', () => {
        change_movie(data, movies, similarity_matrix);
    });
    window.addEventListener('keydown', (e) => {
        if(!e.repeat && e.code === "Enter") change_movie(data, movies, similarity_matrix);
    })
});

function change_movie(data, movies, similarity_matrix) {
    const movie_name = search_input.value;
    let recommendations = recommend(movie_name, movies, similarity_matrix);
    if(!recommendations.length) return;

    const current_movie = recommendations[5];
    
    current_movie_poster.src = current_movie.image;
    current_movie_title.innerText = `${current_movie.title} (${data[current_movie.id - 1].year})`;
    current_movie_overview.innerText = data[current_movie.id - 1].Overview;
    update_genres(data, current_movie);
    update_recommendations(recommendations);
    console.log(current_movie)

}
function update_genres(data, current_movie) {
    const movie_genres_arr = data[current_movie.id - 1].genres;
    current_movie_genres.innerHTML = '';

    for(let genre of movie_genres_arr) {
        const new_genre = document.createElement('span');
        new_genre.innerText = genre;
        current_movie_genres.append(new_genre);
    }
}
function update_recommendations(recommendations) {
    recommendations_container.innerHTML = '';

    for(let i=0; i<5; i++) {
        const new_movie = recommendations[i]; 
        const new_img_div = document.createElement('div');
        const new_img = document.createElement('img');
        new_img.src = new_movie.image;

        new_img_div.append(new_img);
        recommendations_container.append(new_img_div);
    }
}