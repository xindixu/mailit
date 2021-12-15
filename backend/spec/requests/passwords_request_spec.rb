require 'rails_helper'
RSpec.describe 'PASSWORD API', type: :request do
    before(:each) do 
        @user = User.new(name: 'Test User', email: 'test@example.com', password: 'hello1')
        @user.save
    end 
    describe 'POST /password/forgot' do 
        it 'returns error when the user does not exist' do 
            post '/api/v1/password/forgot', params: {email: 'jane.doe@example.com'}
            expect(JSON.parse(response.body)['status']).to eq(404)
            expect(JSON.parse(response.body)['message']).to eq('Email address not found. Please check and try again.')
        end 

        it 'returns error when email not provided' do 
            post '/api/v1/password/forgot'
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['message']).to eq('Email not present')
        end 

        it 'sends the password reset email' do 
            expect {
                post "/api/v1/password/forgot", params: {email: 'test@example.com'}
            }.to change {ActionMailer::Base.deliveries.count}.by(1)    
    
        end 
    end 

    describe 'POST /password/reset' do 
        it 'returns error token not associated with user' do 
            @token = SecureRandom.urlsafe_base64 
            post '/api/v1/password/reset', params: {token: @token, password: 'highfive5!'}
            expect(JSON.parse(response.body)['status']).to eq(404)
            expect(JSON.parse(response.body)['message']).to eq('User not found')
        end 

        it 'returns error when no password is passed' do 
            @user.generate_password_token 
            @token = @user.reset_password_token
            post '/api/v1/password/reset', params: {token: @token, password: ''}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['message']).to eq('No Password Present')
        end 

        it 'returns error when the link has expired' do
            @user.generate_password_token 
            @token = @user.reset_password_token
            @user.reset_password_token_sent_at = Time.now + 2.hours
            @user.save
            post '/api/v1/password/reset', params: {token: @token, password: 'highfive5!'}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['message']).to eq("Password reset link has expired. Try generating a new link.")
        end 

        it 'successfully resets the password' do 
            @user.generate_password_token 
            @token = @user.reset_password_token
            post '/api/v1/password/reset', params: {token: @token, password: 'highfive5!'}
            expect(JSON.parse(response.body)['status']).to eq(200)
            expect(JSON.parse(response.body)['message']).to eq("Password successfully changed.")
            expect(@user.authenticate('highfive5!')).not_to be(nil)
        end 

    end 
end 