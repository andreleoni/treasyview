class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :title
      t.integer :parent_id
      t.boolean :collapsed

      t.timestamps
    end
  end
end
