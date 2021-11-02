class UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :email, :password_digest, :created_at, :updated_at
    has_many :recipients
    has_many :templates
    has_many :campaigns
  end