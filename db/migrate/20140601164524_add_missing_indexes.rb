class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :user_log_facts, :ref_dim_id
    add_index :user_log_facts, :user_dim_id
    add_index :user_log_facts, :time_dim_id
    add_index :user_log_facts, :action_dim_id
  end
end
