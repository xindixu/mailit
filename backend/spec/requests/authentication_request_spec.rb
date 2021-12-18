require 'rails_helper'
RSpec.describe 'AUTHENTICATION API', type: :request do 
    describe 'POST /login' do 
        it 'authenticates the user' do 
            @user = User.new(name: 'Test User', email: 'test@example.com', password: 'hello1')
            @user.save
            expected_token = JWT.encode({user_id: @user.id}, Rails.application.secret_key_base, 'HS256')
            post '/api/v1/login', params: {email: 'test@example.com', password: 'hello1'}
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(200)
            expect(JSON.parse(response.body)['data']['token']).to eq(expected_token)
        end

        it 'returns error when user does not exist' do 
            @user = User.new(name: 'Test User', email: 'test@example.com', password: 'hello1')
            @user.save
            post '/api/v1/login', params: {email: 'test@example.com', password: 'hello'}
            expect(JSON.parse(response.body)['status']).to eq(401)
            expect(JSON.parse(response.body)['message']).to eq("Authentication Failed")
        end 

        it 'returns error when email does not exist' do
            @user = User.new(name: 'Test User', email: 'test@example.com', password: 'hello1')
            @user.save
            post '/api/v1/login', params: {email: 'test3@example.com', password: 'hello1'}
            expect(JSON.parse(response.body)['status']).to eq(404)
            expect(JSON.parse(response.body)['message']).to eq("Could not find user")
            
        end 
    end 
end 
