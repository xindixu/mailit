class CampaignSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :tags, :subject, :user_id, :template_id, :created_at, :updated_at, :no_emails_sent, :no_emails_not_sent
  end
  
