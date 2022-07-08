class GoalsController < ApplicationController

  def index
    goals = Goal.all
    render json: goals, status: :ok
  end

  def show
    this_goal = Goal.find_by(id: params[:id])
    if this_goal
      render json: this_goal, status: :ok
    else
      render json: {error: "Goal not found"}, status: :not_found
    end
  end

end
