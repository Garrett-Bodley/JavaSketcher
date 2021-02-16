document.addEventListener('DOMContentLoaded', () =>{
  console.log('hello!');
  new Sketchpad(document.getElementById('sketchpad'))
})

function enableSketch(){
  const canvas = document.getElementById('sketchpad');
  canvas.height = '600';
  canvas.width = '400';

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = 'rgb(235, 213, 179)';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  let drawing = false;

  function startDrawing(e){
    drawing = true;
    draw(e);
  }

  function stopDrawing(){
    drawing = false;
    ctx.beginPath();
  }

  function draw(e){
    if(!drawing) return
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvas.offsetLeft, (e.clientY - canvas.offsetTop));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  }

  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mouseup', stopDrawing)
  canvas.addEventListener('mouseleave', stopDrawing)
  canvas.addEventListener('mousemove', draw)
}

