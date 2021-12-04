class Api::V1::PasswordsController < ApplicationController
    skip_before_action :authenticate

    def forgot 
        if params[:email].blank?
            return render json: {status: 400, message: 'Email not present'}
        end 
        @user = User.find_by(email: params[:email])
        if @user.present?
            @user.generate_password_token
            UserMailer.password_reset(@user).deliver_now
            render json: {status: 200, message: 'Email sent'}
        else 
            return render json: {status: 404, message: 'Email address not found. Please check and try again.'}
        end 
    end 

    def reset
        @user = User.find_by(reset_password_token: params[:token])
        if @user.present? 
            if @user.password_token_valid?
                @password = params[:password]
                if @password.present?
                    @user.reset_password(params[:password])
                    render json: {status: 200, message: "Password successfully changed."}
                else 
                    return render json: {status: 400, message: 'No Password Present'}
                end 
            else 
                render json: {status: 400, message: "Password reset link has expired. Try generating a new link."  }
            end 
        else 
            render json: {status: 404, message: 'User not found'}
        end 
    end 
end 
