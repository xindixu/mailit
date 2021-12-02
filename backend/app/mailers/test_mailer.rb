require 'redcarpet'
class TestMailer < ActionMailer::Base

    def test_email
        @recipient = params[:recipient]
        @email_body = params[:email_body]
        @owner = params[:owner]
        @subject = params[:subject]
        mail(to: @recipient.email,
             from: 'mailitproject2021@gmail.com',
             reply_to: @owner.email,
             subject: @subject,
             content_type: 'text/html',
             body: @email_body)     
    end 
end
