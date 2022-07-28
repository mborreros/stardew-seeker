class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio, :created_at

  has_many :goals

end
