class SketchSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :rating, :image
  has_many :comments

  def image
    object.image.url if object.image.attached?
  end

end
