class AddPasswordResetColumnToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :reset_password_token, :string, default: ''
  end
end
