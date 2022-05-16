// Data Formatting

function format_data(movies) {
    let formatted_data = [];    
      
    for(let movie of movies) {
        const curr_id = movie.id;
        const curr_title = movie.title;
        const curr_genres = movie.genres;
        const curr_cast = movie.cast;
        const curr_director = movie.Director;
        const curr_overview = movie.Overview;
        const curr_image = movie.image;

        const overview_arr = curr_overview.split(' ');
        const title_arr = curr_title.split(' ');
        const tags = overview_arr.concat(title_arr, curr_genres, curr_cast, curr_director);
        let new_tags = tags.join(' ');
        new_tags = new_tags.toLowerCase();

        let new_movie_obj = {};

        new_movie_obj.id = curr_id;
        new_movie_obj.title = curr_title;
        new_movie_obj.tags = new_tags;
        new_movie_obj.image = curr_image;

        formatted_data.push(new_movie_obj);
    }
    return formatted_data;
}

// Remove Stop words (Like - 'a', 'as', 'is'...)

function remove_stop_words(movies) {
    const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','done','should','now'];

    for(let movie of movies) {
        let res = [];
        const curr_movie = movie;
        const curr_tags = curr_movie.tags;
        const words = curr_tags.split(' ');
        for(let word of words) {
            const clean_word = word.split(".").join("");
            if(!stopwords.includes(clean_word)) {
                res.push(clean_word);
            }
        }
        curr_movie.tags = res.join(' ');
    }
}