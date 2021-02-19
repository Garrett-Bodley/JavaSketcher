class Sketch {
  static all = [];
  static showDiv = document.getElementById('show')
  static index = document.getElementById('index')
  static hidden = false;
  static loaded = false;

  constructor(obj){
    this.id = obj.id;
    this.rating = obj.rating;
    this.image = obj.image;

    Sketch.all.push(this)
  }

  static loadIndex = () => {
    if (Sketch.loaded) {
      Sketch.showIndex();
      Sketch.hide();
    }else{
      fetch('http:localhost:3000/sketches').then(resp => resp.json()).then(json => Sketch.renderIndex(json));
      Sketch.loaded = true;
    }
  }

  static renderIndex = (array) => {
    let columns = document.querySelectorAll('div.tile.is-parent.is-vertical')
    let counter = 0
    for(const element of array){
      let sketch = new Sketch(element)
      columns[counter % 3].appendChild(sketch.createCard())
      counter++
    }
  }

  static hideIndex = () => {
    Sketch.index.remove()
  }

  static showIndex = () => {
    document.body.appendChild(Sketch.index)
  }

  createCard = () => {
    let card = document.createElement('div');
    card.classList.add('card', 'is-child', 'box');

    let image = document.createElement('img')
    image.src = this.image;
    image.style.cursor = 'pointer'
    image.addEventListener('click', this.display)

    card.appendChild(image);
    return card;
  }

  static hide = () => {
    Sketch.showDiv.remove()
    Sketch.hidden = true;
  }

  static show = () => {
    if(!Sketch.hidden) return
    document.body.appendChild(Sketch.showDiv);
    Sketch.hidden = false;
  }

  display = () => {
    Sketch.hideIndex()
    Sketch.show()
    let img = Sketch.showDiv.querySelector('img');
    img.src = this.image;
    img.id = `sketch-${this.id}`;
    let comment = new Comment({sketchId: this.id})
    Sketch.showDiv.appendChild(comment.form);
  }


}