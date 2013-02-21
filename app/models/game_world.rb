class GameWorld < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :timeout
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
    @timeout = self.timeout
    unless @timeout
      @timeout = 60.minutes
    end
    farmers.clear
    Farmer.all.each do |farmer|
      if(farmer.last_updated)
        if(farmer.last_updated > Time.now - @timeout)
          farmers << farmer
        end
      end
    end
  end

  def set_timeout(t)
    self.timeout = t.minutes
    self.save
  end

end
