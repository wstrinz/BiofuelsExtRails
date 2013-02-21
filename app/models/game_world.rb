class GameWorld < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :farmers
  has_many :fields, through: :farmers

  def corn_planted
    fields.where("crop = 'corn'").count
  end

  def grass_planted
    fields.where("crop = 'grass'").count
  end

  def get_planted
    {'grass' => grass_planted, 'corn' => corn_planted }
  end
end
