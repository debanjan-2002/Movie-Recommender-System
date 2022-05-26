/*
Counting frequency 

- In this function, we are calculating the frequency of each word from the tags.

- We are considering every movie while computing the frequency of the words from the tags.

- We have taken a Map() named freq_counter (declared in app.js) to store the frequency.
    - The first element of a pair of freq_counter contains a word.
    - The second element of a pair of freq_counter contains the frequency of the corresponding word.

- The function frequencyCounter(movies, freq_counter) populaes the freq_counter.
*/

function frequencyCounter(movies, freq_counter) {
    for(let movie of movies) {
        const curr_tags = movie.tags;
        const curr_tags_arr = curr_tags.split(' ');
    
        for(let word of curr_tags_arr) {
            if(freq_counter.has(word)) {
                freq_counter.set(word, freq_counter.get(word) + 1);
            }
            else {
                freq_counter.set(word, 1);
            }
        }
    }
}

/* 
Finding top K frequent words

- Here we use the previously computed freq_counter Map to find the Top K most frequent words.

- There can be many ways to find the Top K most frequent words. Some of them can be - 
    - Using a Max Heap (Maximum Priority Queue)
    - Using Sorting

- Though the Priority Queue approach works better than the sorting approach, still we have used
  sorting approach here to make the process simpler and easy to understand.

- We are storing the [word, frequency] pair into a 2D array matrix[] and then sorting the matrix
  in descending order in terms of the frequency of the words. 

- Then we are running a loop of length K and extract the top K frequent words from the matrix.

- The function topKFrequentWords(freq_counter, K) returns an array which contains the top K 
  frequent words. 
*/

function topKFrequentWords(freq_counter, K) {
    const no_of_words = freq_counter.size;
    let matrix = [];
    let res = [];

    for(let i of freq_counter.entries()) {
        matrix.push([i[1], i[0]]);
    }
    matrix.sort((a, b) => {
        if(a[0] === b[0]) return 0;
        return (a[0] > b[0]) ? -1 : 1;
    })
    for(let i=0; i<Math.min(K, no_of_words); i++) {
        res.push(matrix[i][1]);
    }
    return res;
}