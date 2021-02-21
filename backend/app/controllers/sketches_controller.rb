class SketchesController < ApplicationController

  def create
    sketch = Sketch.new
    sketch.image.attach(sketch_params)
    sketch.save

    render json: sketch
  end

  def index
    sketches = Sketch.all
    render json: sketches
  end

  def show
    sketch = Sketch.find(params[:id])
    render json: sketch
  end

  def update
    sketch = Sketch.find(params[:id])
    sketch.update(sketch_params.permit(:id, :rating, :image))
    render json: sketch
  end

  private

  def sketch_params
    return params.require(:sketch)
  end

end
