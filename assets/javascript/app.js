$(document).ready(function() {

var dogs = ["German Shepherd", "Golden Retriever", "Black Lab", "Pitbull"];

// displayDogs function re-renders the HTML to display the appropriate content
  function displayDogs() {

    var dog = $(this).attr("data-dog");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=tqC0R8egBTOd0JGuFbMwnsSpIop1b4F9&limit=10";

    // Creating an AJAX call for the specific dog button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      for (var i = 0; i < response.data.length; i++) {
      // Dynamically creating a div to hold the dog type, setting variables to retrieve images URLs, creating element to hold image and assign attributes
      var dogDiv = $("<div>");
      dogDiv.addClass("col-md-4 responsive");
      var stillImageURL = response.data[i].images.fixed_height_still.url;
      var animateImageURL = response.data[i].images.fixed_height.url;
      var imgURL = $("<img>").attr("src", stillImageURL);
      imgURL.attr("data-still", stillImageURL);
      imgURL.attr("data-animate", animateImageURL);
      imgURL.attr("data-state", "still");
      imgURL.addClass("gif");
      // Storing the rating data & creating an element to have the rataing displayed
      var ratingData = response.data[i].rating;
      var ratingDisplay = $("<p>").text("Rating: " + ratingData);
      // Append image and ratings & then prepending the dogDiv to the HTML page in the "#dog-view" div
      dogDiv.append(imgURL, ratingDisplay);
      $("#dog-view").prepend(dogDiv);
      };
    });
  }; //End of displayDogs function

  // Function for displaying dog buttons
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < dogs.length; i++) {
      // Dynamicaly generating buttons for each dog in the array and adding classes/attributes to buttons
      var btn = $("<button>");
      btn.addClass("dog-btn btn btn-info m-1");
      btn.attr("data-dog", dogs[i]);
      btn.text(dogs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(btn);
    };
  };

  // Function handles events where submit button is clicked
  $("#add-dog").on("click", function(event) {
    event.preventDefault();
    // Grab the input from the textbox & add to the array with push
    var dog = $("#form-input").val().trim();
    dogs.push(dog);
    // Call renderButtons which handles the processing of our dog array
    renderButtons();
  });

  // Function to pause and start gifs
  function playPauseGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  };
    
  // Adding a click event listener to all elements with a class of "dog-btn"
  $(document).on("click", ".dog-btn", displayDogs);
  // Call renderButtons function to display the intial buttons
  renderButtons();
  // Adding a click event listener to all elements with a class of "gif" to play or pause
  $(document).on("click", ".gif", playPauseGifs);
  
});