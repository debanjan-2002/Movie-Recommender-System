/*
Data Formatting

- Data from JSON dataset is processed to get the data in usable format. 

- The fetched JSON file (from app.js) is passed to the formatData() function 
  and it returns the formatted data according to our requirements.

- The function formatData(movies) returns an array of all the movies with each
  element as an movie object. 

- The movie object (elements of the array) contains following information-
    - ID of the movie (numbering)
    - Title of the movie 
    - Image link of the movie
    - Tags of the movie
        - Tags of a movie is a string which is a concatination of the following-
            - Title
            - Overview of movie (short description)
            - Genres 
            - Casts
            - Directors
*/

function formatData(movies) {
  let formatted_data = [];    
    
  for(let movie of movies) {
      const curr_id = movie.id;
      const curr_title = movie.title;
      const curr_genres = movie.genres;
      const curr_cast = joinNames(movie.cast);
      const curr_director = joinNames(movie.Directors);
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

function joinNames(arr) {
  let joined_names = [];

  for(let name of arr) {
      const joined_name = name.split(" ").join("");
      joined_names.push(joined_name); 
  }
  return joined_names;
}

/*
Removing Stop words

- In the "tags" of a paricular movie, there might be some words that don't
have any contextual meaning in relation to the movie.

- This words are known as "stop words" which are generally used in sentence
formation. For example - ['a','are','and','my',.......].

- So it becomes important to not consider these words while calculating the
score of a particular movie.

- The array stopwords[] contains a list of the most common "stop words".

- The function removeStopWords(movies) removes the stop words from the
tags of all the movies.
*/

function removeStopWords(movies) {
  const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','done','should','now',':'];

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