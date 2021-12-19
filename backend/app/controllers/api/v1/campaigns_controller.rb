class Api::V1::CampaignsController < ApplicationController
  skip_before_action :authenticate, only: [:email_opened]

  def index
    auth_header = request.headers['Authorization']
    user_id = ApplicationController.get_user_id_from_authorization_header(auth_header)
    user = User.find_by(id: user_id)
    campaigns = Campaign.all.where(user_id: user_id)
    render json: CampaignSerializer.new(campaigns).serialized_json
  end

  def show
    campaign = Campaign.find_by(id: params[:id])
    if campaign.nil?
      render json: { status: 400, error: 'Invalid Id Passed' }
    else
      render json: CampaignSerializer.new(campaign).serialized_json
    end
  end

  def create
    campaign = Campaign.new(campaign_params)
    if campaign_params['name'].nil? || campaign_params['user_id'].nil? || campaign_params['template_id'].nil?
      render json: { status: 400, error: 'Bad Request' }
    elsif campaign.save
      render json: { status: 200, data: campaign.as_json }
    end
  end

  def update
    campaign = Campaign.find_by(id: params[:id])
    if campaign.nil? || campaign_params['name'].nil? || campaign_params['user_id'].nil? || campaign_params['template_id'].nil?
      render json: { status: 400, error: 'Bad Request' }
    elsif campaign.update(campaign_params)
      render json: { status: 200, message: 'Success' }
    end
  end

  def destroy
    campaign = Campaign.find_by(id: params[:id])
    if campaign.nil?
      render json: { status: 400, error: 'Invalid Id Passed' }
    elsif campaign.destroy
      render json: { status: 200, message: 'Success' }
    end
  end

  def deliver
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, extensions = {})
    @campaign = Campaign.find_by(id: params[:id])
    if @campaign.nil?
      return render json: { status: 404, message: 'Cannot send emails for a campaign that does not exist' }
    end

    @subject = @campaign.subject
    @owner = User.find_by(id: @campaign.user_id)
    @template = Template.find_by_id(@campaign.template_id)
    @recipients = []
    temp_recipients = Recipient.all.where(user_id: @campaign.user_id)
    temp_recipients.each do |x|
      @recipients.push(x) unless (x.tags & @campaign.tags).empty?
    end
    @email_body = @template.markdown
    @recipients.each do |r|
      begin
        CampaignMailer.with(recipient: r, email_body: @email_body, owner: @owner, subject: @subject,
                            campaign_id: @campaign.id).send_email.deliver_now
        @campaign.update_number_emails_sent(true)
      rescue StandardError
        @campaign.update_number_emails_sent(false)
      end
      render json: { status: 200, message: 'Success' }
    end
  end

  def email_opened
    @campaign = Campaign.find_by(id: params[:id])
    @campaign.update_emails_opened
    send_file Rails.root.join('public', 'assets', 'tracking.png'), type: 'image/gif', disposition: 'inline'
  end

  def analytics
    @campaign = Campaign.find_by(id: params[:id])
    if @campaign.nil?
      render json: { status: 404, message: 'Cannot provide analytics for an email that does not exist' }
    else
      render json: { status: 200,
                     data: { emails_sent: @campaign.no_emails_sent, emails_not_sent: @campaign.no_emails_not_sent,
                             emails_opened: @campaign.no_emails_opened } }
    end
  end

  private

  def campaign_params
    params.require(:campaign).permit(:name, :user_id, :template_id, :subject, tags: [])
  end
end
