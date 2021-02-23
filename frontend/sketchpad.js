class Sketchpad {
  static all = []

  constructor(element){
    this.drawing = false;
    this.hidden = false;
    this.parent = element;
    this.canvas = this.createCanvas()
    this.ctx = this.canvas.getContext("2d");
    this.backgroundColor = 'rgb(235, 213, 179)'
    this.lineWidth = 10;
    this.drawColor = 'black'
    this.createToolbar();
    this.setSize()
    this.dynamicallyResize()
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
  
  draw = (e) => {
    if(!this.drawing) return
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.drawColor
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY)
  }

  clearCanvas = () => {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  saveState = () => {
    this.stateLog.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height))
  }

  undoLast = () => {
    if(this.stateLog.length > 1){
      this.stateLog.pop();
      this.clearCanvas()
      const imageData = this.stateLog[this.stateLog.length - 1]
      this.ctx.putImageData(imageData, (this.width - imageData.width)/2, (this.height - imageData.height)/2)
    }else{
      this.stateLog.pop();
      this.clearCanvas()
    }
  }

  setSize = () => {
    let toolbar = document.querySelector('div.toolbar')
    let navbar = document.querySelector('nav.navbar')

    this.width  = window.innerWidth * .9;
    this.height = window.innerHeight * .9 - (toolbar.offsetHeight + navbar.offsetHeight);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  resize = () => {
    if(this.hidden) return
    this.setSize()
    if(this.stateLog.length > 0){
      const imageData = this.stateLog[this.stateLog.length - 1]
      this.ctx.putImageData(imageData, (this.width - imageData.width)/2, (this.height - imageData.height)/2)
    }
  }

  dynamicallyResize = () => {
    window.addEventListener('resize', this.resize, false)
  }


  addListeners(){
    this.canvas.addEventListener('mousedown', this.startDrawing)
    this.canvas.addEventListener('mouseup', () => {
      if(this.drawing === true )this.stopDrawing()
    })
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
    colorPicker.classList.add('color-picker', 'tools')
    colorPicker.style.backgroundColor = 'white'
    
    let picker = document.createElement('input')
    picker.classList.add('tools')
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
    brushSize.classList.add('brush-size', 'tools');
    brushSize.type = 'range'
    brushSize.min = 1;
    brushSize.max = 100;
    brushSize.defaultValue = 10;
    brushSize.addEventListener('input', this.setBrushSize)
    buttons.push(brushSize);

    let brushSizeDisplay = document.createElement('input');
    brushSizeDisplay.type = 'number';
    brushSizeDisplay.classList.add('brush-size-display', 'input', 'is-rounded', 'is-small', 'tools');
    brushSizeDisplay.defaultValue = 10;
    brushSizeDisplay.addEventListener('input', this.setBrushSize)
    buttons.push(brushSizeDisplay);
    
    let undo = document.createElement('button');
    undo.innerText = `Undo`;
    undo.classList.add('undo-button', 'button', 'is-rounded', 'is-light', 'tools')
    undo.addEventListener('click', this.undoLast)
    buttons.push(undo)

    let clear = document.createElement('button');
    clear.innerText = `Clear`
    clear.classList.add('clear-button', 'button', 'is-rounded', 'is-light', 'tools')
    clear.addEventListener('click', () => {
      this.clearCanvas();
      this.saveState();
    })
    buttons.push(clear)

    let save = document.createElement('button');
    save.innerText = 'Save';
    save.classList.add('save-button', 'button', 'is-rounded', 'is-light', 'tools')
    save.addEventListener('click', this.sendToServer)

    buttons.push(save)

    let download = document.createElement('a');
    download.innerText = 'Download';
    download.classList.add('download-button', 'button', 'is-rounded', 'is-light', 'tools')
    download.addEventListener('click', this.downloadSketch)
    buttons.push(download)

    return buttons;
  }

  createColorSelectors = (array) => {
    let selectors = [];
    for(const el of array){
      let color = document.createElement('button');
      color.id = el;
      color.classList.add('tools', 'color-field', 'button', 'is-rounded');
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

  createCanvas = () => {
    let canvas = document.createElement('canvas');
    canvas.id = "canvas"
    this.parent.appendChild(canvas);
    return canvas
  }

  downloadSketch = (e) => {
    const button = e.target
    const dataUrl = this.canvas.toDataURL('image/jpeg')
    button.href = dataUrl;
    button.download = 'sketch.jpeg'
  }

  sendToServer = () => {
    let dataURL = this.canvas.toDataURL('image/jpeg');
    let imageBlob = this.dataURLtoBinary(dataURL)
    let formData = new FormData()
    formData.append('sketch', imageBlob)

    let configObj = {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData
    }

    fetch('http://localhost:3000/sketches', configObj).then(resp => resp.json()).then(json => {
      let sketch = new Sketch(json);
      sketch.display();
      Sketch.clearIndex();
    })
  }

  dataURLtoBinary = (dataURL) => {

    let binary = atob(dataURL.split(',')[1]);

    let array = [];
    for(let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  hide = () => {
    this.parent.remove();
    this.hidden = true;
  }

  show = () => {
    if(!this.hidden) return
    document.body.insertBefore(this.parent, document.getElementById('spacer'));
    this.hidden = false;
    this.resize();
  }

}