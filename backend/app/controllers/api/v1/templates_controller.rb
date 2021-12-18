class Api::V1::TemplatesController < ApplicationController
  skip_before_action :authenticate, only: [:index]
 
  def index
    templates = Template.all
    render json: TemplateSerializer.new(templates).serialized_json
  end

  def show
    template = Template.find_by(id: params[:id])

    if template.nil?
      render json: { status: 400, error: 'Invalid Id Passed' }
    else
      render json: TemplateSerializer.new(template).serialized_json
    end
  end

  def create
    template = Template.new(template_params)
    if template_params['name'].nil? || template_params['user_id'].nil? || template_params['collaborator_ids'].length == 0
      render json: { status: 400, error: 'Bad Request' }
    elsif template.save
      render json: { status: 200, data: template.as_json }
    else
      render json: { status: 422, error: template.errors.messages }
    end
  end

  def update
    template = Template.find_by(id: params[:id])
    if template.nil? || template_params['name'].nil? || template_params['user_id'].nil? || template_params['collaborator_ids'].length == 0
      render json: { status: 400, error: 'Bad Request' }
    elsif template.update(template_params)
      render json: { status: 200, message: 'Success' }
    else
      render json: { status: 422, error: template.errors.messages }
    end
  end

  def destroy
    template = Template.find_by(id: params[:id])
    if template.nil?
      render json: { status: 400, error: 'Invalid Id passed' }
    elsif template.destroy
      render json: { status: 200, message: 'Success' }
    else
      render json: { status: 422, error: template.errors.messages }
    end
  end

  def built_in
    templates = Template.all.where(:built_in => true)
    render json: TemplateSerializer.new(templates).serialized_json 
  end 

  def used 
    template = Template.find_by(id: params[:id])
    if template.nil?
      render json: { status: 400, error: 'Invalid Id Passed' }
    else 
      if template.built_in 
        template.update_no_times_used
        render json: {status: 200, message: "Successfully incremented times used"}
      else 
        render json: {status: 405, error: "Method Not Allowed" }
      end 
    end 
  end 

  def analytics 
    templates = Template.all.where(:built_in => true)
    render json: TemplateSerializer.new(templates).serialized_json
  end 

  private

  def template_params
    params.require(:template).permit(:markdown, :name, :user_id, collaborator_ids: [])
  end
end
