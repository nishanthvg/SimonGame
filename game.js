let buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
]

//To keep track of the levels
let level = 0;
let start = false ;

// pattern asked 
let gamePattern = [];
// to track the user
let userClickedColour = [];
//Start over function, setting neccessary values 
function startOver () {
    start = false;
    level = 0;
    gamePattern = [];
}

// To play sound when clicked
function playSound (name ) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//Animation when button is clicked 
function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    },100);
}
// to check whether the ans is crct 
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedColour[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedColour.length) {
            setTimeout(() => {
                nextSequence();
            },1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(() => {
            $('body').removeClass("game-over");
        },200);
        $("h1").text("Game over, Press any key to restart")
        console.log("wrong");
        startOver();
    }
}

// to create new colour sequence 
function nextSequence () {
    userClickedColour = [];
    level++;
    $("h1").text("Level" + " " + level);
    
    let randomNumber = Math.floor(Math.random()*4);
    let randomColourChoosen = buttonColours[randomNumber];
    gamePattern.push(randomColourChoosen);
    $("#" + randomColourChoosen)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomColourChoosen);
}

// event when button is clicked 
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedColour.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // to check the ans
    checkAnswer(userClickedColour.length -1 );
})

//Calling nextSequence, to keep track the game has started or not 
//ONly on first key press 
$(".inp").keydown(function (e) { 
    if(!start) {
        $("h1").text("Level" + " " + level);
        nextSequence();
        start = true;
    }
});

$(document).keydown(function (e) { 
    if(!start) {
        $("h1").text("Level" + " " + level);
        nextSequence();
        start = true;
    }
});
