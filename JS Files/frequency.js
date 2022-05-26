// Counting frequency of all words from all the combined tags of all movies

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

// Finding top K frequent words from the calculated frequency of all words

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