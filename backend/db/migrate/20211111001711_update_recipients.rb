class UpdateRecipients < ActiveRecord::Migration[6.1]
  def change
    add_column :recipients, :firstname, :string
    add_column :recipients, :lastname, :string
  end
end
