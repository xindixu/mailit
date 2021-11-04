class Campaign < ApplicationRecord
    belongs_to :template, optional: true
    belongs_to :user, optional: true
end
