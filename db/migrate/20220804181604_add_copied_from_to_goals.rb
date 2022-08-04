class AddCopiedFromToGoals < ActiveRecord::Migration[7.0]
  def change
    add_column :goals, :copied_from, :integer
  end
end
