class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness: true
    has_many :recipients
    has_many :templates
    has_many :campaigns
end
