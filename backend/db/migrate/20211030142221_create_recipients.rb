class CreateRecipients < ActiveRecord::Migration[6.1]
  def change
    create_table :recipients do |t|
      t.string :email
      t.string :tags, array: true, default: []
      t.timestamps
      t.references 'user'
    end
  end
end
