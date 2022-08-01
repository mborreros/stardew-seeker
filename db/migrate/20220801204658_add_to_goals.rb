class AddToGoals < ActiveRecord::Migration[7.0]
  def change
    add_column :goals, :user_copied, :integer, array: true, default: []
  end
end
