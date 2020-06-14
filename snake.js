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
      	 pen.clearRect(0,0,W,H);
         for(var i=0;i<this.cells.length;i++){
         	pen.fillStyle=this.color;
         	pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
       }
      },

      updatesnake:function()
      {
          this.cells.pop();
          var headx=this.cells[0].x;
          var heady=this.cells[0].y;
          var X=headx+1;
          var Y=heady;
          this.cells.unshift({x:X,y:Y});
      }
   };
   snake.createsnake();
}

function draw()
{
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