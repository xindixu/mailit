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

    def self.export
        attributes = %w{firstname lastname email}
        example_data = %w{Jane Doe jane.doe@example.com}
        CSV.generate(headers: true) do |csv|
            csv << attributes
            csv << example_data
        end 
    end 
end
