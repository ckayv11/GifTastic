$(document).ready(function() {

//Array of Dogs

var dogs = ["GSD", "Golden Retriever", "Black Lab", "Pitbull"];

// displayDogs function re-renders the HTML to display the appropriate content
function displayDogs() {

    var dog = $(this).attr("data-dog");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=tqC0R8egBTOd0JGuFbMwnsSpIop1b4F9&limit=10";

    // Creating an AJAX call for the specific dog button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

      // Creating a div to hold the dog type
      var dogDiv = $("<div>");

      for (var i = 0; i < response.data.length; i++) {

      // Retrieving the URL for the still and animate images
      var stillImageURL = response.data[i].images.fixed_height_still.url;
      var animateImageURL = response.data[i].images.fixed_height.url;

      // Creating an element to hold the image
      var imgURL = $("<img>").attr("src", stillImageURL);
      imgURL.attr("data-still", stillImageURL);
      imgURL.attr("data-animate", animateImageURL);
      imgURL.attr("data-state", "still");

      // Storing the rating data
      var ratingData = response.data[i].rating;

      // Creating an element to have the rating displayed
      var ratingDisplay = $("<p>").text("Rating: " + ratingData);

      // Append image and ratings
      dogDiv.append(imgURL, ratingDisplay);

      // Prependng the dogDiv to the HTML page in the "#dog-view" div
      $("#dog-view").prepend(dogDiv);

      };
    });

  }; //End of displayDogs function

  // Function for displaying dog buttons
  function renderButtons() {

    $("#buttons-view").empty();

    // Looping through the array of dogs
    for (var i = 0; i < dogs.length; i++) {

      // Then dynamicaly generating buttons for each dog in the array
      var btn = $("<button>");
      // Adding a class of dog-btn to our button
      btn.addClass("dog-btn btn btn-info m-1");
      // Adding a data-attribute
      btn.attr("data-dog", dogs[i]);
      // Providing the initial button text
      btn.text(dogs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(btn);
    }
  }

  // Function handles events where submit button is clicked
  $("#add-dog").click(function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var dog = $("#form-input").val().trim();

    // Adding dog from the textbox to our array
    dogs.push(dog);

    // Calling renderButtons which handles the processing of our dog array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "dog-btn"
    $(document).on("click", ".dog-btn", displayDogs);
  // Calling the renderButtons function to display the intial buttons
  renderButtons();

});




