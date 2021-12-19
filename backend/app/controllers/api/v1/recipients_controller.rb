require 'csv'

class Api::V1::RecipientsController < ApplicationController
  skip_before_action :authenticate, only: [:export]

  def index
    auth_header = request.headers['Authorization']
    user_id = ApplicationController.get_user_id_from_authorization_header(auth_header)
    recipients = Recipient.all.where(:user_id => user_id)
    render json: RecipientSerializer.new(recipients).serialized_json
  end

  def show
    recipient = Recipient.find_by(id: params[:id])
    if recipient.nil?
      render json: { status: 400, error: 'Invalid Id Passed' }
    else
      render json: RecipientSerializer.new(recipient).serialized_json
    end
  end

  def create
    recipient = Recipient.new(recipient_params)
    if recipient_params['email'].nil? || recipient_params['user_id'].nil?
      render json: { status: 400, error: 'Bad Request' }
    elsif recipient.save!
      render json: { status: 200, data: recipient.as_json }
    else
      render json: {status: 422, error: 'Invalid email format for recipient'}
    end
  end

  def update
    recipient = Recipient.find_by(id: params[:id])
    if recipient.nil? || recipient_params['email'].nil? || recipient_params['user_id'].nil?
      render json: { status: 400, error: 'Bad Request' }
    elsif recipient.update(recipient_params)
      render json: { status: 200, message: 'Success' }
    end
  end

  def destroy
    recipient = Recipient.find_by(id: params[:id])
    if recipient.nil?
      render json: { status: 400, error: 'Invalid Id Passed' }
    elsif recipient.destroy
      render json: { status: 200, message: 'Success' }
    end
  end

  def import
    token = request.headers['Authorization'].split(' ')[1]
    decoded_token = JWT.decode(token, Rails.application.secret_key_base, 'HS256')
    payload = decoded_token.first
    user_id = payload['user_id']
    Recipient.import(params[:file], user_id)
    render json: { status: 200, message: 'Success' }
  end

  def export
    send_data Recipient.export, filename: 'recipient-template.csv', status: 200
  end

  private

  def recipient_params
    params.require(:recipient).permit(:email, :user_id, :firstname, :lastname, tags: [])
  end
end
