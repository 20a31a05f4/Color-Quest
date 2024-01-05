var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var start = false;
var level = 0;
$(document).keypress(function(){
    if(!start){
        nextSequence(); 
        //adding color to gamepattern list, empty userClickedPattern list
        //sound, animation, increasing level 
        start = true;
    }
});

$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    level++;
    $("#level-title").text("Level "+level);
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var current_button = $("#"+currentColour)
    current_button.addClass("pressed");
    setTimeout(function () {
        current_button.removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function ()
        {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    start=false; 
}