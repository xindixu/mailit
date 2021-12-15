require 'redcarpet'
class CampaignMailer < ActionMailer::Base

    def send_email
        @recipient = params[:recipient]
        @email_body = params[:email_body]
        @email_body = @email_body.gsub("{{first_name}}", @recipient.firstname)
        @email_body = @email_body.gsub("{{last_name}}", @recipient.lastname)
        @email_body = @email_body.gsub('{{email}}', @recipient.email)
        markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, extensions={})
        @body= markdown.render(@email_body)
        @link = "#{ENV['backend_url']}/api/v1/campaigns/#{params[:campaign_id]}/email_opened"
        @tag = "<img src='#{@link}', 'width=\'1\', height=\'1\'>"
        @body = @body + @tag
        @owner = params[:owner]
        @subject = params[:subject]
        mail(to: @recipient.email,
             from: 'mailitproject2021@gmail.com',
             reply_to: @owner.email,
             subject: @subject,
             content_type: 'text/html',
             body: @body)     
    end 
end
