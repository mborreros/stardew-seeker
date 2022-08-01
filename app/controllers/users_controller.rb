class UsersController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  skip_before_action :authorized, only: [:create]

  def index
    users = User.all
    render json: users, status: :ok
  end

  def show
    current_user = User.find_by(id: session[:user_id])
    if current_user
      render json: current_user, status: :ok
    else
      render json: {error: "User not logged in"}, status: :unauthorized
    end
  end

  def create
    new_user = User.create!(user_params)
    session[:user_id] = new_user.id
    render json: new_user, status: :created
  end

  private

  def user_params
    params.permit(:username, :password, :name)
  end

  def render_unprocessable_entity_response(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

end
