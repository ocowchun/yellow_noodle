class CreateUserLogFacts < ActiveRecord::Migration
  def change
    create_table :user_log_facts do |t|
      t.integer :user_dim_id
      t.integer :time_dim_id
      t.integer :action_dim_id
      t.integer :ref_dim_id
      t.integer :action_number

      t.timestamps
    end
  end
end
