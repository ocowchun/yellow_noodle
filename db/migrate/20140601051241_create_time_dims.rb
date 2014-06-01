class CreateTimeDims < ActiveRecord::Migration
  def change
    create_table :time_dims do |t|
      t.integer :month
      t.integer :year

      t.timestamps
    end
  end
end
