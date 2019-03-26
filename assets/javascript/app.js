$(document).ready(function() {

//Array of Dogs

var dogs = ["GSD", "Golden Retriever", "Black Lab", "Pitbull"];

// displayDogs function re-renders the HTML to display the appropriate content
function displayDogs() {

    var dog = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=tqC0R8egBTOd0JGuFbMwnsSpIop1b4F9";

    // Creating an AJAX call for the specific dog button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);
        
      // Creating a div to hold the dog type
      var dogDiv = $("#dog-view");

      // Storing the rating data
      var ratingData = response.data.rating;

      // Creating an element to have the rating displayed
      var ratingDisplay = $("<p>").text("Rating: " + ratingData);

      // Displaying the rating
      dogDiv.append(ratingDisplay);

      // Retrieving the URL for the image
      var imgURL = response.data.images.fixed_height_still.url;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      dogDiv.append(image);

      // Putting the entire movie above the previous dogs
      $("#dog-view").prepend(dogDiv);
    });

  }

  // Function for displaying dog data
  function renderButtons() {

    $("#buttons-view").empty();

    // Looping through the array of dogs
    for (var i = 0; i < dogs.length; i++) {

      // Then dynamicaly generating buttons for each dog in the array
      var btn = $("<button>");
      // Adding a class of dog-btn to our button
      btn.addClass("dog-btn");
      // Adding a data-attribute
      btn.attr("data-name", dogs[i]);
      // Providing the initial button text
      btn.text(dogs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(btn);
    }
  }

  // This function handles events where a dog button is clicked
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
  $(document).click(".dog-btn", displayDogs);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

});