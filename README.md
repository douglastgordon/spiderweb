# Spiderweb

###[Live] (http://www.douglasgordon.me/spiderweb/)

Uncovering a tranquil forest with a web of stained glass.

###Screenshot:
![screenshot]

###Technical Details:  

Spiderweb consists of an image overlayed with an HTML canvas. Clicking creates points. Points connect to other points as long as their connection doesn't cross another connection. The space in between points (triangles) is erased from the canvas and filled with translucent color.

The code snippet below shows how a newly placed point, represented by coordinates passed in as an argument to the draw method, will draw a line to every other point on the canvas, provided that new line won't intersect any existing lines.

```javascript
const drawLines = (pos) => {
  context.globalCompositeOperation = 'source-over';
  let connectedPoints = [];
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
      connectedPoints.push([startX, startY]);
    }
    i++;
  }
  circleCoords.push(pos);
  uncoverPicture(connectedPoints, [pos.x,pos.y]);
};
```

[screenshot]: ./images/spiderweb-screenshot.png
