class AddLastUpdatedToFarmer < ActiveRecord::Migration
  def change
    add_column :farmers, :last_updated, :datetime
  end
end
