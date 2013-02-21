class AddTimeoutToGameWorld < ActiveRecord::Migration
  def change
    add_column :game_worlds, :timeout, :integer
  end
end
