require 'rails_helper'

describe 'TEMPLATES API' , type: :request do
	let(:valid_params) do
		{
			template:{
				markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template"
			}
		}
	end
	let(:invalid_params) do
	{ 
		template:{
				markdown:'',
				collaborator_ids:nil,
				user_id: nil,
				name: nil
		}
	}
	end

	describe 'GET /templates' do
		it 'returns all the templates present' do
			template = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			template.save

			get '/api/v1/templates'
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body).size).to eq(1)
		end

		it 'returns the specific template' do
			t = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			t.save

			get "/api/v1/templates/#{t.id}"
			expect(response).to have_http_status(:success)
		end

		it 'is invalid if id is not correct' do 
			t = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			t.save

			i = t.id + 1
			get "/api/v1/templates/#{i}"
			expect(JSON.parse(response.body)['data']).to be nil
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid Id Passed")
		end
	end

	describe 'POST /templates' do
		it 'creates a new template' do
			expect {
				post '/api/v1/templates', params: valid_params
			}.to change {Template.count}.from(0).to(1)

			expect(response).to have_http_status(:success)
		end

		it 'is invalid if name,user_id or collaborator_ids is empty' do
			post '/api/v1/templates', params: invalid_params
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Bad Request")
		end
	end

	describe 'DELETE /templates' do
		it 'deletes the specified entry' do
			t = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			t.save
			expect(Template.count).to eq(1)
			delete "/api/v1/templates/#{t.id}"
			expect(response).to have_http_status(:success)
			expect(Template.count).to be 0
		end

		it 'is invalid if id passed is invalid' do
			t = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			t.save
			i = t.id + 1
			expect(Template.count).to eq(1)
			delete "/api/v1/templates/#{i}"
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid Id passed")
			expect(Template.count).to be 1

		end

	end

	describe 'UPDATE /templates' do
		it 'updates the entry for the id specified' do
			t = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			t.save
			
			patch "/api/v1/templates/#{t.id}" , params: valid_params
			expect(response).to have_http_status(:success)
		end

		it 'is invalid if id passed is invalid' do
			t = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			t.save
			i = t.id + 1
			patch "/api/v1/templates/#{i}" , params: valid_params
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Bad Request")

		end

		it 'is invalid if name,user_id or collaborator_ids is empty' do
			t = Template.new(markdown: "### Heading level 3 **boldtext**",
				collaborator_ids:["1", "2"],
				user_id: 1,
				name: "Rspec Template")
			t.save
			patch "/api/v1/templates/#{t.id}" , params: invalid_params
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Bad Request")
		end
	end
end

