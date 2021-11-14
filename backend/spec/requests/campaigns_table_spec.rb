require 'rails_helper'

describe 'CAMPAIGNS API' ,type: :request do
    before(:each) do 
        @user = User.new(name: "John Doe", email: "john@email_provider.com", password: "hello1")
		@user.save
		@token = JWT.encode({user_id: @user.id}, Rails.application.secrets.secret_key_base, 'HS256')
        @campaign = Campaign.new(name: "Test", tags:['test'], user_id: @user.id, template_id: 1)
        @campaign.save
    end 
    let(:valid_params) do
        {
            campaign:{
                name: 'Test',
                tags: ['test'],
                user_id: @user.id, 
                template_id: 1
            }
            
        }
    end
    let(:update_params) do
        {
            campaign:{
                id:@campaign.id, name: 'Test', tags: ['test2'], user_id: @user.id, template_id: 1
            }
            
        }
    end
    let(:invalid_params) do
        {
            campaign:{
                name: nil, tags: ['test'], user_id: nil, template_id: nil
            }
        }
    end
    describe 'GET /campaigns' do
        it 'returns all the campaigns' do
            get '/api/v1/campaigns'
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body).size).to eq(1)
        end

        it 'returns a specific entry for specified id' do
            get "/api/v1/campaigns/#{@campaign.id}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(response).to have_http_status(:success)
        end

        it 'is invalid if id passed is invalid' do
            i = @campaign.id + 1
            get "/api/v1/campaigns/#{i}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(JSON.parse(response.body)['data']).to be nil
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid Id Passed")
        end
    end

    describe 'POST /campaigns' do
        it 'creates a new campaign' do
			post '/api/v1/campaigns', params: valid_params, headers: {"Authorization" => "Bearer #{@token}"}
			expect(response).to have_http_status(:success)
            expect(Campaign.count).to be 2
        end

        it 'is invalid for invalid parameters' do
            post '/api/v1/campaigns', params: invalid_params, headers: {"Authorization" => "Bearer #{@token}"}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq("Bad Request")
            expect(Campaign.count).to be 1
        end
    end

    describe 'DELETE /campaigns' do
        it 'deletes an entry in campaigns table' do
            delete "/api/v1/campaigns/#{@campaign.id}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(response).to have_http_status(:success)
            expect(Campaign.count).to eq(0)
        end

        it 'is invalid if id is not correct' do 
            i = @campaign.id + 1
            expect(Campaign.count).to eq(1)
            delete "/api/v1/campaigns/#{i}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq("Invalid Id Passed")
        end
    end

    describe 'UPDATE /campaigns' do
        it 'updates the entry for given ID' do
            patch "/api/v1/campaigns/#{@campaign.id}", params: update_params, headers: {"Authorization" => "Bearer #{@token}"}
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(200)
            expect(JSON.parse(response.body)['message']).to eq("Success")
            expect(Campaign.first.tags).to eq(['test2'])
        end

        it 'is invalid if id not correct' do
            i = @campaign.id + 1
            patch "/api/v1/campaigns/#{i}", params: update_params, headers: {"Authorization" => "Bearer #{@token}"}
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq("Bad Request")
        end
    end
end
