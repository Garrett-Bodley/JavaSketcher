document.addEventListener('DOMContentLoaded', () =>{
  console.log('hello!');
  new Sketchpad(document.getElementById('sketchpad'))
})

class Index {

  constructor(element){
    this.parent = element
  }

  hide = () => {
    this.parent.remove()
  }

  listSketches = (array) => {
    for(const sketch of array){
      let mediaObject = createMediaObject()
      
    }

  }

  createMediaObject = () => {
    let article = document.createElement('article')
    article.classList.add('media');
  
    let mediaLeft = document.createElement('figure')
    mediaLeft.classList.add('media-left')
  
    let mediaContent = document.createElement('div')
    mediaContent.classList.add('media-content')
  
    let mediaRight = document.createElement('div')
    mediaRight.classList.add('media-right')
  
    article.appendChild(mediaLeft)
    article
    .appendChild(mediaContent)
    article.appendChild(mediaRight)
  
    return article;
  }
}
