class GameWorldController < ApplicationController
  def create
  end

  def show
  end

  def getupdate
    @game_world = GameWorld.first
    @planted = @game_world.get_planted

    respond_to do |format|
      format.json { render json: @planted }
    end
  end
end
