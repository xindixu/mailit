require 'csv'
class Recipient < ApplicationRecord
    belongs_to :user, optional: true

    def self.import(file, uid)
        CSV.foreach(file.path, headers:true) do |row|
            data = row.to_h
            data[:user_id] = uid
            Recipient.create(data)
        end 
    end 
end
