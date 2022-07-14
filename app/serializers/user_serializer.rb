class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio

  has_many :goals

end
