var r = 10;
var a_canvas;
var a_context;
var x_cords = [];
var y_cords = [];
var adjacent_nodes=[];
var start_node="";
var end_node="";
var color=["#FF0000","#FFFF00","#0000FF","#00FF00","#000000"];
function my_draw(div)
{
	a_canvas = get_div(div);
	a_canvas.addEventListener("click",get_cursor_position,"false");
}
function get_div(div)
{
	return document.getElementById(div);
}
function get_context()
{
	return a_canvas.getContext("2d");
}
function get_cursor_position(e)
{
	var x=e.pageX - a_canvas.offsetLeft;
	var y=e.pageY - a_canvas.offsetTop;
	a_context=get_context(a_canvas);
	check_image(x,y);
}
function check_image(x,y)
{
	if(document.choice.choice1.checked)
	{
		draw_nodes(x,y);
	}
	if(document.choice.choice2.checked)
	{
		draw_arcs(x,y);
	}
	if(document.choice.choice3.checked)
	{
		display_list();	
	}
}	
function draw_line(start_node,end_node)
{
	
	a_context.moveTo(x_cords[start_node],y_cords[start_node]);
	a_context.fillRect(x_cords[end_node]-1,y_cords[end_node]-1,2,2)
	a_context.lineTo(x_cords[end_node],y_cords[end_node]);
	a_context.strokeStyle="#000";
	a_context.stroke();
}
function draw_circle(x,y)
{
	a_context.beginPath();
	a_context.arc(x,y,r,0,Math.PI*2,false);
	a_context.strokeStyle="#a0f";
	a_context.stroke;
	fill_circle("#ffff00");
	a_context.closePath();
}
function fill_circle(colour)
{
	a_context.fillStyle=colour;
	a_context.fill();
}
function draw_nodes(x,y)
{
	x_cords.push(x);
	y_cords.push(y);
	a_context.fillStyle="#000";
	a_context.font="10px saerf"
	a_context.fillText(adjacent_nodes.length,x,y-r);
	adjacent_nodes.push(adjacent_nodes.length);
	adjacent_nodes[adjacent_nodes.length-1]=[];	
	draw_circle(x,y);
}
function is_in_circle(x,y)
{
	node=-1;
	for(i = 0;i < x_cords.length;i++)
	{
		if(((x > (x_cords[i]-r)) && (x < (x_cords[i]+r))) && ((y > (y_cords[i]-r)) && (y < (y_cords[i] + r))))
		{
			node= i;
			break;
		}
	}
	return node;
}
function draw_arcs(x,y)
{
	var node=is_in_circle(x,y);
	//if((node!=-1) && (node!=start_node))
	if(node!=-1)
	{//alert(start_node);
		if(start_node == "")
		{
			start_node=node;
			a_context.fillStyle="#000";
			a_context.fillRect(x_cords[start_node]-1,y_cords[start_node]-1,2,2);
		}
		else
		{
			end_node=node;
			adjacent_nodes[start_node].push(end_node);
			adjacent_nodes[end_node].push(start_node);
			draw_line(start_node,end_node);
			start_node="";
			end_node="";
		}
	}
	else
	{
		alert("Please select a node");
		return false;
	}
}
function display_list()
{
	var j = 0;
	var list_item="[";
	var msg_string = "";
	while(j < adjacent_nodes.length)
	{
		msg_string = msg_string+"Adjacent nodes of node " + j + "are " + adjacent_nodes[j] + "  :::  ";
		list_item=list_item+"["+adjacent_nodes[j]+"],";
		j=j+1;
	}
	list_item=list_item+"]"
//	alert(msg_string);
//	alert(list_item);

	$.post("/mapcolour",{item:list_item},function(data){
	for(i=0;i<data.length;i++)
	{
//		alert(color[data[i]]);
		a_context.beginPath();
		a_context.arc(x_cords[i],y_cords[i],r,0,Math.PI*2,false);
		a_context.strokeStyle="#a0f";
		a_context.stroke;
		fill_circle(color[data[i]]);
		a_context.closePath();
	}
		},"json");	
}

