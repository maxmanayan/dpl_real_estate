class Api::AgentsController < ApplicationController

  def index 
    render json: Agent.by_property_count
  end
end
