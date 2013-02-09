class CreateFarmers < ActiveRecord::Migration
  def change
    create_table :farmers do |t|
      t.integer :earnings
      t.boolean :accept_corn_contract
      t.boolean :accept_switchgrass_contract

      t.timestamps
    end
  end
end
