Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do 
    get "/api_test", to:"static#api_test"
    get "properties", to: "properties#index"
    get "properties/city_cost", to: "properties#city_cost"
    get "cities/list", to: "properties#city_list"
    get "cities/:city", to: "properties#city"

    get "agents", to: "agents#index"
    get "agents/:id", to: "agents#show"
    
    get "buyers/:id", to: "buyers#show"
  end

  get '*other', to: 'static#index'
end
