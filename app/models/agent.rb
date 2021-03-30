class Agent < ApplicationRecord
  has_many :buyers, dependent: :destroy
  has_many :properties, dependent: :destroy
end
