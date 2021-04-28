class Sketch < ApplicationRecord
  has_many :comments
  has_attachment :image
end
