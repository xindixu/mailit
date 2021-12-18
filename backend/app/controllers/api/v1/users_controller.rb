class Api::V1::UsersController < ApplicationController

	skip_before_action :authenticate, only: [:create, :index]
	
	def index
		users = User.all
		render json: UserSerializer.new(users).serialized_json
	end

	def show
		user = User.find_by(id: params[:id])
		if user == nil
			render json:{status: 400 , error: "Bad Request"}
		elsif
			render json: UserSerializer.new(user).serialized_json
		end
	end

	def create
		user = User.new(user_params)
		user.password = params[:password]
		user.password_digest
		if user_params['name'] == nil || user_params['email'] == nil
			render json:{status: 400 , error: "Bad Request"}
		elsif user.save
			payload = {user_id: user.id}
			token = create_token(payload)
			render json: {status: 200, message: "Success", data: {token: token, user_id: user.id}}
		else
			render json: {status: 422, error: user.errors.messages}
		end
	end

	def update
		user = User.find_by(id: params[:id])
		if(params[:password] != nil)
			user.password = params[:password]
			user.password_digest
		else
			u = User.find_by(id: params[:id]).password_digest
			user.password = u
		end
		if user_params['name'] == nil || user_params['email'] == nil
			render json:{status: 400 , error: "Bad Request"}
		elsif user.update(user_params)
			render json: {status: 200, message: "Success"}
		else
			render json: {status: 422, error: user.errors.messages }
		end
	end

	def destroy
		user = User.find_by(id: params[:id])
		if user == nil
			render json:{status: 400 , error: "Invalid ID passed"}
		elsif user.destroy
			render json: {status: 200, message: "Success"}
		else
			render json: {status: 422, error: user.errors.messages }
		end

	end

	def email_lookup
		@user = User.find_by(email: params[:email])
		if @user.nil?
			return render json: {status: 404, error: 'User not found'}
		else 
			return render json: {status: 200, data: {id: @user.id, name: @user.name, email: @user.email}}
		end
	end 
	
	private

	def user_params
		params.require(:user).permit(:name, :password, :email)
	end
end 