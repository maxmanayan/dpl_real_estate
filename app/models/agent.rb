class Agent < ApplicationRecord
  has_many :buyers, dependent: :destroy
  has_many :properties, dependent: :destroy

  # get list of agents and #num properties
  # SELECT first_name, last_name, email, COUNT(*) AS frequency
  # FROM agents
  # INNER JOIN properties AS p ON p.agent_id = agents.id
  # GROUP BY agents.id;
  def self.by_property_count 
    select('agents.id, first_name, last_name, email, COUNT(*) AS frequency')
    .joins('INNER JOIN properties AS p ON p.agent_id = agents.id')
    .group('agents.id')
    .order('frequency DESC')
  end
end
