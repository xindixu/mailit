require 'rails_helper'

describe 'RECIPIENT API' do

    before(:each) do 
        @user = User.new(name: "John Doe", email: "john@email_provider.com", password: "hello1")
        @user.save
        @recipient = Recipient.new(firstname: "Jane", lastname: "Doe", email: "jane@email.com", user_id: @user.id, tags: ["RSpec"])
        @recipient.save
        @token = JWT.encode({user_id: @user.id}, Rails.application.secrets.secret_key_base, 'HS256')
    end 
    let(:valid_params) do
        {
            recipient:{
                firstname: "Test",
                lastname: "User",
                email:"test@columbia.edu",
                user_id:@user.id,
                tags:["Rspec"]
            }
        }
    end
    let(:invalid_params) do
        {
            recipient:{
                firstname: "Test", 
                lastname: "User",
                email:nil,
                user_id:@user.id,
                tags:["Rspec"]
            }
        }
    end
    let(:update_params) do
        {
            recipient:{
                firstname: "Jane", 
                lastname: "Doe",
                email:"rspecchanged@columbia.edu",
                user_id:@user.id,
                tags:["Rspec"]
            }
        }
    end

    describe 'GET /recipients' do
        it 'gets all recipients' do
            get '/api/v1/recipients', headers: {"Authorization" => "Bearer #{@token}"}
            expect(response).to have_http_status(:success)
            expect(Recipient.count).to eq(1)
        end

        it 'returns specific entry for id specified' do
            get "/api/v1/recipients/#{@recipient.id}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body).size).to eq(1)
        end

        it 'is invalid is incorrect id is passed' do
            get "/api/v1/recipients/#{@recipient.id+1}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Invalid Id Passed')
        end
    end

    describe 'POST /recipients' do
        it 'creates a new recipient' do 
            expect {
                post '/api/v1/recipients', params: valid_params, headers: {"Authorization" => "Bearer #{@token}"}
            }.to change {Recipient.count}.from(1).to(2)
            expect(response).to have_http_status(:success)
        end

        it 'is invalid if params are invalid' do
            post '/api/v1/recipients', params: invalid_params, headers: {"Authorization" => "Bearer #{@token}"}
            expect(Recipient.count).to eq(1)
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Bad Request')
        end
    end

    describe 'DELETE /recipients' do 
        it 'delete an entry for specified id' do
            delete "/api/v1/recipients/#{@recipient.id}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(Recipient.count).to eq(0)
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)['status']).to eq(200)
            expect(JSON.parse(response.body)['message']).to eq("Success")
        end

        it 'is invalid if id is incorrect' do
            i = @recipient.id + 1
            expect(Recipient.count).to eq(1)
            delete "/api/v1/recipients/#{i}", headers: {"Authorization" => "Bearer #{@token}"}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Invalid Id Passed')
            expect(Recipient.count).to eq(1)
        end
    end

    describe 'UPDATE /recipients' do
        it 'updates the entry for given id' do
            patch "/api/v1/recipients/#{@recipient.id}", params: update_params, headers: {"Authorization" => "Bearer #{@token}"}
            expect(response).to have_http_status(:success)
            expect(Recipient.first.email).to eq('rspecchanged@columbia.edu')
        end

        it 'is invalid if id passed is incorrect' do
            i = @recipient.id + 1
            patch "/api/v1/recipients/#{i}", params: update_params, headers: {"Authorization" => "Bearer #{@token}"}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Bad Request')
        end

        it 'is invalid if parameters to update are not correct' do 
            patch "/api/v1/recipients/#{@recipient.id}", params: invalid_params, headers: {"Authorization" => "Bearer #{@token}"}
            expect(JSON.parse(response.body)['status']).to eq(400)
            expect(JSON.parse(response.body)['error']).to eq('Bad Request')
        end
    end

    describe 'GET /recipients/export' do 
        it 'returns the csv file' do 
            get '/api/v1/recipients/export', headers: {"Authorization" => "Bearer #{@token}"}
            expect(CSV.parse(response.body)[0]).to eq(["firstname", "lastname", "email"])
            expect(CSV.parse(response.body)[1]).to eq(["Jane", "Doe", "jane.doe@example.com"])
        end 
    end 
end
