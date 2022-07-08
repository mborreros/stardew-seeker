class ApplicationController < ActionController::API

  include ActionController::Cookies

  # before_action :authorized

  # def authorized
  #   return render json: {error: "User not authorized, please login to view content"}, status: :unauthorized
  #   unless session.include? :user_id
  #   end
  # end
  
end
