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
    console.log(noLineIntersect(startX, startY, pos.x, pos.y));
    if (noLineIntersect(startX, startY, pos.x, pos.y)){
      context.beginPath();
      context.moveTo(startX,startY);
      context.lineTo(pos.x,pos.y);
      context.stroke();
      lines.push([startX, startY, pos.x, pos.y]);
    }
    i++;
  }
  console.log("next");
  circleCoords.push(pos);
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















// const noLineIntersect = (x1,y1,x2,y2) => {
//   let i = 0;
//   if (lines.length <= 2) {return true;}
//   while (i < lines.length){
//     let x3 = lines[i][0];
//     let y3 = lines[i][1];
//     let x4 = lines[i][2];
//     let y4 = lines[i][3];
//     if ((x1 === x3 && y1 == y3) ||
//         (x2 === x3 && y2 == y3) ||
//         (x1 === x4 && y1 == y4) ||
//         (x2 === x4 && y2 == y4)) {
//           i++;
//           continue;
//     }
//
//
//     const x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
//     const y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
//     if (isNaN(x)||isNaN(y)) {
//         return true;
//     } else {
//         if (x1>=x2) {
//             if (!(x2<=x&&x<=x1)) {return true;}
//         } else {
//             if (!(x1<=x&&x<=x2)) {return true;}
//         }
//         if (y1>=y2) {
//             if (!(y2<=y&&y<=y1)) {return true;}
//         } else {
//             if (!(y1<=y&&y<=y2)) {return true;}
//         }
//         if (x3>=x4) {
//             if (!(x4<=x&&x<=x3)) {return true;}
//         } else {
//             if (!(x3<=x&&x<=x4)) {return true;}
//         }
//         if (y3>=y4) {
//             if (!(y4<=y&&y<=y3)) {return true;}
//         } else {
//             if (!(y3<=y&&y<=y4)) {return true;}
//         }
//     }
//     i++;
//   }
//     return false;
// };
