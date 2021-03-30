class Property < ApplicationRecord
  belongs_to :agent
  has_one :address, dependent: :destroy
end
