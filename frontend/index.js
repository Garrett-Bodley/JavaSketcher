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
}
