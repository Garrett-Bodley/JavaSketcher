class Sketch {
  static all = [];

  constructor(obj){
    this.id = obj.id;
    this.rating = obj.rating;
    this.image = obj.image;
  }

  static createCards = (array) => {
    let cards = []

    for(const sketch of array){
      let card = document.createElement('div');
      card.classList.add('card', 'is-child', 'box');

      let image = document.createElement('img')
      image.src = sketch.image;

      card.appendChild(image);
      cards.push(card)
    }

    return cards;
  }


}