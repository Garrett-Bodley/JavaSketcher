class Sketch {
  static all = [];
  static showDiv = document.getElementById('show')
  static index = document.getElementById('index')
  static hidden = false;
  static indexLoaded = false;
  static submitURL = 'http://localhost:3000/sketches'

  constructor(obj){
    this.id = obj.id;
    this.rating = obj.rating;
    this.image = obj.image;

    Sketch.all.push(this)
  }

  static loadIndex = () => {
    if (Sketch.indexLoaded) {
      Sketch.showIndex();
      if(!Sketch.hidden){
        Sketch.hide();
      }
    }else{
      fetch(this.submitURL).then(resp => resp.json()).then(json => Sketch.renderIndex(json));
      Sketch.indexLoaded = true;
      Sketch.showIndex();
      if(!Sketch.hidden){
        Sketch.hide();
      }
    }
  }

  static renderIndex = (array) => {
    const columns = Sketch.index.querySelectorAll('div.tile.is-parent.is-vertical')
    let counter = 0
    for(const element of array){
      let sketch = new Sketch(element)
      columns[counter % 3].appendChild(sketch.createCard())
      counter++
    }
  }

  static clearIndex = () => {
    const columns = Sketch.index.querySelectorAll('div.tile.is-parent.is-vertical')
    for(const column of columns){
      column.innerHTML = '';
    }
    Sketch.indexLoaded = false;
  }

  static hideIndex = () => {
    Sketch.index.remove()
  }

  static showIndex = () => {
    document.body.insertBefore(Sketch.index, document.getElementById('spacer'))
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
    document.querySelector('div#comments').innerHTML = ''
    Sketch.showDiv.remove()
    Sketch.hidden = true;
  }

  static show = () => {
    if(!Sketch.hidden) return
    document.body.insertBefore(Sketch.showDiv, document.getElementById('spacer'));
    Sketch.hidden = false;
  }

  display = () => {
    Sketch.hideIndex()
    Sketch.show()
    Sketchpad.all[0].hide()

    this.resetShowArticle();

    let img = Sketch.showDiv.querySelector('img');
    img.src = this.image;
    img.id = `sketch-${this.id}`;

    const rating = Sketch.showDiv.querySelector('p#rating')
    rating.innerText = this.rating;

    let comment = new Comment({sketchId: this.id})
    document.getElementById('comments').appendChild(comment.form);
    this.fetchComments()
  }

  resetShowArticle = () => {
    const article = Sketch.showDiv.querySelector('article')
    const newArticle = article.cloneNode(true);
    article.parentElement.replaceChild(newArticle, article);

    const upvote = newArticle.querySelector('button#thumbs-up');
    const downvote = newArticle.querySelector('button#thumbs-down');

    upvote.addEventListener('click', () => {
      this.rating++;
      this.update();
    });

    downvote.addEventListener('click', () => {
      this.rating--;
      this.update();
    });

    const rating = Sketch.showDiv.querySelector('p#rating')
    rating.innerText = this.rating;

  }

  update = () => {

    let formData = {
      id: this.id,
      image: this.image,
      rating: this.rating
    }

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(Sketch.submitURL + `/${this.id}`, configObj).then(resp => resp.json()).then(json => {
      let newSketch = new Sketch(json);
      newSketch.resetShowArticle();
    })
  }


  fetchComments = () => {
    fetch(Sketch.submitURL + `/${this.id}`).then(resp => resp.json()).then(json => Comment.renderComments(json.comments))
  }


}