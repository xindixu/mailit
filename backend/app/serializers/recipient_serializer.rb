class RecipientSerializer
    include FastJsonapi::ObjectSerializer
    attributes :email, :tags, :created_at, :updated_at, :user_id
  end