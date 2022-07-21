class ApplicationController < ActionController::API

  include ActionController::Cookies

  before_action :authorized

  # need to refactor this method here
  # def authorized
  #   return render json: {error: "User not authorized, please login to view content"}, status: :unauthorized
  #   unless session.include? :user_id
  #   end
  # end

  # might ask you to refactor in the review utilizing the unless
  def authorized
    if session.include? :user_id
    else
      return render json: {error: "User not authorized, please login to view content"}, status: :unauthorized
    end
  end
  
end
