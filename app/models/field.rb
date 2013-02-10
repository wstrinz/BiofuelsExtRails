class Field < ActiveRecord::Base
  belongs_to :farm
  attr_accessible :crop, :fertilizer, :pesticide, :till, :x, :y
end
