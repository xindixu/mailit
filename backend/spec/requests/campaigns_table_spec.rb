require 'rails_helper'

describe 'CAMPAIGNS API' do
    let(:valid_params) do
        {
            campaign:{
                name: 'Test', tags: ['test'], user_id: 1, template_id: 1
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

            get '/api/v1/campaigns'
			expect(response).to have_http_status(:success)
			expect(JSON.parse(response.body).size).to eq(1)
        end

        it 'returns a specific entry for specified id' do
            c = Campaign.new(valid_params['campaign'])
            c.save
            get "/api/v1/campaigns/#{c.id}"
            expect(response).to have_http_status(:success)
        end

        it 'is invalid if id passed is invalid' do
            c = Campaign.new(name: 'Test', tags: ['test'], user_id: 1, template_id: 1)
            c.save
            i = 2
            get "/api/v1/campaigns/#{i}"
            expect(JSON.parse(response.body)['data']).to be nil
			expect(JSON.parse(response.body)['status']).to eq(400)
			expect(JSON.parse(response.body)['error']).to eq("Invalid Id Passed")
        end
    end

    describe 'POST /'
end