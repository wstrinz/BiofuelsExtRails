class AddCoordinatesToField < ActiveRecord::Migration
  def change
    add_column :fields, :x, :integer
    add_column :fields, :y, :integer
  end
end
