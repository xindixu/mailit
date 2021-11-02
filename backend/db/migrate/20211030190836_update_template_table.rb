class UpdateTemplateTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :templates, :image_urls
    add_column :templates, :name, :string
  end
end
