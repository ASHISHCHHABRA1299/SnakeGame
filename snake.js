function init()
{
   // canvas is used to draw graphics
   canvas=document.getElementById('mycanvas');
   W=canvas.width=600;
   H=canvas.height=600;
   pen=canvas.getContext('2d');
   game_over=false;
   cs=46;
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
            this.cells.pop();
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
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
      }
   };
   snake.createsnake();
   //Add a Event listener on a document object 
   //e is implicitly passed which contains the meta data or the information about the keyPressed
   function KeyPressed(e)
   {
       if(e.key=="ArrowRight"){
       	 snake.direction="right";
       }else if(e.key=="ArrowLeft"){
       	 snake.direction="left";
       }else if(e.key=="ArrowDown"){
       	 snake.direction="down";
       }else {
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
}
function update()
{ 
    snake.updatesnake();
}
function gameloop()
{
	// if(game_over==true)
	// {
	// 	clearInterval(f);
	//  	alert("Game Over");
	//  	return;
	//  }
	draw();
	update(); 	
}
init();
var f=setInterval(gameloop,100);