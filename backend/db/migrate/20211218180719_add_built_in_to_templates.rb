class AddBuiltInToTemplates < ActiveRecord::Migration[6.1]
  def change
    add_column :templates, :built_in, :boolean, default: false
  end
end
