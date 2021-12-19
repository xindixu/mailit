class Template < ApplicationRecord
    belongs_to :user, optional: true
    has_many :campaigns

    def update_no_times_used
        self.no_times_used = self.no_times_used + 1 
        self.save!
    end 
end
