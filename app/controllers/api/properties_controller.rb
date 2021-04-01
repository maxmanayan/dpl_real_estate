class Api::PropertiesController < ApplicationController

  def index 
    properties = Property.page(@page).available
    render json: {properties: properties, total_pages: properties.total_pages }
  end

  def city_list 
    render json: Address.city_list
  end

  def city 
    city = params[:city]
    render json: Property.by_city(city)
  end


  private 

  def set_page 
    @page = params[:page] || 1
  end
end
