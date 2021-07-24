var outer = document.getElementById("outer-box");
var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");
var ball = document.getElementById('ball');
var header = document.getElementById('header');

var p1s = document.getElementById('player1'); 
var p2s = document.getElementById('player2'); 

var rodPosition = rod1.offsetLeft;
var rodSpeed = 0;
var topPositionBall = ball.offsetTop;
var rtp = topPositionBall;
var leftPositionBall = ball.offsetLeft;
var rlp = leftPositionBall;
var topSpeedBall = 0; 
var leftSpeedBall = 0;
var tside = 0;
var lside = 0;

document.addEventListener('keydown',move);
document.addEventListener('keyup',stopMove);

var s1 = 0;
var s2 = 0;
var flag = false;

//function for starting the game on Enter.
//move the ball in random direction.
function move(e){
    if(e.keyCode=="37")
    {
        rodSpeed=-30;
    }
    else if(e.keyCode=="39")
    {
        rodSpeed=30;
    }
    else if(!flag && e.keyCode=="13")
    {
        flag=true;
        if(Math.random()<0.5)
        {
            tside = 1;
        }
        else{
            tside = -1;
        }
        if(Math.random()<0.5)
        {
            lside = 1;
        }
        else{
            lside = -1;
        }
        topSpeedBall = tside*(7);
        leftSpeedBall = lside*(7);
    }
}

function stopMove(e){
    if(e.keyCode == "37")
    {
        rodSpeed = 0;
    }
    else if(e.keyCode == "39")
    {
        rodSpeed = 0;
    }
}

//function for reseting the game for another round.
function reset(){
    rodPosition = rod1.offsetLeft;
    rodSpeed = 0;
    topPositionBall = rtp;
    leftPositionBall = rlp;
    topSpeedBall = 0; 
    leftSpeedBall = 0;
    tside = 0;
    lside = 0;
    flag = false;
}

//function used for effect of the header (blinking) .
window.setInterval(changeHeaderColor,1000); 

function changeHeaderColor(){   
    setTimeout(function(){header.style.color="red";},200);
    setTimeout(function(){header.style.color="yellow";},400);
    setTimeout(function(){header.style.color="blue";},600);
    setTimeout(function(){header.style.color="green";},800);
}


//update the position of the ball and show after every 30ms.
window.setInterval(show,30); 

function show(){   

    if(rod1.offsetLeft + rodSpeed < 0 || rod1.offsetLeft + rodSpeed > outer.clientWidth - rod1.clientWidth)
    {
        rodSpeed = 0;
    }
    rodPosition += rodSpeed;
    rod1.style.left = rodPosition + "px";
    rod2.style.left = rodPosition + "px";

    if(leftPositionBall + leftSpeedBall < 0  || leftPositionBall > outer.clientWidth - ball.clientWidth)
    {
               leftSpeedBall = (-1) * leftSpeedBall;
    }
    if(ball.offsetTop<rod1.offsetTop+rod1.clientHeight && leftPositionBall+leftSpeedBall>rod1.offsetLeft && leftPositionBall+leftSpeedBall<=rod1.offsetLeft+rod1.clientWidth)
    {
               topSpeedBall = (-1) * topSpeedBall;
    }
    else if(ball.offsetTop>rod2.offsetTop-rod2.clientHeight && ball.offsetTop>rod2.offsetTop-rod2.clientHeight && leftPositionBall+leftSpeedBall>rod2.offsetLeft && leftPositionBall+leftSpeedBall<=rod2.offsetLeft+rod2.clientWidth)
    {
               topSpeedBall = (-1) * topSpeedBall;
    }
    topPositionBall += topSpeedBall;
    leftPositionBall += leftSpeedBall;
    ball.style.top = topPositionBall+"px";
    ball.style.left = leftPositionBall+"px";
    if(topPositionBall < rod1.offsetTop - rod1.clientHeight)
    {
        ++s2;
        p2s.innerText = s2;
        reset();
    }
    else if(topPositionBall > rod2.offsetTop)
    {
        ++s1;
        p1s.innerText = s1;
        reset();
    }
}

