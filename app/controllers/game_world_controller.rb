class GameWorldController < ApplicationController
  def create
  end

  def show
  end

  def reloadfarmers
    @game_world = GameWorld.first

    unless @game_world
      GameWorld.create!
      @game_world = GameWorld.first
    end

    @game_world.reload_farmers
    @farmerthing = 0
    respond_to do |format|
      format.json { render json: @farmerthing }
    end
  end

  def getupdate
    @game_world = GameWorld.first
    @planted = @game_world.get_planted

    respond_to do |format|
      format.json { render json: [@game_world.farmer_info, @planted] }
    end
  end
end
