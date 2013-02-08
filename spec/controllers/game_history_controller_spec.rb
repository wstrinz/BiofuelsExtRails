require 'spec_helper'

describe GameHistoryController do

  describe "GET 'advance_year'" do
    it "returns http success" do
      get 'advance_year'
      response.should be_success
    end
  end

end
