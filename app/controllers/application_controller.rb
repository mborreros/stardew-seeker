class ApplicationController < ActionController::API

  def index
    users = User.all
    render json: users, status: :ok
  end
end
