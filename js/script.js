// Global Variable.....
let inputdir={x:0,y:0};
const foodsound=new Audio("./music/food.mp3");
const movesound=new Audio("./music/move.mp3");
const gameoversound=new Audio("./music/gameover.mp3");
const gamemusic=new Audio("./music/music.mp3");
let scorein=document.getElementById("score");
let hiscore=document.getElementById("hiscore");
let speed=10;
let score=0;
let lastPaintTime=0;
let snakearr=[{x:13,y:15}];
food={x:6,y:8};


// Game loop Function.......
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime-lastPaintTime)/1000<1/speed){
    return;
  }
  lastPaintTime=ctime;
  gameEngine();
  gamemusic.play();
}


// When the snake crash......
function iscollide(sarr){
  for(let i=1;i<snakearr.length;i++){
    if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
      return true;
    }
  }
  if(sarr[0].x>=30 || sarr[0].x<=0 || sarr[0].y>=30 || sarr[0].y<=0){
    return true;
  }
  return false;
}


// Game process Functions.....
function gameEngine(){
  // if the Snake crash.....
  if(iscollide(snakearr)){
    gameoversound.play();
    gamemusic.pause();
    inputdir={x:0,y:0};
    alert("Game Over, Press any key to restart again....");
    snakearr=[{x:13,y:15}];
    score=0;
    scorein.innerHTML="Score : "+score;
    hiscore.classList.remove("blinker");
  }

  
  //if the snake eat the food....
  if(snakearr[0].y===food.y && snakearr[0].x===food.x){
    foodsound.play();
    score+=1;
    if(score>hscoreval){
      hscoreval=score;
      localStorage.setItem("Highscore",JSON.stringify(hscoreval));
      hiscore.innerHTML="High Score : "+hscoreval;
      hiscore.classList.add("blinker");
    }
    scorein.innerHTML="Score : "+score;
    snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});
    let a=3;
    let b=27;
    food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
  }

  // Moving the snake...
  for(let i=snakearr.length-2;i>=0;i--){
    snakearr[i+1]={...snakearr[i]};
  }
  snakearr[0].x+=inputdir.x;
  snakearr[0].y+=inputdir.y;
    
  // Display the Snake.....
  let board=document.getElementsByClassName("console")[0];
  board.innerHTML="";
  snakearr.forEach((e,index)=>{
    snakeElement=document.createElement("div");
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index===0){
      snakeElement.classList.add("snakehead");
    }
    else{
      snakeElement.classList.add("snakebody");
    }
    board.appendChild(snakeElement);
  });


  // Display The Food......
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);
}





// main code Execution.....and logic..

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
  inputdir={x:0,y:1}; // start the game...
  movesound.play();
  switch(e.key){
    case "ArrowUp":
      inputdir.x=0;
      inputdir.y=-1;
      break;
    case "ArrowDown":
      inputdir.x=0;
      inputdir.y=1;
      break;
    case "ArrowLeft":
      inputdir.x=-1;
      inputdir.y=0;
      break;
    case "ArrowRight":
      inputdir.x=1;
      inputdir.y=0;
      break;
    default:
      break;
  }
})

// high score in local storage...
let hscore=localStorage.getItem("Highscore");
if(hscore===null){
  hscoreval=0;
  localStorage.setItem("Highscore",JSON.stringify(hscoreval));
}
else{
  hscoreval=JSON.parse(hscore);
  hiscore.innerHTML="High Score : "+hscore;
}