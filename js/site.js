class Vec3 {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    add(other) {
      return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
  
    subtract(other) {
      return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
  
    multiply(scalar) {
      return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
  
    divide(scalar) {
      return new Vec3(this.x / scalar, this.y / scalar, this.z / scalar);
    }
  
    dotProduct(other) {
      return this.x * other.x + this.y * other.y + this.z * other.z;
    }
  
    crossProduct(other) {
      return new Vec3(
        this.y * other.z - this.z * other.y,
        this.z * other.x - this.x * other.z,
        this.x * other.y - this.y * other.x
      );
    }
  
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  
    normalize() {
      return this.divide(this.length());
    }
  
    moveTowards(target, speed) {
      const direction = target.subtract(this);
      return this.add(direction.multiply(speed));
    }
  }
  

var canvas = document.getElementById("Waves");
var ctx = canvas.getContext("2d");
var centerScreen;
var frame = 0;
var camera = new Vec3(0,-1,0);
var floor = -1;
var mx = 0;
var my = 0;
var mousedown = false;

//Images
const burgergame1 = new Image(256*2.5, 144*2.5);
burgergame1.src = "img/Photomode1.png";
const burgergame2 = new Image(256*2.5, 144*2.5);
burgergame2.src = "img/Photomode2.png";
const burgergame3 = new Image(256*2.5, 144*2.5);
burgergame3.src = "img/Photomode3.png";

//Images
const badbogs1 = new Image(256*2.5, 144*2.5);
badbogs1.src = "img/BadBogs.png";
const badbogs2 = new Image(256*2.5, 144*2.5);
badbogs2.src = "img/BadBogs1.png";
const badbogs3 = new Image(256*2.5, 144*2.5);
badbogs3.src = "img/BadBogs2.png";

const burgerclicker = new Image(256*2.5, 144*2.5);
burgerclicker.src = "img/burgerclicker.png";


function BeginLine()
{
    ctx.beginPath();
}
function Line(a,b,c,d,color)
{
    ctx.beginPath();
    ctx.strokeStyle = color
    a = a.multiply(d);
    b = b.multiply(d);
    a = a.add(c);
    b = b.add(c);
    a = a.add(camera);
    b = b.add(camera);
    a = a.moveTowards(new Vec3(0,0),a.z)
    b = b.moveTowards(new Vec3(0,0),b.z)
    ctx.moveTo(centerScreen.x + a.x*window.innerWidth, centerScreen.y - a.y*window.innerHeight);
    ctx.lineTo(centerScreen.x + b.x*window.innerWidth, centerScreen.y - b.y*window.innerHeight);
    ctx.stroke();
}
function WorldToScreen(a)
{
    a = a.add(camera);
    a = a.moveTowards(new Vec3(0,0),a.z)
    return new Vec3(centerScreen.x + a.x*window.innerWidth, centerScreen.y - a.y*window.innerHeight,0);
}
function EndLine()
{
    ctx.stroke();
}
function DrawRoom(height,color)
{
    //Ceiling
    Line(new Vec3(-0.5,0.5,0),new Vec3(-0.5,0.5,0.5),new Vec3(0,height,0),1,color);
    Line(new Vec3(-0.5,0.5,0.5),new Vec3(0.5,0.5,0.5),new Vec3(0,height,0),1,color);
    Line(new Vec3(0.5,0.5,0.5),new Vec3(0.5,0.5,0),new Vec3(0,height,0),1,color);

    //Floor
    Line(new Vec3(-0.5,-0.5,0),new Vec3(-0.5,-0.5,0.5),new Vec3(0,height,0),1,color);
    Line(new Vec3(-0.5,-0.5,0.5),new Vec3(0.5,-0.5,0.5),new Vec3(0,height,0),1,color);
    Line(new Vec3(0.5,-0.5,0.5),new Vec3(0.5,-0.5,0),new Vec3(0,height,0),1,color);

    //Collumn
    Line(new Vec3(-0.5,0.5,0.5),new Vec3(-0.5,-0.5,0.5),new Vec3(0,height,0),1,color);
    Line(new Vec3(0.5,0.5,0.5),new Vec3(0.5,-0.5,0.5),new Vec3(0,height,0),1,color);
}
function Button(x,y,w,h,arrowFace)
{
    let bl = WorldToScreen(new Vec3(x-w/2,y-h/2,0));
    let tr = WorldToScreen(new Vec3(x+w/2,y+h/2,0));
    if(mx > bl.x && mx < tr.x && my < bl.y && my > tr.y)
    {
        Line(new Vec3(x-w/2,y-h/2,0),new Vec3(x+w/2,y-h/2,0),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x-w/2,y+h/2,0),new Vec3(x+w/2,y+h/2,0),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x-w/2,y-h/2,0),new Vec3(x-w/2,y+h/2,0),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x+w/2,y-h/2,0),new Vec3(x+w/2,y+h/2,0),new Vec3(0,0,0),1,"#149efa");

        Line(new Vec3(x-w/2,y-h/2,0.05),new Vec3(x+w/2,y-h/2,0.05),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x-w/2,y+h/2,0.05),new Vec3(x+w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x-w/2,y-h/2,0.05),new Vec3(x-w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x+w/2,y-h/2,0.05),new Vec3(x+w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#149efa");

        Line(new Vec3(x-w/2,y-h/2,0),new Vec3(x-w/2,y-h/2,0.05),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x+w/2,y-h/2,0),new Vec3(x+w/2,y-h/2,0.05),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x-w/2,y+h/2,0),new Vec3(x-w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#149efa");
        Line(new Vec3(x+w/2,y+h/2,0),new Vec3(x+w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#149efa");

        if(arrowFace)
        {
            Line(new Vec3(x-0.025,y+0.025,0.025),new Vec3(x,y-0.025,0.025),new Vec3(0,0,0),1,"#149efa");
            Line(new Vec3(x+0.025,y+0.025,0.025),new Vec3(x,y-0.025,0.025),new Vec3(0,0,0),1,"#149efa");
        }
        else
        {
            Line(new Vec3(x-0.025,y-0.025,0.025),new Vec3(x,y+0.025,0.025),new Vec3(0,0,0),1,"#149efa");
            Line(new Vec3(x+0.025,y-0.025,0.025),new Vec3(x,y+0.025,0.025),new Vec3(0,0,0),1,"#149efa");
        }
        return true;
    }
    else
    {
        Line(new Vec3(x-w/2,y-h/2,0),new Vec3(x+w/2,y-h/2,0),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x-w/2,y+h/2,0),new Vec3(x+w/2,y+h/2,0),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x-w/2,y-h/2,0),new Vec3(x-w/2,y+h/2,0),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x+w/2,y-h/2,0),new Vec3(x+w/2,y+h/2,0),new Vec3(0,0,0),1,"#FFFFFF");

        Line(new Vec3(x-w/2,y-h/2,0.05),new Vec3(x+w/2,y-h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x-w/2,y+h/2,0.05),new Vec3(x+w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x-w/2,y-h/2,0.05),new Vec3(x-w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x+w/2,y-h/2,0.05),new Vec3(x+w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");

        Line(new Vec3(x-w/2,y-h/2,0),new Vec3(x-w/2,y-h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x+w/2,y-h/2,0),new Vec3(x+w/2,y-h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x-w/2,y+h/2,0),new Vec3(x-w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");
        Line(new Vec3(x+w/2,y+h/2,0),new Vec3(x+w/2,y+h/2,0.05),new Vec3(0,0,0),1,"#FFFFFF");

        if(arrowFace)
        {
            Line(new Vec3(x-0.025,y+0.025,0.025),new Vec3(x,y-0.025,0.025),new Vec3(0,0,0),1,"#FFFFFF");
            Line(new Vec3(x+0.025,y+0.025,0.025),new Vec3(x,y-0.025,0.025),new Vec3(0,0,0),1,"#FFFFFF");
        }
        else
        {
            Line(new Vec3(x-0.025,y-0.025,0.025),new Vec3(x,y+0.025,0.025),new Vec3(0,0,0),1,"#FFFFFF");
            Line(new Vec3(x+0.025,y-0.025,0.025),new Vec3(x,y+0.025,0.025),new Vec3(0,0,0),1,"#FFFFFF");
        }
        return false;
    }

}

function DrawImage(img,p,w,h,i,d,hoverscale,link = "")
{
    if(hoverscale)
    {
        let nw = w;
        let nh = h;
        let np = p;
        np.z = p.z;
        nw*=screen.height;
        nh*=screen.height;
        nw *= 1-np.z;
        nh *= 1-np.z;
        if(mx > WorldToScreen(np).x-nw/2 && mx < WorldToScreen(np).x+nw/2 && my > WorldToScreen(np).y-nh/2 && my < WorldToScreen(np).y+nh/2)
        {
            w *= 1.15;
            h *= 1.15;
            if(mousedown==true)
            {
                if(link!="")
                {
                    window.open(link, "_blank");
                }
            }
        }
    }
    for (let z = 0; z < i; z++) 
    {
        let nw = w;
        let nh = h;
        let np = p;
        np.z = p.z - ((((i-1)-z)/(i-1))*d)
        nw*=screen.height;
        nh*=screen.height;
        nw *= 1-np.z;
        nh *= 1-np.z;
        ctx.drawImage(img,WorldToScreen(np).x-nw/2,WorldToScreen(np).y-nh/2,nw,nh);
    }
}

function DrawText(txt,s,p)
{
    ctx.font = `${s}px serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(txt, WorldToScreen(p).x,WorldToScreen(p).y);
}

function Draw()
{
    frame += 0.01;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    centerScreen = new Vec3(window.innerWidth/2,window.innerHeight/2);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    camera.y = camera.y + (floor - camera.y) * 0.2;
    BeginLine();


    let colors = ["#fa143b","#8714fa","#14fa4a","#149efa","#FFFFFF"]

    ctx.lineWidth = 3
    let room_count = 8;
    for (let i = 0; i < room_count; i++)
    {
        let ci = (i);
        while(ci >= colors.length)
        {
            ci = ci - colors.length;
        }
        DrawRoom(-i+1, colors[ci])
        if(i != room_count-1)
        {
            if(Button(0,-0.33-i+1,0.25,0.1,true))
            {
                if(mousedown == true)
                {
                    floor += 1;
                }
            }
            if(Button(0,-1+0.33-i+1,0.25,0.1,false))
            {
                if(mousedown == true)
                {
                    floor -= 1;
                }
            }
        }
    }

    //Warning
    DrawText("Epilepsy Warning",32,new Vec3(0,1,0))

    //Floor 1
    for (let i = 0; i < 64; i++)
    {
        let ci = (i/16)+Math.floor(frame*25);
        while(ci >= colors.length)
        {
            ci = ci - colors.length;
        }
        let z = (64-i)/1024;
        //L
        Line(new Vec3(-0.1,0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(-0.4,Math.sin(frame+0)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,-0.5,0),new Vec3(0.1,-0.5,0),new Vec3(-0.4,Math.sin(frame+0)*0.05+0.1,z),0.1,colors[ci]);

        //A
        Line(new Vec3(-0.1,-0.5,0),new Vec3(0.0,0.5,0),new Vec3(-0.2,Math.sin(frame+1.570795)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(0.0,0.5,0),new Vec3(0.1,-0.5,0),new Vec3(-0.2,Math.sin(frame+1.570795)*0.05+0.1,z),0.1,colors[ci]);

        //R
        Line(new Vec3(-0.1,0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(-0.0,Math.sin(frame+3.14159)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0.1,-0.5,0),new Vec3(-0.0,Math.sin(frame+3.14159)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0,0),new Vec3(-0.0,Math.sin(frame+3.14159)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(0.1,0,0),new Vec3(-0.1,0,0),new Vec3(-0.0,Math.sin(frame+3.14159)*0.05+0.1,z),0.1,colors[ci]);

        //G
        Line(new Vec3(-0.1,0,0),new Vec3(0,0.5,0),new Vec3(0.2,Math.sin(frame+4.712385)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0,0.5,0),new Vec3(0.1,0.25,0),new Vec3(0.2,Math.sin(frame+4.712385)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0,-0.5,0),new Vec3(0.2,Math.sin(frame+4.712385)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(0,-0.5,0),new Vec3(0.1,0,0),new Vec3(0.2,Math.sin(frame+4.712385)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(0.1,0,0),new Vec3(0,0,0),new Vec3(0.2,Math.sin(frame+4.712385)*0.05+0.1,z),0.1,colors[ci]);

        //E
        Line(new Vec3(-0.1,0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(0.4,Math.sin(frame)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,-0.5,0),new Vec3(0.1,-0.5,0),new Vec3(0.4,Math.sin(frame)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0.1,0,0),new Vec3(0.4,Math.sin(frame)*0.05+0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0.5,0),new Vec3(0.4,Math.sin(frame)*0.05+0.1,z),0.1,colors[ci]);

        //G
        Line(new Vec3(-0.1,0,0),new Vec3(0,0.5,0),new Vec3(-0.2,Math.sin(frame+4.712385)*0.05-0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0,0.5,0),new Vec3(0.1,0.25,0),new Vec3(-0.2,Math.sin(frame+4.712385)*0.05-0.1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0,-0.5,0),new Vec3(-0.2,Math.sin(frame+4.712385)*0.05-0.1,z),0.1,colors[ci]);
        Line(new Vec3(0,-0.5,0),new Vec3(0.1,0,0),new Vec3(-0.2,Math.sin(frame+4.712385)*0.05-0.1,z),0.1,colors[ci]);
        Line(new Vec3(0.1,0,0),new Vec3(0,0,0),new Vec3(-0.2,Math.sin(frame+4.712385)*0.05-0.1,z),0.1,colors[ci]);

        //U
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.0,-0.5,0),new Vec3(0,Math.sin(frame+3.14159)*0.05-0.1,z),0.1,colors[ci]);
        Line(new Vec3(0.0,-0.5,0),new Vec3(0.1,0.5,0),new Vec3(0,Math.sin(frame+3.14159)*0.05-0.1,z),0.1,colors[ci]);

        //Y
        Line(new Vec3(0,0,0),new Vec3(0.0,-0.5,0),new Vec3(0.2,Math.sin(frame+1.570795)*0.05-0.1,z),0.1,colors[ci]);
        Line(new Vec3(0,0,0),new Vec3(-0.1,0.5,0),new Vec3(0.2,Math.sin(frame+1.570795)*0.05-0.1,z),0.1,colors[ci]);
        Line(new Vec3(0,0,0),new Vec3(0.1,0.5,0),new Vec3(0.2,Math.sin(frame+1.570795)*0.05-0.1,z),0.1,colors[ci]);
    }

    //Floor 2 Projects

    for (let i = 0; i < 64; i++)
    {
        let ci = (i/16)+Math.floor(frame*25);
        while(ci >= colors.length)
        {
            ci = ci - colors.length;
        }
        let z = (64-i)/1024;

        //P
        Line(new Vec3(-0.1,0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(-0.35,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0,0),new Vec3(-0.35,-1,z),0.1,colors[ci]);
        Line(new Vec3(0.1,0,0),new Vec3(-0.1,0,0),new Vec3(-0.35,-1,z),0.1,colors[ci]);

        //R
        Line(new Vec3(-0.1,0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(-0.25,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0.1,-0.5,0),new Vec3(-0.25,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0,0),new Vec3(-0.25,-1,z),0.1,colors[ci]);
        Line(new Vec3(0.1,0,0),new Vec3(-0.1,0,0),new Vec3(-0.25,-1,z),0.1,colors[ci]);

        //O
        Line(new Vec3(-0.1,0,0),new Vec3(-0,0.5,0),new Vec3(-0.15,-1,z),0.1,colors[ci]);
        Line(new Vec3(0,0.5,0),new Vec3(0.1,0,0),new Vec3(-0.15,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(-0,-0.5,0),new Vec3(-0.15,-1,z),0.1,colors[ci]);
        Line(new Vec3(0,-0.5,0),new Vec3(0.1,0,0),new Vec3(-0.15,-1,z),0.1,colors[ci]);

        //J
        Line(new Vec3(0.1,0.5,0),new Vec3(0.1,0,0),new Vec3(-0.05,-1,z),0.1,colors[ci]);
        Line(new Vec3(0.1,0,0),new Vec3(0,-0.5,0),new Vec3(-0.05,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0,-0.5,0),new Vec3(-0.05,-1,z),0.1,colors[ci]);

        //E
        Line(new Vec3(-0.1,0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(0.05,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,-0.5,0),new Vec3(0.1,-0.5,0),new Vec3(0.05,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0.1,0,0),new Vec3(0.05,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0.5,0),new Vec3(0.05,-1,z),0.1,colors[ci]);

        //C
        Line(new Vec3(-0.1,0,0),new Vec3(-0,0.5,0),new Vec3(0.15,-1,z),0.1,colors[ci]);
        Line(new Vec3(0,0.5,0),new Vec3(0.1,0.25,0),new Vec3(0.15,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(-0,-0.5,0),new Vec3(0.15,-1,z),0.1,colors[ci]);
        Line(new Vec3(0,-0.5,0),new Vec3(0.1,-0.25,0),new Vec3(0.15,-1,z),0.1,colors[ci]);

        //T
        Line(new Vec3(0,0.5,0),new Vec3(0,-0.5,0),new Vec3(0.25,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0.5,0),new Vec3(0.25,-1,z),0.1,colors[ci]);

        //S
        Line(new Vec3(-0.1,0.25,0),new Vec3(0,0.5,0),new Vec3(0.35,-1,z),0.1,colors[ci]);
        Line(new Vec3(0,0.5,0),new Vec3(0.1,0.25,0),new Vec3(0.35,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.25,0),new Vec3(0.1,-0.25,0),new Vec3(0.35,-1,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,-0.25,0),new Vec3(-0,-0.5,0),new Vec3(0.35,-1,z),0.1,colors[ci]);
        Line(new Vec3(0,-0.5,0),new Vec3(0.1,-0.25,0),new Vec3(0.35,-1,z),0.1,colors[ci]);
    }

    DrawText("Burger Game",64,new Vec3(0,-1.9,0.25))
    DrawImage(burgergame1,new Vec3(-0.25,-2.15,0.25),0.8/2,0.45/2,16,0.005,true)
    DrawImage(burgergame2,new Vec3(0.25,-2.15,0.25),0.8/2,0.45/2,16,0.005,true)
    DrawImage(burgergame3,new Vec3(0,-2.15,0.25),0.8/2,0.45/2,16,0.005,true)

    DrawText("Burger Clicker (Click To Play)",64,new Vec3(0,-2.8,0.25))
    DrawImage(burgerclicker,new Vec3(0,-3.075,0.25),0.8/1.5,0.45/1.5,16,0.005,true,"https://large-guys.github.io/burgerclicker.github.io/")

    DrawText("Bad Bogs Demo (Click To Play)",64,new Vec3(0,-3.9,0.25))
    DrawImage(badbogs1,new Vec3(-0.25,-4.15,0.25),0.8/2,0.45/2,16,0.005,true,"https://drive.google.com/file/d/1Sirz2-K3Z0NQe_jMarxwkR6xbOu6vOFR/view?usp=sharing")
    DrawImage(badbogs2,new Vec3(0.25,-4.15,0.25),0.8/2,0.45/2,16,0.005,true,"https://drive.google.com/file/d/1Sirz2-K3Z0NQe_jMarxwkR6xbOu6vOFR/view?usp=sharing")
    DrawImage(badbogs3,new Vec3(0,-4.15,0.25),0.8/2,0.45/2,16,0.005,true,"https://drive.google.com/file/d/1Sirz2-K3Z0NQe_jMarxwkR6xbOu6vOFR/view?usp=sharing")

    //About
    for (let i = 0; i < 64; i++)
    {
        let ci = (i/16)+Math.floor(frame*25);
        while(ci >= colors.length)
        {
            ci = ci - colors.length;
        }
        let z = (64-i)/1024;

        //A
        Line(new Vec3(-0.1,-0.5,0),new Vec3(0.0,0.5,0),new Vec3(-0.2,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(0.0,0.5,0),new Vec3(0.1,-0.5,0),new Vec3(-0.2,-room_count+3,z),0.1,colors[ci]);

        //B
        Line(new Vec3(-0.1,0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(-0.1,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(0.1,-0.5,0),new Vec3(-0.1,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0,0),new Vec3(-0.1,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(0.1,0,0),new Vec3(-0.1,0,0),new Vec3(-0.1,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(0.1,-0.5,0),new Vec3(-0.1,-0.5,0),new Vec3(-0.1,-room_count+3,z),0.1,colors[ci]);

        //O
        Line(new Vec3(-0.1,0,0),new Vec3(-0,0.5,0),new Vec3(-0,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(0,0.5,0),new Vec3(0.1,0,0),new Vec3(-0,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0,0),new Vec3(-0,-0.5,0),new Vec3(-0,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(0,-0.5,0),new Vec3(0.1,0,0),new Vec3(-0,-room_count+3,z),0.1,colors[ci]);

        //U
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.0,-0.5,0),new Vec3(0.1,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(0.0,-0.5,0),new Vec3(0.1,0.5,0),new Vec3(0.1,-room_count+3,z),0.1,colors[ci]);

        //T
        Line(new Vec3(0,0.5,0),new Vec3(0,-0.5,0),new Vec3(0.2,-room_count+3,z),0.1,colors[ci]);
        Line(new Vec3(-0.1,0.5,0),new Vec3(0.1,0.5,0),new Vec3(0.2,-room_count+3,z),0.1,colors[ci]);

    }

    DrawText("I am a game dev, and now a web developer!",32,new Vec3(0,-room_count+3-0.8+0.025,0.25))
    DrawText("Above are some of my projects.",32,new Vec3(0,-room_count+3-0.9+0.025,0.25))
    DrawText("I am currently working on my",32,new Vec3(0,-room_count+2-0.1+0.025,0.25))
    DrawText("Open World-Cooking-Physics-Sandbox-Game,",32,new Vec3(0,-room_count+2-0.2+0.025,0.25))
    DrawText("called Burger Game!",32,new Vec3(0,-room_count+2-0.3+0.025,0.25))
    mousedown = false;
    requestAnimationFrame(Draw)
}
function MouseInput(event)
{
    mx = event.clientX;
    my = event.clientY;
}
function Press()
{
    console.log("CLick!")
    mousedown = true
}
requestAnimationFrame(Draw)