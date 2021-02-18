document.addEventListener('DOMContentLoaded', () =>{
  console.log('hello!');
  Sketch.hide()
  let sketchpad = new Sketchpad(document.getElementById('sketchpad'));
  document.getElementById('draw').addEventListener('click', () => {
    Sketch.hideIndex();
    Sketch.hide()
    sketchpad.show()
  })

  document.getElementById('all-sketches').addEventListener('click', () => {
    sketchpad.hide();
    Sketch.loadIndex();
  })
})