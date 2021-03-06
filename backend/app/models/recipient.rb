require 'csv'
class Recipient < ApplicationRecord
    belongs_to :user, optional: true
    validates :email, format: { with: /\A(\S+)@(.+)\.(\S+)\z/ } 

    def self.import(file, uid)
        CSV.foreach(file.path, headers:true) do |row|
            data = row.to_h
            final_tags = data['tags'].split('|')
            data["tags"] = final_tags
            data["user_id"] = uid
            begin
                Recipient.create!(data) 
            rescue 
                print("Something has gone wrong!")
            end 
        end 
    end 

    def self.export
        attributes = %w{firstname lastname email tags}
        example_data = {firsname: 'Jane', lastname: 'Doe', email: 'jane.doe@example.com', tags: ['test', 'random'].join('|')}

        CSV.generate(headers: true) do |csv|
            csv << attributes
            csv.add_row(example_data.values)
        end 
    end 
end
