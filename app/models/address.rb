class Address < ApplicationRecord
  belongs_to :property
  

  # SELECT DISTINCT city,STRING_AGG(CAST(price AS VARCHAR), ', ' 
  # ORDER BY price DESC) AS prices, COUNT(*) price
  # FROM addresses
  # INNER JOIN properties p ON addresses.property_id = p.id
  # WHERE p.sold IS TRUE
  # GROUP BY city
  def self.city_list 
    select('DISTINCT city')
    # .from('addresses')
  end

  def self.cost_by_city 
    select("DISTINCT city,STRING_AGG(CAST(price AS VARCHAR), ', ' 
            ORDER BY price DESC) AS prices, COUNT(*) price")
    .joins('INNER JOIN properties p ON addresses.property_id = p.id')
    .where('p.sold IS TRUE')
    .group('city')
  end
end
