require 'rails_helper'

describe 'TEMPLATES API', type: :request do
  let(:valid_params) do
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
    @user = User.new(name: 'John Doe', email: 'john@email_provider.com', password: 'hello1')
    @user2 = User.new(name: 'Jane Doe', email: 'jane@email_provider.com', password: 'hello2!')
    @user.save
    @user2.save
    @template = Template.new(markdown: '### Heading level 3 **boldtext**', collaborator_ids: [@user2.id], user_id: @user.id,
                             name: 'Test Template')
    @template2 = Template.new(markdown: '### Heading level 3 **boldtext**', collaborator_ids: [], user_id: @user.id,
                             name: 'Test 2 Template', built_in: true )
    @template.save
    @template2.save
    @token = JWT.encode({ user_id: @user.id }, Rails.application.secret_key_base, 'HS256')
    @token2 = JWT.encode({ user_id: @user2.id }, Rails.application.secret_key_base, 'HS256')
  end

  describe 'GET /templates' do
    it 'returns all the templates present' do
      get '/api/v1/templates', headers: { 'Authorization' => "Bearer #{@token}" }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(1)
    end

    it 'returns the specific template' do
      get "/api/v1/templates/#{@template.id}", headers: { 'Authorization' => "Bearer #{@token}" }
      expect(response).to have_http_status(:success)
    end

    it 'is invalid if id is not correct' do
      i = @template2.id + 1
      get "/api/v1/templates/#{i}", headers: { 'Authorization' => "Bearer #{@token}" }
      expect(JSON.parse(response.body)['data']).to be nil
      expect(JSON.parse(response.body)['status']).to eq(400)
      expect(JSON.parse(response.body)['error']).to eq('Invalid Id Passed')
    end
  end

  describe 'GET /templates/built_in' do 
    it 'returns built-in templates' do 
      get '/api/v1/templates/built_in', headers: { 'Authorization' => "Bearer #{@token}" }
      expect(JSON.parse(response.body).size).to eq(1)
    end 
  end 

  describe 'POST /templates' do
    it 'creates a new template' do
      expect do
        post '/api/v1/templates', params: valid_params, headers: { 'Authorization' => "Bearer #{@token}" }
      end.to change { Template.count }.from(2).to(3)
      expect(response).to have_http_status(:success)
    end

    it 'is invalid if name, user_id or collaborator_ids is empty' do
      post '/api/v1/templates', params: invalid_params, headers: { 'Authorization' => "Bearer #{@token}" }
      expect(JSON.parse(response.body)['status']).to eq(400)
      expect(JSON.parse(response.body)['error']).to eq('Bad Request')
    end
  end

  describe 'DELETE /templates' do
    it 'deletes the specified entry' do
      expect(Template.count).to eq(2)
      delete "/api/v1/templates/#{@template.id}", headers: { 'Authorization' => "Bearer #{@token}" }
      expect(response).to have_http_status(:success)
      expect(Template.count).to be 1
    end

    it 'is invalid if id passed is invalid' do
      i = @template2.id + 1
      expect(Template.count).to eq(2)
      delete "/api/v1/templates/#{i}", headers: { 'Authorization' => "Bearer #{@token}" }
      expect(JSON.parse(response.body)['status']).to eq(400)
      expect(JSON.parse(response.body)['error']).to eq('Invalid Id passed')
      expect(Template.count).to be 2
    end

    it 'is invalid if collaborator attempts' do 
      expect(Template.count).to eq(2)
      delete "/api/v1/templates/#{@template.id}", headers: { 'Authorization' => "Bearer #{@token2}" }
      expect(JSON.parse(response.body)['status']).to eq(405)
      expect(JSON.parse(response.body)['error']).to eq('Unauthorized to complete operation')
      expect(Template.count).to be 2
    end 
  end

  describe 'UPDATE /templates' do
    it 'updates the entry for the id specified' do
      patch "/api/v1/templates/#{@template.id}", params: valid_params,
                                                 headers: { 'Authorization' => "Bearer #{@token}" }
      expect(response).to have_http_status(:success)
      expect(Template.first.name).to eq('New Template')
    end

    it 'is invalid if id passed is invalid' do
      i = @template2.id + 1
      patch "/api/v1/templates/#{i}", params: valid_params, headers: { 'Authorization' => "Bearer #{@token}" }
      expect(JSON.parse(response.body)['status']).to eq(400)
      expect(JSON.parse(response.body)['error']).to eq('Bad Request')
    end

    it 'is invalid if name, user_id or collaborator_ids is empty' do
      patch "/api/v1/templates/#{@template.id}", params: invalid_params,
                                                 headers: { 'Authorization' => "Bearer #{@token}" }
      expect(JSON.parse(response.body)['status']).to eq(400)
      expect(JSON.parse(response.body)['error']).to eq('Bad Request')
    end
  end

  describe 'POST /templates/:id/built_in/used' do
   it 'successfully increments the times the template has been used' do 
    post "/api/v1/templates/#{@template2.id}/built_in/used", headers: { 'Authorization' => "Bearer #{@token}" }
    expect(JSON.parse(response.body)['status']).to eq(200)
    expect(JSON.parse(response.body)['message']).to eq('Successfully incremented times used')
   end 

   it 'return error when invalid template id passed' do 
    id = @template2.id + 1 
    post "/api/v1/templates/#{id}/built_in/used", headers: { 'Authorization' => "Bearer #{@token}" }
    expect(JSON.parse(response.body)['status']).to eq(400)
    expect(JSON.parse(response.body)['error']).to eq('Invalid Id Passed')
   end 

   it 'does not work with templates that are not built in' do 
    post "/api/v1/templates/#{@template.id}/built_in/used", headers: { 'Authorization' => "Bearer #{@token}" }
    expect(JSON.parse(response.body)['status']).to eq(405)
    expect(JSON.parse(response.body)['error']).to eq('Method Not Allowed')

   end 

  end 
end
