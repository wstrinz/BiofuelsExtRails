class GameHistoryController < ApplicationController
  def advance_year
    @game_history = GameHistory.first
    if !@game_history
      @game_history = GameHistory.create!(year: 2)
    end
    year = @game_history.advance_year

    respond_to do |format|
      format.json {render :json => @game_history}
    end
  end
end
