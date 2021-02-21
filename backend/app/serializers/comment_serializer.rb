class CommentSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :sketch_id
end
