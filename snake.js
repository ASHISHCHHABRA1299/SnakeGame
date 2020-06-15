function init()
{
   // canvas is used to draw graphics
   canvas=document.getElementById('mycanvas');
   W=canvas.width=600;
   H=canvas.height=600;
   pen=canvas.getContext('2d');
   game_over=false;
   cs=46;
   score=5;
   
   //Create a Image Object for food
 	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";
   
   //initial food global object
   food=getrandomfood();
   snake={
      init_len: 5,
      color: "purple",
      cells: [],
      direction: "right",

      createsnake:function()
      {
      	for(var i=this.init_len;i>0;i--){
      		this.cells.push({x:i,y:0});
      	}
      },

      drawsnake:function()
      {
      	 //Evertime erase the previous frame to draw the new frame
         for(var i=0;i<this.cells.length;i++){
         	pen.fillStyle=this.color;
         	pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
       }
      },

           updatesnake:function()
           {
      	    //Update snake according to the direction property
      	    //check if snake has eaten the food
      	    // 1. length of the snake increases
      	    // 2. generate the food object
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            if(headX==food.x&&headY==food.y)
            {
                console.log("food eaten");
                food=getrandomfood();
            }else {
            this.cells.pop();
            }
            var nextX,nextY;
			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY}); 	
			//logic whether snake is within the boundary
             
            var last_x= Math.round(W/cs);
            var last_y=Math.round(H/cs);
			if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>last_x||this.cells[0].y>last_y)
			{
				game_over=true;
			}
      }
   };
   snake.createsnake();
   //Add a Event listener on a document object 
   //e is implicitly passed which contains the meta data or the information about the keyPressed
   function KeyPressed(e)
   {
       if(e.key=="ArrowRight"||e.key=="d"){
       	 snake.direction="right";
       }else if(e.key=="ArrowLeft"||e.key=="a"){
       	 snake.direction="left";
       }else if(e.key=="ArrowDown"||e.key=="s"){
       	 snake.direction="down";
       }else if(e.key=="ArrowUp"||e.key=="w"){
         snake.direction="up"; 
       }
       console.log(snake.direction);
   }
   document.addEventListener('keydown',KeyPressed) ;
}

function draw()
{
	pen.clearRect(0,0,W,H);
	snake.drawsnake();
    //draw food
    pen.fillStyle="red";
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);	

}
function update()
{ 
    snake.updatesnake();
}
//random food generate
function getrandomfood()
{
	var foodx=Math.round(Math.random()*(W-cs)/cs);
	var foody=Math.round(Math.random()*(H-cs)/cs);
    food={
    	x:foodx,
    	y:foody,
    }
    return food;
}

function gameloop()
{
	if(game_over==true)
	{
		clearInterval(f);
	 	alert("Game Over :(");
	 	return;
	 }
	draw();
	update(); 	
}
init();
var f=setInterval(gameloop,100);