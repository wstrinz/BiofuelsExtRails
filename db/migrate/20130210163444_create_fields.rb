class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.string :crop
      t.boolean :fertilizer
      t.boolean :pesticide
      t.boolean :till

      t.timestamps
    end
  end
end
