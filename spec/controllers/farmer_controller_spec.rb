require 'spec_helper'

describe FarmerController do

  describe "GET 'accept_contracts'" do
    it "returns http success" do
      get 'accept_contracts'
      response.should be_success
    end
  end

end
