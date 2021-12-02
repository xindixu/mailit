class AddCampaignSubject < ActiveRecord::Migration[6.1]
  def change
    add_column :campaigns, :subject, :string
  end
end
