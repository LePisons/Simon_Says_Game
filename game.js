let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level + 1;
    $("h1").text(`level ${level}`);
    
  
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
$("#" + currentColour).addClass("pressed")
setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

$(".btn").on("click", function() {
   let userChosenColour = (this.id);
   userClickedPattern.push(userChosenColour);
   playSound(this.id);
   animatePress(this.id);
   let lastIndex = (userClickedPattern.length - 1);
   checkAnswer(lastIndex);

  

})

$(document).on("keypress", function(event){
    if ($("h1").text() == "Press A Key to Start") {

        nextSequence();
    }
        
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
         if (gamePattern.toString() === userClickedPattern.toString()) {
            (setTimeout(nextSequence, 1000)); 
            userClickedPattern = [];
         }
            
    } else {
        $("h1").text("Game Over");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
  }, 100);

    }
}   

$( ".reload" ).click(function() {
    location.reload();
});
