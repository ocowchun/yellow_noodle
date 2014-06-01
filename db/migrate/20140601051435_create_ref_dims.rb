class CreateRefDims < ActiveRecord::Migration
  def change
    create_table :ref_dims do |t|
      t.string :referer_url
      t.string :event_name
      t.string :platform_name

      t.timestamps
    end
  end
end
