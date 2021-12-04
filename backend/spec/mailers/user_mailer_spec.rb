require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "password_reset" do
    let(:user) { User.create(name: 'Test User', email: 'test@example.com', password: 'hello1')}
    let(:mail) { UserMailer.password_reset(user).deliver_now }

    it "renders the subject" do
      expect(mail.subject).to eq("Password Reset")
    end

    it "renders the receiver email" do 
      expect(mail.to).to eq([user.email])
    end 

    it 'renders the sender email' do 
      expect(mail.from).to eq(['mailitproject2021@gmail.com'])
    end 
  end 
  
end
