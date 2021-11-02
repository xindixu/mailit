class Api::V1::TemplatesController < ApplicationController
	def index
		templates = Template.all
		render json: TemplateSerializer.new(templates).serialized_json
	end

	def show
		template = Template.find_by(id: params[:id])
		
		if template == nil
			render json:{status: 400 , error: "Invalid Id Passed"}
		else
			render json: TemplateSerializer.new(template).serialized_json
		end
	end

	def create
		template = Template.new(template_params)
		if template_params['name'] == nil || template_params['user_id'] == nil || template_params['collaborator_ids'].length() == 0
			render json:{status: 400 , error: "Bad Request"}
		elsif template.save
			render json: {status: 200, message: "Success"}
		else
			render json: {status: 422, error: template.errors.messages }
		end
	end

	def update
		template = Template.find_by(id: params[:id])
		if template == nil || template_params['name'] == nil || template_params['user_id'] == nil || template_params['collaborator_ids'].length() == 0
			render json:{status: 400 , error: "Bad Request"}
		elsif template.update(template_params)
			render json: {status: 200, message: "Success"}
		else
			render json: {status: 422, error: template.errors.messages }
		end
	end

	def destroy
		template = Template.find_by(id: params[:id])
		if template == nil
			render json:{status: 400 , error: "Invalid Id passed"}
		elsif template.destroy
			render json: {status: 200, message: "Success"}
		else
			render json: {status: 422, error: user.errors.messages }
		end

	end

	private

    def template_params
		params.require(:template).permit(:markdown, :name, :user_id, collaborator_ids: [])
    end
end