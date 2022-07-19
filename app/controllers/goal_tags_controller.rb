class GoalTagsController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    goal_tags = GoalTag.all
    render json: goal_tags, status: :ok
  end

  def show
    this_goal_tag = GoalTag.find_by(id: params[:id])
    if this_goal_tag
      render json: this_goal_tag, status: :ok
    else
      render json: {error: "Goal tag not found"}, status: :not_found
    end
  end

  def create
    if params[:tag_id].length()
      params[:tag_id].each do |id|
        new_goal_tag = GoalTag.create!(goal_id: params[:goal_id], tag_id: id)
      end
      this_goal = Goal.where(id: params[:goal_id])
      render json: this_goal, status: :created
    else 
      render json: {error: "There are no goal tags to create, this goal has been deleted to maintain the integrity of the server!"}, status: :unprocessable_entity
    end
  end

  private

  def goal_tag_params
    params.permit(:goal_id, :tag_id)
  end

  def render_unprocessable_entity_response(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

end
