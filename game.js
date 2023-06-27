var buttoncolours=["red","blue","green","yellow"];
var gamesequence=[];
var userClickedPattern=[];
var level=0;
var started=false;

function nextsequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNUmber=Math.floor(Math.random()*4);
    var randomChosencolour=buttoncolours[randomNUmber];
    // console.log(randomChosencolour);
    gamesequence.push(randomChosencolour);
    $("#"+randomChosencolour).fadeOut(100).fadeIn(100);
    playsound(randomChosencolour);
    
}
$(".btn").click(function(){
    var userChosencolour=$(this).attr("id");
    userClickedPattern.push(userChosencolour);
    playsound(userChosencolour);
    animatepress(userChosencolour);
    checkans(userClickedPattern.length-1);
});
function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatepress(currentcolour)
{
    $("."+currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolour).removeClass("pressed");
     },100);
}
$(document).keypress(function(){
   if(!started)
   {
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
   }
});
function checkans(currentlevel)
{
    if(userClickedPattern[currentlevel]===gamesequence[currentlevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamesequence.length)
        {
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        level=0;
        gamesequence=[];
    }   started=false;
}
