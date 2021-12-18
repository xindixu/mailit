class ApplicationController < ActionController::API
  before_action :authenticate

  def authenticate
    if request.headers['Authorization']
      begin
        auth_header = request.headers['Authorization']
        token = auth_header.split(' ')[1]
        decoded_token = JWT.decode(token, Rails.application.secret_key_base, 'HS256')
        payload = decoded_token.first
        user_id = payload['user_id']
        @user = User.find_by(id: user_id)
        render json: { status: 404, message: 'User not found' } if @user.nil?
      rescue StandardError => e
        render json: { message: "Error #{e}" }, status: :forbidden
      end
    else
      render json: { status: 403, message: 'No Authorization header sent' }
    end
  end

  def self.get_user_id_from_authorization_header(header)
    token = header.split(' ')[1]
    decoded_token = JWT.decode(token, Rails.application.secret_key_base, 'HS256')
    user_id = decoded_token.first['user_id']
  end 

  def create_token(payload)
    JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
  end
end
