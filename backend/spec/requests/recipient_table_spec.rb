require 'rails_helper'

describe 'RECIPIENT API' do
    let(:valid_params) do
        {
            recipient:{
                email:"test@columbia.edu",
                user_id:3,
                tags:["Rspec"]
            }
        }
    end
    let(:invalid_params) do
        {
            recipient:{
                email:nil,
                user_id:nil,
                tags:["Rspec"]
            }
        }
    end
    let(:update_params) do
        {
            recipient:{email:"rspecchanged@columbia.edu",
                user_id:1,
                tags:["Rspec changes"]
            }
        }
    end

    describe 'GET /recipients' do
        it 'gets all recipients' do
            r = Recipient.new(valid_params['recipient'])
            r.save
            expect(Recipient.count).to eq(1)
            get '/api/v1/recipients'
            expect(response).to have_http_status(:success)
        end

        it 'returns specific entry for id specified' do
            r= Recipient.new(valid_params['recipient'])
            r.save
            expect(Recipient.count).to eq(1)
            get "/api/v1/recipients/#{r.id}"
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body).size).to eq(1)
        end

        it 'is invalid is incorrect id is passed' do
            r= Recipient.new(valid_params['recipient'])
            r.save
            i= r.id + 1
            expect(Recipient.count).to eq(1)
            get "/api/v1/recipients/#{i}"
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Invalid Id Passed')
        end
    end

    describe 'POST /recipients' do
        it 'creates a new recipient' do 
            expect {
                post '/api/v1/recipients', params: valid_params
            }.to change {Recipient.count}.from(0).to(1)
            expect(response).to have_http_status(:success)
        end

        it 'is invalid if params are invalid' do
            expect(Recipient.count).to eq(0)
            post '/api/v1/recipients', params: invalid_params
            expect(Recipient.count).to eq(0)
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Bad Request')
        end
    end

    describe 'DELETE /recipients' do 
        it 'delete an entry for specified id' do
            r= Recipient.new(valid_params['recipient'])
            r.save
            expect(Recipient.count).to eq(1)
            delete "/api/v1/recipients/#{r.id}"
            expect(Recipient.count).to eq(0)
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(200)
            expect(JSON.parse(response.body)['message']).to eq("Success")
        end

        it 'is invalid if id is incorrect' do
            r= Recipient.new(valid_params['recipient'])
            r.save
            i = r.id + 1
            expect(Recipient.count).to eq(1)
            delete "/api/v1/recipients/#{i}"
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Invalid Id Passed')
            expect(Recipient.count).to eq(1)
        end
    end

    describe 'UPDATE /recipients' do
        it 'updates the entry for given id' do
            r= Recipient.new(email:"test@columbia.edu",
                user_id:3,
                tags:["Rspec"])
            r.save
            expect(Recipient.count).to eq(1)
            patch "/api/v1/recipients/#{r.id}", params: update_params
            expect(response).to have_http_status(:success)
        end

        it 'is invalid if id passed is incorrect' do
            r= Recipient.new(email:"test@columbia.edu",
                user_id:3,
                tags:["Rspec"])
            r.save
            i = r.id + 1
            expect(Recipient.count).to eq(1)
            patch "/api/v1/recipients/#{i}", params: update_params
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Bad Request')
        end

        it 'is invalid if parameters to update are not correct' do 
            r= Recipient.new(email:"test@columbia.edu",
                user_id:3,
                tags:["Rspec"])
            r.save
            expect(Recipient.count).to eq(1)
            patch "/api/v1/recipients/#{r.id}", params: invalid_params
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Bad Request')
        end
    end
end
