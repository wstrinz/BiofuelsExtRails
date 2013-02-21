class CreateGameWorlds < ActiveRecord::Migration
  def change
    create_table :game_worlds do |t|

      t.timestamps
    end
  end
end
