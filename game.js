 //array of colors
var buttonColours = ["red","blue","green","yellow"];
//array to record pattern given by us
var gamePattern = [];
//array to record pattern clicked by user
var userClickedPattern = [];
//to track if game started
var started = false;
//to set level of game
var level = 0;

//to star game and change title
$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});





//to detect button click
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");//to get which btn is clicked

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

  });






//to choose random color
function nextSequence(){

  userClickedPattern = [];
  level++;

   $("#level-title").text("Level "+level);
  var randomNumber =Math.floor(Math.random()*4);
  var   randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  }

//to play sounds
  function playSound (name){

      var audio =new Audio('sounds/'+name+'.mp3');
      audio.play();
}

//to animate clicked button
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

//to Restart
function startOver(){
  started =false;
  level =0;
  gamePattern = [];
}

//to check answer
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  console.log("success");
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },400);
    startOver();
  }
}
