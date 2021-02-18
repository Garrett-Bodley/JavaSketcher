document.addEventListener('DOMContentLoaded', () =>{
  console.log('hello!');
  new Sketchpad(document.getElementById('sketchpad'));
  Sketchpad.all[0].hide()
  let index = new Index(document.getElementById('index'));
  fetch('http:localhost:3000/sketches').then(resp => resp.json()).then(json => index.listSketches(json))
})

class Index {

  static all = []

  constructor(element){
    this.parent = element
    this.hidden = false
    // this.hide();

    Index.all.push(this)
  }

  hide = () => {
    this.parent.remove()
    this.hidden = true
  }

  show = () => {
    if(!this.hidden) return
    document.body.appendChild(this.parent)
    this.hidden = false;
  }

  listSketches = (array) => {
    let columns = document.querySelectorAll('div.tile.is-parent.is-vertical')
    let counter = 0
    let sketches = Sketch.createCards(array)
    for(const sketch of sketches){
      columns[counter % 3].appendChild(sketch)
      counter++
    }
  }


}
