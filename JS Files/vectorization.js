/*
Building the vectorized matrix using the top K frequent words.

- We consider a 2D matrix, vectorized_matrix[][]
    - vectorized_matrix.length = total number of movies
    - vectorized_matrix[i].length = K

- vectorized_matrix[i] represents the frequency of all the top K frequent words, that are present
  in the tags of the 'i'th movie. This process is done for all the movies.

- The function vectorization(movies, most_frequent_words) returns the required vectorized matrix.

- Through this process we get the frequency of all the top K frequent words in every movie. 
  This will later be used to calculate the similarity between any two movies.

- Using vectorized_matrix[i] and vectorized_matrix[j], we can calculate the similarity between the 
  'i'th movie' and the 'j'th movie.
*/

function vectorization(movies, most_frequent_words) {
    const no_of_movies = movies.length;
    const no_of_words = most_frequent_words.length;
    let vectorized_matrix = new Array(no_of_movies);

    for(let i=0; i<no_of_movies; i++) {
        vectorized_matrix[i] = new Array(no_of_words);
        const curr_tag = movies[i].tags;
        const curr_tags_arr = curr_tag.split(' ');

        for(let j=0; j<no_of_words; j++) {
            const curr_word = most_frequent_words[j];
            let counter = 0;

            for(let k of curr_tags_arr) {
                if(k === curr_word) counter++;
            }
            vectorized_matrix[i][j] = counter;
        }
    }
    return vectorized_matrix;
}