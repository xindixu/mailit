class TemplateSerializer
    include FastJsonapi::ObjectSerializer
    attributes :markdown, :collaborator_ids, :user_id, :created_at, :updated_at, :name
    has_many :campaigns
  end
  