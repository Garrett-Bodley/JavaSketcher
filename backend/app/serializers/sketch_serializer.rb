class SketchSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :rating, :image
  has_many :comments

  def image
    polymorphic_url(object.image) if object.image.attached?
  end

end
