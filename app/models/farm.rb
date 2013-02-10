class Farm < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :fields
  belongs_to :farmer
end
