class CreateUserDims < ActiveRecord::Migration
  def change
    create_table :user_dims do |t|
      t.integer :age
      t.string :gender
      t.string :city
      t.datetime :register_time

      t.timestamps
    end
  end
end
