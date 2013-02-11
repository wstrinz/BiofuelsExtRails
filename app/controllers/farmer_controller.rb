require 'json'

class FarmerController < ApplicationController
  before_filter :authenticate_user!
  def accept_contracts
    @farmer = get_farmer #Farmer.first
    @farmer.accept_contracts(params[:corn], params[:switchgrass])
    respond_to do |format|
      format.json { render json: @farmer}
    end
  end

  def get_farm
    @farmer = get_farmer #Farmer.first

    respond_to do |format|
      format.json { render json: @farmer.fields}
    end
  end

  def save_fields
    @farmer = get_farmer #Farmer.first
    @farmer.save_fields(JSON.parse(params[:fields]))

    respond_to do |format|
      format.json { render json: @farmer}
    end
  end

  def get_farmer
    if(current_user.farmer)
      return current_user.farmer
    end
    f = Farmer.new()
    fa = Farm.new()
    f.farm = fa
    current_user.farmer = f
    f.save
    f
  end
end
