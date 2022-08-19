const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function displayTitle(textString) {
    $('#level-title').text(textString);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    let audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animationPress(currentColor) {
    $('#'+currentColor).addClass('pressed');
    setTimeout(function() {
        $('#'+currentColor).removeClass('pressed');
    }, 200);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel === (level-1)) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        playSound('wrong');
        displayTitle('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function nextSequence () {
    level += 1;
    userClickedPattern =[];
    let randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);
    animationPress(randomChosenColour);
    playSound(randomChosenColour);
    displayTitle('Level '+level);
    // console.log("pattern: "+gamePattern +'\n'+'Level: '+level);
}

$('.btn').on('click', function(event) {
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animationPress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});

$(document).on('keypress', function(event) {
    if(started === false) {
        started = true;
        displayTitle('Level '+level);
        nextSequence();
    }
});
