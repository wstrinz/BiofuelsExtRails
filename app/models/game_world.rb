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

  def farmer_info
    arr = []
    farmers.each do |farmer|
      arr << [farmer.user.email, farmer.earnings]
    end
    arr
  end

  def reload_farmers
    farmers.clear
    Farmer.all.each do |farmer|
      if(farmer.last_updated)
        if(farmer.last_updated > Time.now - 1.hours)
          farmers << farmer
        end
      end
    end
  end
end
