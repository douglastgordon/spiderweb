const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
canvas.addEventListener("click", (e) => drawCircle(e));
let circleCoords = [];


const getMousePos = (event) => {
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

const drawCircle = (event) => {
  const pos = getMousePos(event);
  circleCoords.push(pos);
  const posx = pos.x;
  const posy = pos.y;
  context.fillStyle = "#000000";
  context.beginPath();
  context.arc(posx, posy, 10, 0, 2*Math.PI);
  context.fill();
  drawLines();
};

const drawLines = () => {
  let i = 0;
  while (i < circleCoords.length - 1){
    let j = i + 1;
    while (j < circleCoords.length){
      context.beginPath();
      context.moveTo(circleCoords[i].x,circleCoords[i].y);
      context.lineTo(circleCoords[j].x,circleCoords[j].y);
      context.stroke();
      j++;
    }
    i++;
  }
};
