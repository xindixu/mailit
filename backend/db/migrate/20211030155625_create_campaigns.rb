class CreateCampaigns < ActiveRecord::Migration[6.1]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.string :tags, array: true, default: []
      t.references 'user'
      t.references 'template'

      t.timestamps
    end
  end
end
