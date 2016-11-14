const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
canvas.addEventListener("click", (e) => drawCircle(e));
let circleCoords = [];
let lines = [];


const getMousePos = (event) => {
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

const drawCircle = (event) => {
  const pos = getMousePos(event);
  const posx = pos.x;
  const posy = pos.y;
  context.fillStyle = "#000000";
  context.beginPath();
  context.arc(posx, posy, 10, 0, 2*Math.PI);
  context.fill();
  drawLines(pos);
};

const drawLines = (pos) => {
  let i = 0;
  while (i < circleCoords.length){
    let startX = circleCoords[i].x;
    let startY = circleCoords[i].y;

    if (noLineIntersect(startX, startY, pos.x, pos.y)){
      context.beginPath();
      context.moveTo(startX,startY);
      context.lineTo(pos.x,pos.y);
      context.stroke();
      lines.push([startX, startY, pos.x, pos.y]);
    }
    i++;
  }
  circleCoords.push(pos);
};



const noLineIntersect = (x1,y1,x2,y2) => {
  let i = 0;
  if (lines.length <= 2) {return true;}
  while (i < lines.length){
    let x3 = lines[i][0];
    let y3 = lines[i][1];
    let x4 = lines[i][2];
    let y4 = lines[i][3];
    if ((x1 === x3 && y1 == y3) ||
        (x2 === x3 && y2 == y3) ||
        (x1 === x4 && y1 == y4) ||
        (x2 === x4 && y2 == y4)) {
          i++;

          continue;
    }


    const x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    const y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return true;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return true;}
        } else {
            if (!(x1<=x&&x<=x2)) {return true;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return true;}
        } else {
            if (!(y1<=y&&y<=y2)) {return true;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return true;}
        } else {
            if (!(x3<=x&&x<=x4)) {return true;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return true;}
        } else {
            if (!(y3<=y&&y<=y4)) {return true;}
        }
    }
    i++;
  }
    return false;
};
