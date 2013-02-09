class FarmerController < ApplicationController
  def accept_contracts
    Farmer.first.accept_contracts(params[:corn], params[:switchgrass])
    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
