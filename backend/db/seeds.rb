# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([{
                      name: 'Kenya Plenty',
                      password: 'hello1',
                      email: 'kgp2111@columbia.edu'
                    },
                     {
                       name: 'Jayshil Dave',
                       password: 'password',
                       email: 'jyd2111@columbia.edu'
                     }])

recipients = Recipient.create([{ email: 'xx2391@columbia.edu', tags: ['beauty'], user_id: users.last.id },
                               { email: 'qc2300@columbia.edu', tags: ['sports'], user_id: users.last.id },
                               { email: 'kgp2111@columbia.edu', tags: ['test'], user_id: users.first.id }])

templates = Template.create([{ markdown: 'Hi **Kenya**',
                               collaborator_ids: [users.last.id],
                               user_id: users.first.id,
                               name: 'basic' },
                             { markdown: 'Good day!',
                               collaborator_ids: [users.last.id],
                               user_id: users.first.id,
                               name: 'basic' }])

campaign = Campaign.create(name: 'Test', tags: ['test'], user_id: users.first.id, template_id: templates[0].id)
