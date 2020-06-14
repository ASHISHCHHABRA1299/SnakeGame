function init()
{
   // canvas is used to draw graphics
   canvas=document.getElementById('mycanvas');
   W=canvas.width=600;
   H=canvas.height=600;
   pen=canvas.getContext('2d');
   game_over=false;
   cs=66;
   snake={
      init_len: 5,
      color: "blue",
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
         for(var i=0;i<this.cells.length;i++)
         	pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
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