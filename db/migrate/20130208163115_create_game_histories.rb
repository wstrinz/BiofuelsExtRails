class CreateGameHistories < ActiveRecord::Migration
  def change
    create_table :game_histories do |t|
      t.integer :year

      t.timestamps
    end
  end
end
