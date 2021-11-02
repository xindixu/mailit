class Template < ApplicationRecord
    belongs_to :user, optional: true
    has_many :campaigns
end
