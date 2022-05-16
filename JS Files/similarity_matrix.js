// This function gives the Cosine similarity between any two input movies
// The given inputs are the vectorized array for the corresponding movies

function get_cosine_similarity(movie_A, movie_B) {
    let dot_product = 0;
    let m_A = 0;
    let m_B = 0;
    for(let i=0; i<movie_A.length; i++) {
        dot_product += (movie_A[i] * movie_B[i]);
        m_A += (movie_A[i] * movie_A[i]);
        m_B += (movie_B[i] * movie_B[i]);
    }
    m_A = Math.sqrt(m_A);
    m_B = Math.sqrt(m_B);

    const similarity = (dot_product) / ((m_A) * (m_B));
    return similarity;
}

// Building Similarity Matrix using Cosine similarity between movies
 
function build_similarity_matrix(movies) {
    const no_of_movies = movies.length;
    let similarity_matrix = new Array(no_of_movies);

    for(let i=0; i<no_of_movies; i++) 
        similarity_matrix[i] = new Array(no_of_movies);

    for(let i=0; i<no_of_movies; i++) {
        for(let j=0; j<no_of_movies; j++) {
            const similarity_value = get_cosine_similarity(movies[i], movies[j]);
            similarity_matrix[i][j] = similarity_value;
        }
    }
    return similarity_matrix;
} 