class Comment {

  static all = []
  constructor({name: name, content: content, sketchId: sketch_id, id: id}){
    this.id = id;
    this.name = name;
    this.content = content;
    this.sketchId = sketch_id;

    Comment.all.push(this);
  }

  static mediaObj = () => {
    const obj = document.createElement('div');
    obj.classList.add('box');
    obj.innerHTML = 
    `<article class="media">
      <div class="media-content">
        <form>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" id="name">
            </div>
          </div>
          <div class="field">
            <textarea class="textarea" rows="5" id="content"></textarea>
          </div>
          <div class="field">
            <button class="button" type="submit">Submit</button>
          </div>
        </form>
      </div>
  </article>`;

  return obj
  }

  get form(){
    if(!this._form){
      let mediaObj = Comment.mediaObj()
      let form = mediaObj.querySelector('form');
      form.addEventListener('submit', this.postComment)
      this._form = mediaObj
    }
    return this._form
  }

  postComment = (e) => {
    e.preventDefault()
    let name = document.getElementById('name').value;
    let content = document.getElementById('content').value;

    const submitUrl = 'http://localhost:3000/comments'

    let formData = {
      comment: {
        name: name,
        content: content,
        sketch_id: this.sketchId
      }
    };
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
  
      body: JSON.stringify(formData)
    };
    
    fetch(submitUrl, configObj).then(resp => resp.json()).then(json => {
      let comment = new Comment(json);
      comment.appendToDOM();
      document.querySelector('form').reset()
    })

  }

  appendToDOM = () => {
    let node = this.createCommentNode()
    node.querySelector('p.subtitle').innerText = this.name;
    node.querySelector('p.text').innerText = this.content;
    node.id = `comment-${this.id}`;
    document.getElementById('comments').appendChild(node);
  }

  createCommentNode = () => {
    let node = document.createElement('div')
    node.classList.add('container', 'box', 'comment-list')
    node.innerHTML = 
      `<article class="media">
        <div class="media-content">
          <div class="block">
            <p class="subtitle">name</p>
          </div>
          <div class="block">
            <div class="content">
              <p class="text">content</p>
            </div>
          </div>
        </div>
      </article>`;
    return node;
  }

  static instantiateComments = (array) => {
    let commentCollection = []
    for(const comment of array){
      let newComment = new Comment(comment);
      commentCollection.push(newComment)
    }
    return commentCollection
  }

  static renderComments = (array) => {
    const comments = Comment.instantiateComments(array);
    for(const comment of comments){
      comment.appendToDOM()
    }
  }

}