class ApplicationController < ActionController::API

    before_action :authenticate

    def authenticate
        if request.headers["Authorization"]
            begin
                auth_header = request.headers["Authorization"]
                token = auth_header.split(" ")[1]
                decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, 'HS256')
                payload = decoded_token.first
                user_id = payload["user_id"]
                @user = User.find_by(id: user_id)
                if @user == nil 
                    render json: {status: 404, message: "User not found"}
                end 

            rescue => exception
                render json: {message: "Error #{exception}"}, status: :forbidden
            end 
        else 
            render json: {status: 403, message: "No Authorization header sent"}
        end 
    end

    def create_token(payload)
        JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
    end 
end
