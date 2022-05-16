// Building the vectorized matrix
// Here we count the number of occurences of each of the top K frequent words for each movie, and store it as an array against the particular movie 
// res[i] -> frequency counter of all the K words which are present in the 'i'th movie.
// res[i].length = K

function vectorization(movies, most_frequent_words) {
    const no_of_movies = movies.length;
    const no_of_words = most_frequent_words.length;
    let res = new Array(no_of_movies);

    for(let i=0; i<no_of_movies; i++) {
        res[i] = new Array(no_of_words);
        const curr_tag = movies[i].tags;
        const curr_tags_arr = curr_tag.split(' ');

        for(let j=0; j<no_of_words; j++) {
            const curr_word = most_frequent_words[j];
            let counter = 0;

            for(let k of curr_tags_arr) {
                if(k === curr_word) counter++;
            }
            res[i][j] = counter;
        }
    }
    return res;
}