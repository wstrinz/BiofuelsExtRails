class GameHistory < ActiveRecord::Base
  attr_accessible :year

  def advance_year
    if(self.year > 4)
      self.year = 1
    else
      self.year += 1
    end

    self.save
    self.year
  end
end
