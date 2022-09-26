// bool status
var inGame = false;
var loBall = 1;
var hiBall = 90;
var gameBalls = new Array();

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  

function startNewGame(){
    inGame = true;
    console.log('in game');

    gameBalls = [];
    var i = loBall;
    while (i <= hiBall) {
        gameBalls.push(1);
        i++
    }
    $('#bignumber').html("GO!");
    console.log(gameBalls);
}

function callBall(){
    console.log('calling a ball');
    // get number of balls remaining
    let ballsLeft = gameBalls.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });
    // console.log(ballsLeft+' balls available to call');
    var randomBallPosition = randomIntFromInterval(1,ballsLeft);
    // console.log(randomBallPosition+' th ball called');

    var i = loBall;
    var c = 0;
    while (i <= hiBall) {
        if (gameBalls[i-1] == 1){
            // count ball
            c++;
            if (c == randomBallPosition){
                console.log('pulled '+randomBallPosition+' of '+ballsLeft)   
                displayBall(i);
                gameBalls.splice((i-1),1,0);
                console.log(gameBalls);
            }     
        }
        i++
    }

    if (ballsLeft == 1){
        endGame();
    }
}

function displayBall(ball){
    console.log('found ball to be '+ball)
    $('#bignumber').html(ball);
    $('#ballssofar').append(ball+', ');
}

function endGame(){
    inGame = false;
    $( "#callball" ).hide();
}

$( document ).ready(function() {
    $( "#callball" ).hide();
    
    $( "#startgame" ).on( "click", function() {
        if (!inGame){
            $( "#callball" ).show();
            $( "#startgame" ).hide();
            $( "#welcome" ).hide();
            
            startNewGame();
        }
    });

    $(document).keypress(function() {
        if (inGame){
            callBall();
        }
    })   

    $( "#callball" ).on( "click", function() {
        if (inGame){
            callBall();
        }
    });
});


