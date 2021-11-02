require 'rails_helper'

describe 'USERS API' , type: :request do
	let(:valid_params) do 
		{
			user: {
				name: "Rspec User 2",
				email: "test2@columbia.edu",
				password: "hello2"
			},
			password: "hello2"
		}
	end
	let(:invalid_params) do
		{
			user: {
				name: nil,
				email: "test2@columbia.edu"
			}
		}
	end
	let(:unpermitted_params) do
		{
			user: {
				name: "Rspec User 2",
				email: "test2@columbia.edu",
				title: "hello world"
			}
		}
	end
	describe 'GET /users' do 
		it 'returns all the users' do
			u= User.new(name: "Rspec User", email: "test@columbia.edu", password: "hello")
			u1= User.new(name: "Rspec User 1", email: "test1@columbia.edu", password: "hello1")
			u.save
			u1.save
			get '/api/v1/users'
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body)['data'].size).to eq(User.count)
		end
	end
	
	describe 'POST /users' do
		it 'creates new users' do
			expect {
				post '/api/v1/users', params: valid_params
			}.to change {User.count}.from(0).to(1)

			expect(response).to have_http_status(:success)
		end

		it 'fails if invalid params are passed' do
			post '/api/v1/users', params: invalid_params
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(response).to have_http_status(:success)
		end
	end

	describe 'DELETE /users/:id' do
		it 'deletes the user' do
			u= User.new(name: "Rspec User", email: "test@columbia.edu", password: "hello")
			u1= User.new(name: "Rspec User 1", email: "test1@columbia.edu", password: "hello1")
			u.save
			u1.save
			expect(User.count).to be 2
			delete "/api/v1/users/#{u.id}"
			expect(response).to have_http_status(:success)
			expect(User.count).to be 1
		end

		it 'fails if id is invalid' do
			u= User.new(name: "Rspec User", email: "test@columbia.edu", password: "hello")
			u.save
			expect(User.count).to be 1
			i= u.id + 1
			delete "/api/v1/users/#{i}"
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid ID passed")
		end
	end

	describe 'UPDATE /users/:id' do
		it 'updates the entry for specified user' do 
			u= User.new(name: "Rspec User", email: "test@columbia.edu", password: "hello")
			u1= User.new(name: "Rspec User 1", email: "test1@columbia.edu", password: "hello1")
			u.save
			u1.save
			
			expect(User.count).to be 2
			patch "/api/v1/users/#{u.id}", params:valid_params

			expect(response).to have_http_status(:success)
			expect(User.first.name).to eq("Rspec User 2")
			expect(User.first.email).to eq("test2@columbia.edu")
		end

		it 'is invalid if any field is empty' do
			u= User.new(name: "Rspec User", email: "test@columbia.edu", password: "hello")
			u1= User.new(name: "Rspec User 1", email: "test1@columbia.edu", password: "hello1")
			u.save
			u1.save
			expect(User.count).to be 2
			patch "/api/v1/users/#{u.id}", params:invalid_params
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(response).to have_http_status(:success)
		end
	end
end
