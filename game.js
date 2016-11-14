const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
canvas.addEventListener("click", (e) => drawCircle(e));


//
// const img = new Image;
// img.src = 'forest.jpg';
// context.fillStyle = context.createPattern('img', 'no-repeat');
context.fillStyle = '#ffffff';
context.fillRect(0, 0, 1000, 600);
context.lineWidth = 1;

let circleCoords = [];
let lines = [];


const getMousePos = (event) => {
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

const drawCircle = (event) => {
  context.globalCompositeOperation = 'source-over';

  const pos = getMousePos(event);
  const posx = pos.x;
  const posy = pos.y;
  context.fillStyle = "#000000";
  context.beginPath();
  context.arc(posx, posy, 2, 0, 2*Math.PI);
  context.fill();
  drawLines(pos);
};

const drawLines = (pos) => {
  context.globalCompositeOperation = 'source-over';

  let i = 0;
  while (i < circleCoords.length){
    let startX = circleCoords[i].x;
    let startY = circleCoords[i].y;
    if (noLineIntersect(startX, startY, pos.x, pos.y)){
      context.beginPath();
      context.moveTo(startX,startY);
      context.lineTo(pos.x,pos.y);
      context.strokeStyle = '#000000';
      context.stroke();

      lines.push([startX, startY, pos.x, pos.y]);
    }
    i++;
  }
  circleCoords.push(pos);
  uncoverPicture();
};

const uncoverPicture = () => {
  let i = 0;

  while (i < circleCoords.length - 2){
    context.globalCompositeOperation = 'destination-out';
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.beginPath();
    context.moveTo(circleCoords[i].x,circleCoords[i].y);
    context.lineTo(circleCoords[i+1].x,circleCoords[i+1].y);
    context.lineTo(circleCoords[i+2].x,circleCoords[i+2].y);
    context.fill();

    context.globalCompositeOperation = 'source-over';
    context.fillStyle = `rgba(${randRGB()}, ${randRGB()}, ${randRGB()}, 0.3)`;
    context.beginPath();
    context.moveTo(circleCoords[i].x,circleCoords[i].y);
    context.lineTo(circleCoords[i+1].x,circleCoords[i+1].y);
    context.lineTo(circleCoords[i+2].x,circleCoords[i+2].y);
    context.fill();



    i++;
  }
};

const randRGB = () => {
  const min = Math.ceil(0);
  const max = Math.floor(255);
  return Math.floor(Math.random() * (max - min)) + min;
};

const noLineIntersect = (x1, y1, x2, y2) => {
  let i = 0;
  if (lines.length <= 2) {return true;}
  while (i < lines.length){
    let x3 = lines[i][0];
    let y3 = lines[i][1];
    let x4 = lines[i][2];
    let y4 = lines[i][3];
    let result = checkLineIntersection(x1,y1,x2,y2,x3,y3,x4,y4);
    if ((x1 === x3 && y1 === y3) ||
        (x2 === x3 && y2 === y3) ||
        (x1 === x4 && y1 === y4) ||
        (x2 === x4 && y2 === y4)) {
          i++;
      continue;

    } else if (result.onLine1 && result.onLine2){

      return false;
    }
    i++;
  }
  return true;
};

function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;

}
