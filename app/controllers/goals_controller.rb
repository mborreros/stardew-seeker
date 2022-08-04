class GoalsController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    goals = Goal.all
    render json: goals, status: :ok
  end

  def show
    this_goal = find_goal 
    render json: this_goal, status: :ok
  end

  def create
    new_goal = Goal.create!(goal_params)
    render json: new_goal, status: :created
  end

  def user_goals
    user_goals = Goal.where(user_id: params[:id])
    if user_goals.length >= 1
      render json: user_goals, status: :ok
    else 
      render_not_found_response
    end
  end

  def update
    goal = find_goal
    goal.update(goal_params)
    render json: goal, status: :ok
  end

  def destroy
    goal = find_goal
    goal.destroy
    head :no_content
  end

  private

  def goal_params
    params.permit(:title, :description, :status, :user_id, :copied_from)
  end

  def render_unprocessable_entity_response(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_not_found_response()
    render json: {errors: "Goal(s) not found."}, status: :not_found
  end

  def find_goal
    Goal.find(params[:id])
  end

end
