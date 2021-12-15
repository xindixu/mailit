class AddEmailsOpenedToCampaigns < ActiveRecord::Migration[6.1]
  def change
    add_column :campaigns, :no_emails_opened, :integer, default: 0
  end
end
