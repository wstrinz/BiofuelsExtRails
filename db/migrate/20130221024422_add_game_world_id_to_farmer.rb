class AddGameWorldIdToFarmer < ActiveRecord::Migration
  def change
    add_column :farmers, :game_world_id, :integer
  end
end
