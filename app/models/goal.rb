class Goal < ApplicationRecord
  belongs_to :user
  has_many :goal_tags
  has_many :tags, through: :goal_tags

  validates :title, presence: true
  validates :status, presence: true

end
