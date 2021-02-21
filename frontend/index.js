document.addEventListener('DOMContentLoaded', () =>{
  console.log('hello!');
  const sketchpad = new Sketchpad(document.getElementById('sketchpad'));
  Sketch.hide()
  document.getElementById('draw').addEventListener('click', () => {
    Sketch.hideIndex();
    if(!Sketch.hidden){
      Sketch.hide()
    }
    sketchpad.show()
  })

  document.getElementById('all-sketches').addEventListener('click', () => {
    sketchpad.hide();
    Sketch.loadIndex();
  })
})