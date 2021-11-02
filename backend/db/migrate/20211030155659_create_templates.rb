class CreateTemplates < ActiveRecord::Migration[6.1]
  def change
    create_table :templates do |t|
      t.text :markdown_url
      t.text :image_urls, array: true, default: []
      t.string :collaborator_ids, array: true, default: []
      t.references 'user'
      t.timestamps
    end
  end
end
