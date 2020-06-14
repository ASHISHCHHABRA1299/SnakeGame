function init()
{
   // canvas is used to draw graphics
   canvas=document.getElementById('mycanvas');
   W=canvas.width=600;
   H=canvas.height=600;
   pen=canvas.getContext('2d');
   game_over=false;
   rect={
   	x:20,
   	y:20,
   	w:50,
   	h:40,
   	speed:10,
   }  

}

function draw()
{
   pen.clearRect(0,0,W,H);
   pen.fillRect(rect.x,rect.y,rect.w,rect.h);
   pen.fillStyle="red";
}
function update()
{ 
   rect.x+=rect.speed;
   if(rect.x>W-rect.w||rect.x<0)
   	  rect.speed *= -1;
}
function gameloop()
{
	if(game_over==true)
	{
		clearInterval(f);
	 	alert("Game Over");
	 	return;
	 }
	draw();
	update(); 	
}
init();
var f=setInterval(gameloop,100);