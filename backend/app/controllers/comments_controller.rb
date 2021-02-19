class CommentsController < ApplicationController

  def create
    byebug
    comment = Comment.create(comment_params)
    render json: comment
  end


  private

  def comment_params
    params.require(:comment).include(:name, :content)
  end

end
