class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :image, :bio, :created_at

  has_many :goals

end
