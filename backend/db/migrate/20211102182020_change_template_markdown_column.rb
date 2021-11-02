class ChangeTemplateMarkdownColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :templates, :markdown_url, :markdown
  end
end
