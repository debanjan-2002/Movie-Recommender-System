/*
Checking whether searched movie is present in dataset or not

- The function isMoviePresent(movie_name, movies) checks whether the searched movie, "movie_name"
  is present in the dataset or not.
    - If the movie is present in the dataset, then the function returns the index of the movie
      object, from the "movies" array.
    - Else it returns -1.

- We have used a callback function findIndex() to make the function clean and shorter.
*/ 

function isMoviePresent(movie_name, movies) {
    const clean_movie_name = movie_name.trim().toLowerCase();

    if(clean_movie_name.length === 0) return -1;

    const movie_index = movies.findIndex(movie => {
        return movie.title.toLowerCase() === clean_movie_name;
    });

    return movie_index;
}

/*
Recommendation function

- This function does the job of finding similar/dissimilar movies to the searched movie.

- The function recommend(movie_index, movies, similarity_matrix, flag) returns an array of the top
  5 similar/dissimilar movies to the searched movie.

- It uses the similarity matrix to find the score of all the movies with respect to the searched
  movie.
  
- The scores of all the movies with respect to the searched movie is stored in the array
  similarity_arr[].

- Then depending upon the "flag" parameter, the sorting of the scores happen.
    - If the flag is true (which means the user has liked the searched movie)
        - Then the scores are sorted in decreasing order, to get the maximum scored movies.
          (Most similar as the scores are highest)
    - Else if the flag is false (which means the user has disliked the searched movie)
        - Then the scores are sorted in increasing order, to get the minimum scored movies.
          (Least similar as the scores are lowest)

- Then at the end of the processing, the respective movie objects (that are to be recommended)
  are stored in the recommendations[] array and then it is retured (Here top 5 recommendations are
  taken into consideration).
*/

function recommend(movie_index, movies, similarity_matrix, flag) {
    let recommendations = [];

    let similarity_arr = [];
    for(let i=0; i<similarity_matrix[movie_index].length; i++) {
        similarity_arr.push([similarity_matrix[movie_index][i], i]);
    }

    similarity_arr.sort((a, b) => {
        if(a[0] === b[0]) return 0;
        if(flag) return (a[0] > b[0]) ? -1 : 1;
        else return (a[0] < b[0]) ? -1 : 1;
    })
    
    for(let i=1; i<=5; i++) {
        const recommend_movie_index = similarity_arr[i][1];
        recommendations.push(movies[recommend_movie_index]);
    }
    recommendations.push(movies[movie_index]);
    return recommendations;
}