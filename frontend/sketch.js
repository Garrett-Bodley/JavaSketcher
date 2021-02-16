class Sketchpad {
  static all = []

  constructor(element){
    this.drawing = false;
    this.parent = element;
    this.canvas = this.createAndRenderCanvas()
    this.ctx = this.canvas.getContext("2d");
    this.setSize()
    this.backgroundColor = 'rgb(235, 213, 179)'
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.lineWidth = 10;
    this.drawColor = 'black'
    this.createToolbar();
    this.addListeners();
    this.stateLog = []
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
    this.drawing = true;
    this.draw(e);
  }

  stopDrawing = () => {
    this.drawing = false;
    this.ctx.beginPath();
    this.saveState()
  }

  clearCanvas = (e) => {
    e.preventDefault();
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.saveState()
  }

  saveState = () => {
    this.stateLog.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height))
  }

  undoLast = (e) => {
    e.preventDefault();
    if(this.stateLog.length > 1){
      this.stateLog.pop();
      this.ctx.putImageData(this.stateLog[this.stateLog.length - 1], 0, 0)
    }else{
      this.stateLog.pop();
      this.clearCanvas()
    }
  }


  setSize = () => {
    this.canvas.width  = 900;
    this.canvas.height = 600;
    this.ctx.fillStyle = 'rgb(235, 213, 179)';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  draw = (e) => {
    if(!this.drawing) return
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.drawColor

    this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.parentElement.offsetTop);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.parentElement.offsetTop)
  }

  addListeners(){
    this.canvas.addEventListener('mousedown', this.startDrawing)
    this.canvas.addEventListener('mouseup', this.stopDrawing)
    this.canvas.addEventListener('mouseleave', () => {
      if(this.drawing === true) this.stopDrawing()
    })
    this.canvas.addEventListener('mousemove', this.draw)
  }

  createToolbar = () => {
    const toolbar = document.createElement('div')
    toolbar.classList.add('toolbar');

    let colorSelectors = this.createColorSelectors([`black`, `red`, `orange`, `green`, `blue`, `indigo`, `violet`])
    for(const color of colorSelectors){
      toolbar.appendChild(color);
    }

    let buttons = this.createToolbarButtons();
    for(const button of buttons){
      toolbar.append(button);
    }

    this.parent.appendChild(document.createElement('br'))
    this.parent.appendChild(toolbar);

  }

  createToolbarButtons = () => {
    const buttons = [];

    
    let colorPicker = document.createElement('span');
    colorPicker.classList.add('color-picker')
    colorPicker.style.backgroundColor = 'white'
    
    let picker = document.createElement('input')
    picker.style.opacity = 0
    picker.type = 'color';
    
    colorPicker.appendChild(picker)
    
    colorPicker.addEventListener('click', () => {
      picker.click();
    })
    
    picker.addEventListener('input', (e) =>{
      this.drawColor = e.target.value;
      e.target.parentElement.style.backgroundColor = e.target.value
    })
    buttons.push(colorPicker)

    let brushSize = document.createElement('input');
    brushSize.classList.add('brush-size');
    brushSize.type = 'range'
    brushSize.min = 1;
    brushSize.max = 100;
    brushSize.defaultValue = 10;
    brushSize.addEventListener('input', this.setBrushSize)
    buttons.push(brushSize);

    let brushSizeDisplay = document.createElement('input');
    brushSizeDisplay.type = 'number';
    brushSizeDisplay.classList.add('brush-size-display', 'input', 'is-rounded', 'is-small');
    brushSizeDisplay.defaultValue = 10;
    brushSizeDisplay.addEventListener('input', this.setBrushSize)
    buttons.push(brushSizeDisplay);
    
    let undo = document.createElement('button');
    undo.innerText = `Undo`;
    undo.classList.add('undo-button', 'button', 'is-rounded', 'is-light')
    undo.addEventListener('click', this.undoLast)
    buttons.push(undo)

    let clear = document.createElement('button');
    clear.innerText = `Clear`
    clear.classList.add('clear-button', 'button', 'is-rounded', 'is-light')
    clear.addEventListener('click', this.clearCanvas)
    buttons.push(clear)

    let save = document.createElement('button');
    save.innerText = 'Save';
    save.classList.add('save-button', 'button', 'is-rounded', 'is-light')
    buttons.push(save)

    let download = document.createElement('button');
    download.innerText = 'Download';
    download.classList.add('download-button', 'button', 'is-rounded', 'is-light')
    buttons.push(download)

    return buttons;
  }

  createColorSelectors = (array) => {
    let selectors = [];
    for(const el of array){
      let color = document.createElement('button');
      color.id = el;
      color.classList.add('toolbar', 'color-field', 'button', 'is-rounded');
      color.style.backgroundColor = el;
      selectors.push(color);
      color.addEventListener('click', this.setBrushColor)
    }
    return selectors
  }

  setBrushColor = (e) => {
    this.drawColor = e.target.id
  }

  setBrushSize = (e) => {
    this.lineWidth = e.target.value
    document.querySelector('input.brush-size').value = e.target.value;
    document.querySelector('input.brush-size-display').value = e.target.value
  }

  // check out position absolute, position fixed

  createAndRenderCanvas = () => {
    let canvas = document.createElement('canvas');
    canvas.id = "canvas"
    this.parent.appendChild(canvas);
    return canvas
  }

}