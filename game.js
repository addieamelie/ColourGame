var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(event) {
  if (!started) {
    started = true;
    //$("#level-title").html("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); //get id button that got clicked
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); //pasing index of last number in the sequence
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  if (level > 5) {
    playSound("cheer");
    $("h1").html("SUCCESS! Your Memory Is Great 🎉");
    $("#level-title").html("Press Any Key To Restart");
    startOver();
  } else {
    $("h1").html("🎮 Colour Sequence Game 🎮");
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    setTimeout(function() {
      $("#" + randomChosenColour)
      .fadeIn(200)
      .fadeOut(200)
      .fadeIn(200);
      playSound(randomChosenColour);;
    }, 1000);
    
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //check if the most recent answer is same as game pattern
    console.log("Success");
    //check if user completed the sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over 😭");
    $("h2").html("Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
