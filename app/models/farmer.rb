class Farmer < ActiveRecord::Base
  attr_accessible :accept_corn_contract, :accept_switchgrass_contract, :earnings, :last_updated
  belongs_to :user
  belongs_to :game_world
  has_one :farm
  has_many :fields, through: :farm

  def accept_contracts(corn, switchgrass)
    self.accept_corn_contract = corn
    self.accept_switchgrass_contract = switchgrass
    self.save
  end

  def save_fields(save_info)
    indx = 0
    puts "sinfo:"
    until (save_info.length <= fields.count)
      farm.fields << Field.create!()
    end
    fields.each do |field|
      field.crop = save_info[indx][0]
      field.fertilizer = save_info[indx][1]
      field.pesticide = save_info[indx][2]
      field.till = save_info[indx][3]
      field.save
      indx+=1
    end
  end

  def updated!
    self.last_updated = Time.now
    self.save
  end
end
