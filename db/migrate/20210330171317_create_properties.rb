class CreateProperties < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.belongs_to :agent, null: false, foreign_key: true
      t.float :price
      t.boolean :sold
      t.float :sold_price
      t.integer :beds
      t.integer :baths
      t.integer :sq_ft

      t.timestamps
    end
  end
end
