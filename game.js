var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;

// Start Game using keyboard key press
$(document).keypress(function () {
    if (!gameOn) {
        $('h1').text('Level ' + level);
        nextSequence();
        gameOn = true;
    }
});

// Choose user colour once button clicked
$('.btn').click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


// Decide sequence
function nextSequence() {
    level++;
    $('h1').text('Level ' + level);

    // Create new array in each sequence
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
    
}

// Play sound as per colour
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


// Animate button on user click
function animatePress(currentColour) {
    $('.' + currentColour).addClass('pressed');
    setTimeout(function () {
        $('.' + currentColour).removeClass('pressed');
    }, 100);
}



// Restart game
function startOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;

}

// Check Answers by comparing last element in array between gamePattern and userClickedPattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("SUCCESS");
        
        // Compare if gamePattern and userClickedPattern arrays are having same elements in sequence
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("WRONG");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
}



