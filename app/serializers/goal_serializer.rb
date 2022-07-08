class GoalSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :user_id, :created_at

  belongs_to :user
  has_many :tags, through: :goal_tags
  
end
