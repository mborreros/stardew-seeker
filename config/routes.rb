Rails.application.routes.draw do
  scope "/api" do
    #all backend routes go here
    resources :users, only: [:index, :show]
    resources :goals, only: [:index, :show, :create, :destroy]
    resources :tags, only: [:index, :show]
    get "/my_goals/:id", to: "goals#user_goals"
  end

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
