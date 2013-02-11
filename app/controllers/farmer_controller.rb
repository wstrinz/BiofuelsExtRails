require 'json'

class FarmerController < ApplicationController
  def accept_contracts
    @farmer = Farmer.first
    @farmer.accept_contracts(params[:corn], params[:switchgrass])
    respond_to do |format|
      format.json { render json: @farmer}
    end
  end

  def get_farm
    @farmer = Farmer.first

    respond_to do |format|
      format.json { render json: @farmer.fields}
    end
  end

  def save_fields
    @farmer = Farmer.first
    @farmer.save_fields(JSON.parse(params[:fields]))

    respond_to do |format|
      format.json { render json: @farmer}
    end
  end
end
