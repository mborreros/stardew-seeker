class GoalsController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

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

  def create
    new_goal = Goal.create!(goal_parmas)
    render json: new_goal, status: :created
  end

  def user_goals
    user_goals = Goal.where(user_id: params[:id])
    if user_goals
      render json: user_goals, status: :ok
    else 
      render json: {error: "No goals found for this user"}, status: :not_found
    end
  end

  def destroy
    goal = Goal.find_by(id: params[:id])
    if goal
      goal.destroy
      head :no_content
    else 
      render json: {errors: ["Goal not found"]}, status: :not_found
    end
  end

  private

  def goal_parmas
    params.permit(:title, :description, :status, :user_id, :tags)
  end

  def render_unprocessable_entity_response(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

end
