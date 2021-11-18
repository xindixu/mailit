require 'rails_helper'

describe 'TEMPLATES API' , type: :request do
	let (:valid_params) do 
		{
			template: {
				markdown: '**Hi**',
				collaborator_ids: [],
				user_id: 1, 
				name: 'New Template'
			}
		}

	end 

	let(:invalid_params) do 
		{
			template: {
				markdown: '',
				collaborator_ids: [],
				user_id: nil,
				name: 'Template Test'
			}
		}
	end 

	before(:each) do 
		@user = User.new(name: "John Doe", email: "john@email_provider.com", password: "hello1")
		@user.save
		@template = Template.new(markdown: "### Heading level 3 **boldtext**", collaborator_ids: [], user_id: @user.id, name: "Test Template")
		@template.save
		@token =  JWT.encode({user_id: @user.id}, Rails.application.secrets.secret_key_base, 'HS256')
	end 

	describe 'GET /templates' do
		it 'returns all the templates present' do
			get '/api/v1/templates'
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body).size).to eq(1)
		end

		it 'returns the specific template' do
			get "/api/v1/templates/#{@template.id}", headers: {"Authorization" => "Bearer #{@token}"}
			expect(response).to have_http_status(:success)
		end

		it 'is invalid if id is not correct' do 
			i = @template.id + 1
			get "/api/v1/templates/#{i}", headers: {"Authorization" => "Bearer #{@token}"}
			expect(JSON.parse(response.body)['data']).to be nil
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid Id Passed")
		end
	end

	describe 'POST /templates' do
		it 'creates a new template' do
			expect {
				post '/api/v1/templates', params: valid_params,  headers: {"Authorization" => "Bearer #{@token}"}
			}.to change {Template.count}.from(1).to(2)
			expect(response).to have_http_status(:success)
		end

		it 'is invalid if name, user_id or collaborator_ids is empty' do
			post '/api/v1/templates', params: invalid_params,  headers: {"Authorization" => "Bearer #{@token}"}
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Bad Request")
		end
	end

	describe 'DELETE /templates' do
		it 'deletes the specified entry' do
			expect(Template.count).to eq(1)
			delete "/api/v1/templates/#{@template.id}", headers: {"Authorization" => "Bearer #{@token}"}
			expect(response).to have_http_status(:success)
			expect(Template.count).to be 0
		end

		it 'is invalid if id passed is invalid' do
			i = @template.id + 1
			expect(Template.count).to eq(1)
			delete "/api/v1/templates/#{i}", headers: {"Authorization" => "Bearer #{@token}"}
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid Id passed")
			expect(Template.count).to be 1

		end

	end

	describe 'UPDATE /templates' do
		it 'updates the entry for the id specified' do
			
			patch "/api/v1/templates/#{@template.id}" , params: valid_params,  headers: {"Authorization" => "Bearer #{@token}"}
			expect(response).to have_http_status(:success)
			expect(Template.first.name).to eq('New Template')
		end

		it 'is invalid if id passed is invalid' do
			i = @template.id + 1
			patch "/api/v1/templates/#{i}" , params: valid_params,  headers: {"Authorization" => "Bearer #{@token}"}
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Bad Request")

		end

		it 'is invalid if name, user_id or collaborator_ids is empty' do
			patch "/api/v1/templates/#{@template.id}" , params: invalid_params,  headers: {"Authorization" => "Bearer #{@token}"}
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Bad Request")
		end
	end
end
