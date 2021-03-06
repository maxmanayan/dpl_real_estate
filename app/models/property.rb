class Property < ApplicationRecord
  belongs_to :agent
  has_one :address, dependent: :destroy

# SQL code to get available properties
  # SELECT p.id AS property_id, a.id AS agent_id, a.first_name, a.last_name, a.email, p.beds, p.baths, p.sq_ft, p.price, p.sold, ad.street, ad.city, ad.zip
  # FROM properties AS p
  # INNER JOIN agents AS a 
  #     ON a.id = p.agent_id
  # INNER JOIN addresses AS ad
  #     ON p.id = ad.property_id
  # WHERE p.sold = FALSE
  def self.available 
    select('p.id AS property_id, a.id AS agent_id, a.first_name, a.last_name, a.email, p.beds, p.baths, p.sq_ft, p.price, p.sold, ad.street, ad.city, ad.zip')
    .from('properties AS p')
    .joins('INNER JOIN agents AS a ON a.id = p.agent_id
            INNER JOIN addresses AS ad ON p.id = ad.property_id')
    .where('p.sold = FALSE')
    .order('a.id')
  end


  # SELECT p.price, p.beds, p.baths, p.sq_ft, a.street, a.city, a.zip
  # FROM properties AS p
  # INNER JOIN addresses AS a ON p.id = a.property_id
  # WHERE LOWER(a.city) = 'sandy' AND p.sold = FALSE
  def self.by_city (city)
    select('p.price, p.beds, p.baths, p.sq_ft, a.street, a.city, a.zip')
    .from('properties AS p')
    .joins('INNER JOIN addresses AS a ON p.id = a.property_id')
    .where('LOWER(a.city) = ? AND p.sold = FALSE', city.downcase)
  end
end
