class Farmer < ActiveRecord::Base
  attr_accessible :accept_corn_contract, :accept_switchgrass_contract, :earnings
  has_one :farm
  has_many :fields, through: :farm

  def accept_contracts(corn, switchgrass)
    self.accept_corn_contract = corn
    self.accept_switchgrass_contract = switchgrass
    self.save
  end

  def save_fields(save_info)
    indx = 0
  end
end
