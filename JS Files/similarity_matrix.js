/*
Calculating cosine similarity between two movies using the vectorized array of respective movies

- Cosine similarity is a metric, helpful in determining, how similar the data objects are
  irrespective of their size.

- Cos(x, y) = (x . y) / ||x|| * ||y||
    where
        x . y = product (dot) of the vectors ‘x’ and ‘y’.
        ||x|| and ||y|| = length of the two vectors ‘x’ and ‘y’.
        ||x|| * ||y|| = cross product of the two vectors ‘x’ and ‘y’.

    Source of definition: geeksforgeeks.org

- The function getCosineSimilarity(movie_A, movie_B) returns the similarity_score between movie_A
  and movie_B.
*/ 

function getCosineSimilarity(movie_A, movie_B) {
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

    const similarity_score = (dot_product) / ((m_A) * (m_B));
    return similarity_score;
}

/*
Building Similarity Matrix

- The similarity_matrix is a 2D array of size [no of movies][no of movies]

- similarity_matrix[i] represents an array which contains the similarity score between the
  'i'th movie and all the other movies.  

- It uses the vectorized_matrix to calculate the similarity between any two movie.

- The similarity score is computed using the concept of cosine similarity.

- The function buildSimilarityMatrix(movies) takes the vectorized_matrix as a parameter and 
  builds the similarity matrix and returns it.
*/ 
 
function buildSimilarityMatrix(movies) {
    const no_of_movies = movies.length;
    let similarity_matrix = new Array(no_of_movies);

    for(let i=0; i<no_of_movies; i++) 
        similarity_matrix[i] = new Array(no_of_movies);

    for(let i=0; i<no_of_movies; i++) {
        for(let j=0; j<no_of_movies; j++) {
            const similarity_value = getCosineSimilarity(movies[i], movies[j]);
            similarity_matrix[i][j] = similarity_value;
        }
    }
    return similarity_matrix;
} 