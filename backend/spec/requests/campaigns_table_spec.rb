require 'rails_helper'

describe 'CAMPAIGNS API' ,type: :request do
    let(:valid_params) do
        {
            campaign:{
                name: 'Test',
                tags: ['test'],
                user_id: 1, 
                template_id: 1
            }
            
        }
    end
    let(:update_params) do
        {
            campaign:{
                id:1, name: 'Test2', tags: ['test2'], user_id: 2, template_id: 1
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
            c = Campaign.new(valid_params['campaign'])
            c.save
            expect(Campaign.count).to eq(1)
            get '/api/v1/campaigns'
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body).size).to eq(1)
        end

        it 'returns a specific entry for specified id' do
            c = Campaign.new(valid_params['campaign'])
            c.save
            expect(Campaign.count).to eq(1)
            get "/api/v1/campaigns/#{c.id}"
            expect(response).to have_http_status(:success)
        end

        it 'is invalid if id passed is invalid' do
            c = Campaign.new(name: 'Test', tags: ['test'], user_id: 1, template_id: 1)
            c.save
            expect(Campaign.count).to eq(1)
            i = 2
            get "/api/v1/campaigns/#{i}"
            expect(JSON.parse(response.body)['data']).to be nil
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid Id Passed")
        end
    end

    describe 'POST /campaigns' do
        it 'creates a new campaign' do
			post '/api/v1/campaigns', params: valid_params
			expect(response).to have_http_status(:success)
        end

        it 'is invalid for invalid parameters' do
            post '/api/v1/campaigns', params: invalid_params
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq("Bad Request")
            expect(Campaign.count).to be 0
        end
    end

    describe 'DELETE /campaigns' do
        it 'deletes an entry in campaigns table' do
            c = Campaign.new(valid_params['campaign'])
            c.save
            expect(Campaign.count).to eq(1)
            delete "/api/v1/campaigns/#{c.id}"
            expect(response).to have_http_status(:success)
            expect(Campaign.count).to eq(0)
        end

        it 'is invalid if id is not correct' do 
            c = Campaign.new(valid_params['campaign'])
            c.save
            i = c.id + 1
            expect(Campaign.count).to eq(1)
            delete "/api/v1/campaigns/#{i}"
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq("Invalid Id Passed")
        end
    end

    describe 'UPDATE /campaigns' do
        it 'updates the entry for given ID' do
            c = Campaign.new(name: 'Test1', tags: ['test1'], user_id: 1, template_id: 1
            )
            c.save
            expect(Campaign.count).to eq(1)
            patch "/api/v1/campaigns/#{c.id}", params: update_params
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(200)
            expect(JSON.parse(response.body)['message']).to eq("Success")
        end

        it 'is invalid if id not correct' do
            c = Campaign.new(name: 'Test1', tags: ['test1'], user_id: 1, template_id: 1
            )
            c.save
            i = c.id + 1
            expect(Campaign.count).to eq(1)
            patch "/api/v1/campaigns/#{i}", params: update_params
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq("Bad Request")
        end
    end
end
