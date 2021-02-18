class SketchSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :rating, :image

  def image
    polymorphic_url(object.image) if object.image.attached?
  end
end
