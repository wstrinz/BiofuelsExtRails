class Farmer < ActiveRecord::Base
  attr_accessible :accept_corn_contract, :accept_switchgrass_contract, :earnings

  def accept_contracts(corn, switchgrass)
    self.accept_corn_contract = corn
    self.accept_switchgrass_contract = switchgrass
    self.save
  end
end