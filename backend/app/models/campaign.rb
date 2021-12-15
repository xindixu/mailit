class Campaign < ApplicationRecord
    belongs_to :template, optional: true
    belongs_to :user, optional: true

    def update_number_emails_sent(successful)
        if successful
            self.no_emails_sent = self.no_emails_sent + 1
        else
            self.no_emails_not_sent = self.no_emails_not_sent + 1
        end 
        self.save!
    end 

    def update_emails_opened()
        self.no_emails_opened = self.no_emails_opened + 1
        self.save!
    end 
end
