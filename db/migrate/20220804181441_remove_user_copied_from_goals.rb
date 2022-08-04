class RemoveUserCopiedFromGoals < ActiveRecord::Migration[7.0]
  def change
    remove_column :goals, :user_copied
  end
end
