class TagsController < ApplicationController

  def index
    tags = Tag.all
    render json: tags, status: :ok
  end

  def show
    this_tag = Tag.find_by(id: params[:id])
    if this_tag
      render json: this_tag, status: :ok
    else
      render json: {error: "This tag is not accessible"}, status: :unauthorized
    end
  end

end
