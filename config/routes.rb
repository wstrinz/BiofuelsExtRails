Extjs4AccountManager::Application.routes.draw do
  devise_for :users

  get "farmer/accept_contracts"

  get "game_history/advance_year"

  resources :users
  root to: 'index#index'

  match '/advance_year' => 'game_history#advance_year', :as => :advance_year
  match '/accept_contracts' => 'farmer#accept_contracts', :as => :accept_contracts
  match '/get_farm' => 'farmer#get_farm'
  match '/save_fields' => 'farmer#save_fields', :as => :save_fields

  # This redirect is a work around for the use of Extjs4 with Rails assets pipeline:
  # for "test" and "production" mode images are now retrived this way
  match "/resources/themes/*all" => redirect {|env, req|
    URI.unescape "/assets/extjs4/resources/themes/#{req.params[:all]}"
  }, all: /.*/ unless Rails.env == 'development'
end
