class Api::V1::UsersController < ApplicationController
  def index
    # get users from the database
    @users = [
      { first_name: 'Jayshil', last_name: 'Dave' },
      { first_name: 'Kenya', last_name: 'Plenty' },
      { first_name: 'Qianjun', last_name: 'Chen' },
      { first_name: 'Xindi', last_name: 'Xu' }
    ]
    render json: { users: @users }
  end
end
