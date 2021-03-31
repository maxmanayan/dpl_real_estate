class Api::PropertiesController < ApplicationController

  def index 
    render json: Property.available 
  end

  def city_list 
    render json: Address.city_list
  end

  def city 
    city = params[:city]
    render json: Property.by_city(city)
  end
end
