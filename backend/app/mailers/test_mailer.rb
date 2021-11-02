require 'redcarpet'
class TestMailer < ActionMailer::Base

    def test_email
        @recipient = params[:recipient]
        @email_body = params[:email_body]
        mail(to: @recipient.email,
             from: 'mailitproject2021@gmail.com',
             subject: 'This is a test email.',
             content_type: 'text/html',
             body: @email_body)     
    end 
end
