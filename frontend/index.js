document.addEventListener('DOMContentLoaded', () =>{
  console.log('hello!');
  let sketchpad = new Sketchpad(document.getElementById('sketchpad'));
  sketchpad.hide();
  Sketch.loadIndex();
})