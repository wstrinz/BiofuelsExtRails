class GameWorld < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :farmers
end
