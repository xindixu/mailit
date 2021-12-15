class UserMailer < ActionMailer::Base

  def password_reset(user)
    @user = user

    mail to: @user.email, from: 'mailitproject2021@gmail.com', subject: "Password Reset"
  end
end
