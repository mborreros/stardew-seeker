class CreateGoalTags < ActiveRecord::Migration[7.0]
  def change
    create_table :goal_tags do |t|
      t.integer :goal_id
      t.integer :tag_id
      t.timestamps
    end
  end
end
