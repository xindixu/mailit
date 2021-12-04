class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness: true
    has_many :recipients
    has_many :templates
    has_many :campaigns

    def generate_password_token
        self.reset_password_token = SecureRandom.urlsafe_base64 
        self.reset_password_token_sent_at = Time.now
        self.save!
    end 

    def password_token_valid?
        start_time = self.reset_password_token_sent_at
        end_time = Time.now
        !(TimeDifference.between(start_time, end_time).in_hours > 1.0)
    end 

    def reset_password(password)
        self.reset_password_token = ''
        self.password_digest = BCrypt::Password.create(password)
        self.save!
    end 
end
