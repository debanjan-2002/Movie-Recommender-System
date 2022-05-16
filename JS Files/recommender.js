// Recommender Function

function recommend(movie_name, movies, similarity_matrix) {
    let recommendations = [];
    const clean_movie_name = movie_name.trim().toLowerCase();
    
    if(clean_movie_name.length === 0) return recommendations;

    const movie_index = movies.findIndex(movie => {
        return movie.title.toLowerCase() === clean_movie_name;
    });

    if(movie_index === -1) return recommendations;

    let similarity_arr = [];
    for(let i=0; i<similarity_matrix[movie_index].length; i++) {
        similarity_arr.push([similarity_matrix[movie_index][i], i]);
    }

    similarity_arr.sort((a, b) => {
        if(a[0] === b[0]) return 0;
        return (a[0] > b[0]) ? -1 : 1;
    })
    
    for(let i=1; i<=5; i++) {
        const recommend_movie_index = similarity_arr[i][1];
        recommendations.push(movies[recommend_movie_index]);
    }
    recommendations.push(movies[movie_index]);
    return recommendations;
}