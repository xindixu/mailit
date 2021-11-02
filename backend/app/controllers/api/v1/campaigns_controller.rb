require 'redcarpet'

class Api::V1::CampaignsController < ApplicationController
    def index
        campaigns = Campaign.all
        render json: CampaignSerializer.new(campaigns).serialized_json
    end
    
    def show
        campaign = Campaign.find_by(id: params[:id])
        if campaign == nil
			render json:{status: 400 , error: "Invalid Id Passed"}
        else
            render json: CampaignSerializer.new(campaign).serialized_json
        end
    end
    def create
        campaign = Campaign.new(campaign_params)
        if campaign_params['name'] == nil || campaign_params['user_id'] == nil || campaign_params['template_id'] == nil
            render json:{status: 400 , error: "Bad Request"}
        elsif campaign.save
            render json: {status: 200, message: "Success"}
        else
            render json: {status: 422, error: campaign.errors.messages }
        end
    end

    def update
        campaign = Campaign.find_by(id: params[:id])
        if campaign == nil || campaign_params['name'] == nil || campaign_params['user_id'] == nil || campaign_params['template_id'] == nil
            render json:{status: 400 , error: "Bad Request"}
        elsif campaign.update(campaign_params)
            render json: {status: 200, message: "Success"}
        else
            render json: {status: 422, error: campaign.errors.messages }
        end
    end

    def destroy
        campaign = Campaign.find_by(id: params[:id])
        if campaign == nil
			render json:{status: 400 , error: "Invalid Id Passed"}
        elsif campaign.destroy
            render json: {status: 200, message: "Success"}
        else
            render json: {status: 422, error: campaign.errors.messages }
        end
    end

    def deliver 
        markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, extensions={})
        @campaign = Campaign.find params[:id]
        @template = Template.find_by_id(@campaign.template_id)
        @recipients = []
        temp_recipients = Recipient.all.where(:user_id => @campaign.user_id)
        temp_recipients.each {|x|
            if not (x.tags & @campaign.tags).empty?
                @recipients.push(x)
            end 
        }
        @email_body = markdown.render(@template.markdown)
        @recipients.each do |r|
            TestMailer.with(recipient: r, email_body: @email_body).test_email.deliver_now 
        
        render json:{status: 200 , message:"Success"}
        end 
    end 

    private
    def campaign_params
        params.require(:campaign).permit(:name,:tags,:user_id,:template_id)
    end
end 