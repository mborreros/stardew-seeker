class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :name, :image, :bio

  has_many :goals

end
