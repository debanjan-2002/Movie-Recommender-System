let movie_names = [
    "Dumb and Dumber",
    "Office Space",
    "Ferris Buellers Day Off",
    "The Jerk",
    "Planes, Trains & Automobiles",
    "Young Frankenstein",
    "Step Brothers",
    "Knocked Up",
    "The 40-Year-Old Virgin",
    "Shaun of the Dead",
    "Ghostbusters",
    "Halo",
    "Doctor Strange in the Multiverse of Madness",
    "SpiderMan : No Way Home",
    "Avatar : The Way of Water",
    "Doctor Strange",
    "Aquaman",
    "Avatar",
    "Avengers : Endgame",
    "Venom : Let There Be Carnage",
    "SpiderMan : Into the Darkness",
    "Avengers : Infinity War",
    "Black Widow",
    "SpiderMan : Homecoming",
    "Captain America : Civil War",
    "Avengers",
    "Avengers : Age of Ultron",
    "The Eye",
    "The Evil Dead",
    "A Nightmare on Elm Street",
    "Dead Silence",
    "The Exorcism of Emily Rose",
    "Insidious",
    "Psycho",
    "The Exorcist",
    "Sinister",
    "Poltergeist",
    "House of Wax",
    "The Birds",
    "Mama",
    "Titanic",
    "City of Angels",
    "The English Patient",
    "While You Were Sleeping",
    "Bridget Jones Diary",
    "The Notebook",
    "Clueless",
    "Revolutionary Road",
    "Sleepless in Seattle",
    "Love & Basketball",
    "Zootopia",
    "Up",
    "The Incredibles",
    "Big Hero 6",
    "How to Train Your Dragon",
    "Coco",
    "The Aristocats",
    "Frozen",
    "Toy Story 3",
    "How to Train Your Dragon 2",
    "Shrek",
    "Toy Story",
    "Toy Story 2",
    "Toy Story 4",
    "The Godfather",
    "The Godfather 2",
    "Goodfellas",
    "Casino",
    "Pulp Fiction",
    "Public Enemies",
    "The Departed",
    "Rope",
    "Scarface",
    "The Dark Knight",
    "The Batman",
    "Million Dollar Baby",
    "Rocky",
    "Raging Bull",
    "Friday Night Lights",
    "Hoosiers",
    "Jersey",
    "The Wrestler",
    "He Got Game",
    "Invincible",
    "The Blind Side",
    "Operation Mincemeat",
    "Inglourious Basterds",
    "Saving Private Ryan",
    "Apocalypse Now",
    "1917",
    "Hacksaw Ridge",
    "The Imitation Game",
    "Fury",
    "Wonder Woman",
    "Incendies",
    "Whiplash",
    "La La Land",
    "Pitch Perfect",
    "Pitch Perfect 2",
    "Soul"
];

let sorted_names = movie_names.sort();

function updateSuggestions(search_input, search_suggestions) {
    removeSuggestionsContainer();
    for(let movie of sorted_names) {
        const clean_movie_name = search_input.value.toLowerCase().trim();
        const clean_movie = movie.toLowerCase();

        if(clean_movie_name !== "" && clean_movie.startsWith(clean_movie_name)) {
            document.querySelector('.search-text').classList.add('br-btm-left-btm-right-7');
            const list_item = document.createElement('li');
            list_item.classList.add('list-item');
            list_item.style.cursor = "pointer";
            list_item.setAttribute("onclick","displayNames('" + movie + "')");

            let word = "<b>" + movie.substring(0, search_input.value.length) + "</b>";
            word += movie.substring(search_input.value.length);
            
            list_item.innerHTML = word;
            search_suggestions.append(list_item);
        }
        
    }
}
function displayNames(value) {
    search_input.value = value;
    removeSuggestionsContainer();
}
function removeSuggestionsContainer() {
    search_suggestions.innerHTML = '';
    document.querySelector('.search-text').classList.remove('br-btm-left-btm-right-7');
    document.querySelector('.search-text').classList.add('br-7');
}