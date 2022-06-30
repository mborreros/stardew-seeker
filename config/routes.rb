Rails.application.routes.draw do
  scope "/api" do
    #all backend routes go here
    resources :users, only: [:index, :show]
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
