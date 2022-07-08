class Goal < ApplicationRecord

  validates :title, uniqueness: true, presence: true
  validates :status, presence: true

end
