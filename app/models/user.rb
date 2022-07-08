class User < ApplicationRecord
  has_secure_password

  has_many :goals

  validates :username, uniqueness: true, presence: true

end
