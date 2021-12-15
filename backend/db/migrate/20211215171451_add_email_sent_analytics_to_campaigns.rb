class AddEmailSentAnalyticsToCampaigns < ActiveRecord::Migration[6.1]
  def change
    add_column :campaigns, :no_emails_sent, :integer, default: 0
    add_column :campaigns, :no_emails_not_sent, :integer, default: 0
  end
end
