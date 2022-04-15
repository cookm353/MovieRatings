$("#submitBttn").on("click", function(evt) {
    evt.preventDefault();

    if ($("#movieName").val().length < 2) {
        alert("Movie name must be at least 2 characters long");
        $("#movieName").addClass("invalidInput")
    } else if ($("#movieRating").val() < 0 || $("#movieRating").val() > 10 || $("#movieRating").val() === "") {
        alert("Rating must be between 0 and 10");
        $("#movieRating").addClass("invalidInput")
    } else {
        // Retrieving vals and creating delete button
        const name = $("#movieName").val();
        const rating = $("#movieRating").val();
        
        myList.storeMovie(name, rating)
    }
})

$("ul").on("click", ".delBttn", function(evt) {
    evt.preventDefault();
    const title = $(this).prev().prev().text()
    
    myList.removeFromList(title)
    $(this).parent().remove();

})

$("#sortName").on("click", function(evt) {
    evt.preventDefault();
    myList.sortByName(true);
});

$("#sortNameReverse").on("click", function(evt) {
    evt.preventDefault();
    myList.sortByName(false);
});

$("#sortRating").on("click", function(evt) {
    evt.preventDefault();
    myList.sortByName(true);
});

$("#sortRatingReverse").on("click", function(evt) {
    evt.preventDefault();
    myList.sortByName(false);
})

class MovieRatingList {
    constructor() {
        this.movies = {}
    }
    storeMovie(name, rating) {
        this.movies[name] = rating
        this.addListItem(name, rating)
    }
    addListItem(name, rating) {
        // Create delete button
        const delButton = $("<button>Delete</button>").addClass("delBttn");
        
        // Add li
        $("ul").append($(`<li><span>${name}</span> - <span>${rating}</span>&nbsp;&nbsp;</li>`));
        $("li").last().append(delButton);
        
        // Clean up
        $("#movieName").removeClass("invalidInput")
        $("#movieRating").removeClass("invalidInput")
        $("#movieName").val("");
        $("#movieRating").val();
    }
    removeFromList(name) {
        delete this.movies[name]
    }
    sortByName(isDescending) {
        $("ul").empty();
        
        const keys = Object.keys(this.movies);
        let sortedKeys;

        if (isDescending) {
            sortedKeys = keys.sort();
        } else {
            sortedKeys = keys.sort().reverse();
        }

        sortedKeys.map(key => this.addListItem(key, this.movies[key]))
    }
    sortByRating(isAscending) {
        $("ul").empty();

        // Create new object with keys and values swapped
        const invertedKeyVals = Object.entries(this.movies).map(
            ([k, v]) => [v, k]);
        const invertedList = Object.fromEntries(invertedKeyVals)
        
        // Retrieve keys
        let keys = Object.keys(invertedList);
        let sortedKeys;

        if (isAscending) {
            sortedKeys = keys.sort()
        } else {
            sortedKeys = keys.sort().reverse()
        }

        keys.map(key => this.addListItem(key, invertedList[key]))
    }
}

const myList = new MovieRatingList()