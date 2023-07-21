let userClickedPattern = [];
let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let level = 0;
let started = false;

// util functions
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function(){$(currentColor).removeClass("pressed")},100)
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

//body keydown
$(document).on("keydown", function (){if(!started){$("h1").text("Level " + level);nextSequence(); started = true;}});

//button press
$(".btn").on("click",function(){
    if(started) {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress("#" + userChosenColor)
        checkAnswer(userClickedPattern.length - 1);
    }
})

//next Sequence
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+ level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

//checking answer
function checkAnswer(currentLevel) {
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function (){nextSequence()}, 1000)
    }

}
else{
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function (){$("body").removeClass("game-over")}, 200);
    $("h1").text("Game Over at level "+(level-1) + ", Press Any Key To Restart");
    startOver();
}
}

