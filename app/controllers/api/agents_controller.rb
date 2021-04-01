class Api::AgentsController < ApplicationController

  def index 
    render json: Agent.by_property_count
  end

  def show 
    render json: Agent.get_buyers(params[:id])
  end
end
