class Comment {

  static all = []
  constructor({username: username, content: content, sketchId: sketchId}){
    this.username = username;
    this.content = content;
    this.sketchId = sketchId;

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
      form.addEventListener('submit', this.submitComment)
      this._form = mediaObj
    }
    return this._form
  }

  postComment = (e) => {
    e.preventdefault
    let name = document.getElementById('name').value;
    let content = document.getElementById('content').value;

    const submitUrl = 'http://localhost:3000/toys'

    let formData = {
      name: name,
      content: content,
    };
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
  
      body: JSON.stringify(formData)
    };
    debugger
  }
}