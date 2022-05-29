
# Movie Junction

**Movie Junction** is a website based movie recommendation system, in which a user can get recommendations on the basis of whether they like or dislike a particular movie.

## Live Link of project

[Movie Junction](https://debanjan-2002.github.io/Movie-Recommender-System/)

## Features

- User can get movie recommendations, depending on whether they **like** or **dislike** another movie. 
- Users can **search for a movie** (which are available in the dataset) through a **search bar** and get some related informations regarding that movie. Some of the informations are - 
    * **Title** of the movie with **release year**
    * **Genres** of the movie
    * **Top Casts** of the movie
    * **Directors** of the movie
- Users will get *suggestions* while searching for the movies through the search bar **(suggestions on search)**.  
- For calculating scores for every movie for recommendation purpose, the following criterias have been taken into consideration-
    * **Title** of the movie (For example - If someone searches for "Toy Story", then the engine will recommend other parts of the same series like "Toy Story 2", "Toy Story 3" etc.) 
    * **Casts / Directors** of the movie (For example - If someone likes to watch movies of Christopher Nolan, then chances are that he/she would also like to watch other movies from the same person)
    * **Overview** of the movie (Movies which have similar words in their descriptions are more likely to get recommended on each others recommendations list)
    * **Genres** of the movie (This is one of the most important and straight forward criteria for recommendation. User liking a particular genre of movie is likely to watch other movies from the same genre too)
- Clean, minimalistic and **responsive** UI for seamless user experience. 


## Tech Stack

**Client:** HTML, CSS, JavaScript

**Dataset:** Custom made JSON file (Fetched through JavaScript)


## Running the project

To run this project

```bash
  - Fork this repository
  - Clone the project
  - Run the index.html file through suitable browser 
    (or through VS code Live Server)
```
    
## Screenshots

![alt text](https://github.com/debanjan-2002/Movie-Recommender-System/blob/main/Images/Screenshots/Image_3.PNG?raw=true)

![alt text](https://github.com/debanjan-2002/Movie-Recommender-System/blob/main/Images/Screenshots/Image_1.PNG?raw=true)

![alt text](https://github.com/debanjan-2002/Movie-Recommender-System/blob/main/Images/Screenshots/Image_4.PNG?raw=true)

![alt text](https://github.com/debanjan-2002/Movie-Recommender-System/blob/main/Images/Screenshots/Image_2.PNG?raw=true)


## Doubts

For any doubts, email debanjan.edu.2002@gmail.com or connect with me through LinkedIn.


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/debanjan-poddar/)


## Lessons Learned

* Learned the basic concepts of machine learning
    * Came to know about concepts like vectorization, bag of words, similarity matrix, content/collaborative filtering etc.
    * Implemented all the functions required from scratch in JavaScript, without using any inbuilt library.
* Became more comfortable with making frontend designs in pure HTML & CSS
* Significantly improved logic building around the frontend design

## Optimizations (for the future)

* Genre based movie searching
* Cast based movie searching
* And similar features....