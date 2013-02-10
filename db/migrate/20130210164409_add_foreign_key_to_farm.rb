class AddForeignKeyToFarm < ActiveRecord::Migration
  def change
    add_column :farms, :farmer_id, :integer
  end
end
