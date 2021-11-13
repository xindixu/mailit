class Api::V1::AuthenticationController < ApplicationController 
    skip_before_action :authenticate, only: [:login]
    def login
        @user = User.find_by(email: params[:email])
        if @user
            if(@user.authenticate(params[:password]))
                payload = {user_id: @user.id}
                token = create_token(payload)
                render json: {token: token}
            else
                render json: {message: "Authentication Failed"}
            end 
        else
            render json: {message: "could not find user"}
        end 
    end 
end 