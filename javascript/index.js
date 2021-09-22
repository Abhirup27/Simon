//PRE REQUIRED FUNCTIONS

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            unfade(element);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.65;
    }, 50);
}
function unfade(element) {
    var op = 0.1;  // initial opacity

    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.65;
    }, 10);
}

function platform()
{
   return navigator.userAgentData.platform;
}
function setScreen(){

if(plat.includes("Android") || (!plat.includes("Windows") && navigator.userAgentData.mobile== false) )
{
document.querySelector('.container').classList.add('container-mobile');
document.querySelector('.container-mobile').classList.remove('container');
document.querySelector('#update-text').innerText = "Tap on screen to start.";
document.querySelector('h3').classList.add('footer-mobile');
for(var i=0; i < document.querySelectorAll('.btn').length; i++) {
    document.querySelectorAll('.btn')[i].classList.add('btn-mobile');
    document.querySelectorAll('.btn-mobile')[i].classList.add('btn');
}
}
}
function setButtons()
{
    
    if(plat.includes("Android") || (!plat.includes("Windows") && navigator.userAgentData.mobile== false) )
    {
      return  document.querySelector(".container-mobile");
    }
    else
    {
       return document.querySelector(".container");
    }
}
//VARIABLES//
var timer=0;
var plat = platform();
setScreen();
var sequence = [];
var level =0;
var usr=0;
var i=0;
var gameOver= true;
const title= document.querySelector("#update-text");
const buttons = setButtons();

// VARIABLES//

function HandleClick(e)
{
    if(e.target.closest(".btn")){
        console.log((e.target.closest(".btn")));
        if(gameOver == false)
        {   
            if(e.target.closest(".green")){
            
            checkSeq(0,"green");
            }
            if(e.target.closest(".red")){
                
                checkSeq(1,"red");
                }
                if(e.target.closest(".yellow")){
                    
                    checkSeq(2,"yellow");
                    }
                    if(e.target.closest(".blue")){
                        
                        checkSeq(3,"blue");
                        }
        //fade(e.target.closest(".btn"));
         }
    }
}
buttons.addEventListener("click", HandleClick);
//buttons.addEventListener("touchend",HandleClick);
// if(plat != 'Android' || plat != 'iPhone' || plat != '')
// {
document.querySelector(".steps").addEventListener("click", function(){

    alert("Simon is a visual memory game where you have to remember the sequence of colours. Each level adds a new colour to the sequence and the player has to press the buttons in the correct sequence(all the buttons leading up to the current level).")
});
document.addEventListener("keydown", function(event) {
    if(gameOver== true) {
        update(1);
        gameOver = false;
        document.querySelector("body").classList.remove("game-over");
    }

})
//}
//else{
    document.addEventListener("touchend", function(event) {
        if(!event.target.closest(".steps")){
        if(gameOver== true) {
            update(1);
            gameOver = false;
            document.querySelector("body").classList.remove("game-over");
        }
    }
})
//}

function update(state)
{ 
    level++;
             title.innerText = "Level " + level;
setTimeout(function(){

    switch (state){
        case 1:
            generate();
        
             setTimeout(function(){
                playAnimSound(document.querySelectorAll(".btn")[sequence[level-1]].id);
                playAnim();
             }, timer);
            

            
            break;

        default:
            break;
        }
},500);
   
    
}

function generate(){
    if(level !=0) {
        timer = 700;
    }
sequence.push(Math.floor( ((Math.random())*4)));
}

function checkSeq(num, key)
{ 
    // green = 0 red=1, blue =2 , yellow =3
    while(i<=sequence.length)
    {   
        i++;
        if(num!=sequence[usr])
        {  
            gameOver = true;
            if(plat.includes("Android") || (!plat.includes("Windows") && navigator.userAgentData.mobile== false)){
                title.innerText = "Game Over! Tap the screen to start over!";
            }
            else{
            title.innerText = "Game Over! Press any key to start over!";
            }
            sequence = [];
            level = 0;
           // Call Animation function
           document.querySelector("body").classList.add("game-over");
        
            usr=0;
            i=0;
            playAnimSound();
            break;
        }
        else{
            if( i== sequence.length)
            {
                update(1);
                i=0;
                usr=0;
                playAnim(true,num);
                playAnimSound(key);
                break; // I FINALLY FUCKING DID IT!!! :D
            }
            else{
               playAnim(true,num);
                playAnimSound(key);
                usr++;
                break;
            }
        }
    }
   
    }

function playAnimSound(key="wrong")
{   
    if(key == "wrong")
    {
        audio = new Audio('./sounds/wrong.mp3');
        audio.play();
    }
    else
    {
        audio = new Audio('./sounds/' + key + '.mp3');
        audio.play();
    }

}
function playAnim(specific=false, num)
{
    if(!specific)
    {
    // document.querySelectorAll(".btn")[sequence[level-1]].classList.add("pressed");
    //         setTimeout(function(){

    //             document.querySelectorAll(".btn")[sequence[level-1]].classList.remove("pressed");
            
    //           }, 200);
        fade(document.querySelectorAll(".btn")[sequence[level-1]]);
}
    else
        {
            document.querySelectorAll(".btn")[num].classList.add("pressed");
            setTimeout(function(){

                document.querySelectorAll(".btn")[num].classList.remove("pressed");
            
              }, 200);
        }

}



    // if(sequence[usr] != num){
    //     gameOver = true;
    //    Call Animation function
    // }
    // else
    // {   
    //     usr++;
    //     update(1);
    // }

    // while(i<sequence.length){
    //     if(usr<= i)
    //     {   
    //     if(sequence[i] != num){
    //         gameOver = true;
    //         title.innerText = "Game Over!";
    //         Call Animation function
    //         usr=0;
    //         i=0;
    //     }
    //     else{
    //         usr++;
    //         i++;
    //     }
    //     }
    //     else
    //     {
    //         alert("break!");
    //         i=0;
    //         usr=0;
    //         break;
    //     }
    // }