class SketchesController < ApplicationController

  def create
    sketch = Sketch.new
    sketch.image.attach(sketch_params)
    sketch.save

    render json: sketch, only: [:id, :rating, :image]
  end

  def index
    sketches = Sketch.all
    render json: sketches
  end

  private

  def sketch_params
    return params.require(:sketch)
  end

end
