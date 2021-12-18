class Api::V1::AuthenticationController < ApplicationController 
    skip_before_action :authenticate, only: [:login]
    def login
        @user = User.find_by(email: params[:email])
        if @user
            if(@user.authenticate(params[:password]))
                payload = {user_id: @user.id}
                token = create_token(payload)
                render json: {status: 200, data: {token: token, user_id: @user.id, name: @user.name}}
            else
                render json: {status: 401, message: "Authentication Failed"}
            end 
        else
            render json: {status: 404, message: "Could not find user"}
        end 
    end 
end 