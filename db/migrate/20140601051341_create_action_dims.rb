class CreateActionDims < ActiveRecord::Migration
  def change
    create_table :action_dims do |t|
      t.string :action_name

      t.timestamps
    end
  end
end
