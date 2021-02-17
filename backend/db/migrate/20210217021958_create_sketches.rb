class CreateSketches < ActiveRecord::Migration[6.1]
  def change
    create_table :sketches do |t|
      t.integer :rating
      t.timestamps
    end
  end
end
