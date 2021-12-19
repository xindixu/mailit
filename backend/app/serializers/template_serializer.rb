class TemplateSerializer
  include FastJsonapi::ObjectSerializer
  attributes :markdown, :collaborator_ids, :user_id, :created_at, :updated_at, :name, :built_in,
             :no_times_used
  attributes :collaborators do |object|
    User.select(:id, :name, :email).where(id: object.collaborator_ids)
  end
  has_many :campaigns
end
