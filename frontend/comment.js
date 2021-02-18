class Comment {

  static all = []
  constructor(username, content, sketchId){
    this.username = username;
    this.content = content;
    this.sketchId = sketchId;

    Comment.all.push(this);
  }

  static commentForm = () => {
    
  }
}