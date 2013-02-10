class FarmerController < ApplicationController
  def accept_contracts
    @farmer = Farmer.first
    @farmer.accept_contracts(params[:corn], params[:switchgrass])
    respond_to do |format|
      format.json { render json: @farmer}
    end
  end
end
