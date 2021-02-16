class Sketch {
  static all = []

  constructor(element){
    this._drawing = false;
    this.canvas = element;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    this._backgroundColor = 'rgb(235, 213, 179)';
    this.addListeners();

    Sketchpad.all.push(this)
  }

  get height(){
    return this.canvas.height
  }

  set height(height){
    this.canvas.height = height;
  }

  get width(){
    return this.canvas.width
  }

  set width(width){
    this.canvas.width = width;
  }

  set backgroundColor(colorString){
    this._backgroundColor = colorString;
    this.ctx.fillStyle = colorString;
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  get backgroundColor(){
    return this._backgroundColor;
  }

  startDrawing = (e) => {
    console.log('drawing')
    this._drawing = true;
    debugger
    this.draw(e);
  }

  stopDrawing = () => {
    console.log('stopped drawing')
    this._drawing = false;
    this.ctx.beginPath();
  }


  resize = () => {
    this.height = this.canvas.parentElement.clientHeight;
    this.width = this.canvas.parentElement.clientWidth;
  }

  draw = (e) => {
    if(!this.drawing) return
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    console.log(`Drawing here X: ${e.clientX - this.canvas.offsetLeft}, Y: ${e.clientY - this.canvas.offsetTop}`)

    this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
  }

  addListeners(){
    this.canvas.addEventListener('mousedown', this.startDrawing)
    this.canvas.addEventListener('mouseup', this.stopDrawing)
    this.canvas.addEventListener('mouseleave', this.stopDrawing)
    this.canvas.addEventListener('mousemove', this.draw)
  }

}