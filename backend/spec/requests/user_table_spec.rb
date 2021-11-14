require 'rails_helper'

describe 'USERS API' , type: :request do
	before(:each) do 
		@user = User.new(name: "John Doe", email: "john@email_provider.com", password: "hello1")
		@user.save
		@user_token = JWT.encode({user_id: @user.id}, Rails.application.secrets.secret_key_base, 'HS256')
	end 

	describe 'GET /users' do 
		it 'returns all the users' do
			get '/api/v1/users'
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body)['data'].size).to eq(User.count)
		end
	end
	
	describe 'POST /users' do
		it 'creates new user' do 
			expect { 
				post '/api/v1/users', params: {user: { name: "Jane Doe", password: "hello", email: "jane@email_provider.com"}, password: "hello"}
		}.to change {User.count}.from(1).to(2)
		expect(response).to have_http_status(:success)
		end 

		it 'fails if user information missing' do 
			post '/api/v1/users', params: {:user => {:name => "Jill Doe", :email => nil, :password => "hello2"}, password: "hello2"}
			expect(JSON.parse(response.body)['status']).to eq(400)
		
		end 
	end

	describe 'DELETE /users/:id' do
		it 'deletes the user' do
			delete "/api/v1/users/#{@user.id}", headers: {"Authorization" => "Bearer #{@user_token}"}
			expect(response).to have_http_status(:success)
			expect(User.count).to be 0
		end
	end

	describe 'UPDATE /users/:id' do
		it 'updates the entry for specified user' do 
			patch "/api/v1/users/#{@user.id}", params: {user: {name:'Johnny Doe', email: "john@email_provider.com", password: "hello1"} }, headers: {"Authorization" => "Bearer #{@user_token}" }
			expect(response).to have_http_status(:success)
			expect(User.first.name).to eq("Johnny Doe")
		end

		it 'is invalid if any field is empty' do
			patch "/api/v1/users/#{@user.id}", params: {user: {name: nil, email: "john@email_provider.com", password: "hello1"}}, headers: {"Authorization" => "Bearer #{@user_token}" }
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body)['status']).to eq(400)
		end
	end
end
