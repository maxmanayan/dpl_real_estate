class Address < ApplicationRecord
  belongs_to :property
  

  def self.city_list 
    select('DISTINCT city')
    # .from('addresses')
  end
end
