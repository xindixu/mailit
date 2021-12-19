class AddTimesUsedToTemplates < ActiveRecord::Migration[6.1]
  def change
    add_column :templates, :no_times_used, :integer, default: 0
  end
end
