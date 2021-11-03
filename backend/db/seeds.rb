# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

MIDTERM_TEMPLATE = <<~MIDTERM
  Dear {{first_name}}:

  I hope that you can take a moment to rest as midterm season continues. Taking five minutes to stretch, breathe or get up for a short walk can make a big difference. Try setting a reminder or alarm on your phone and have a plan in place for what to do with your time to yourself.#{' '}

  One common method that you might find helpful is the Pomodoro Method. You can use whatever segments of time work best for you, but this image will help you to understand the basic concept.


  ![](https://communications.universitylife.columbia.edu/sites/default/files/civicrm/persist/contribute/images/uploads/static/POMODORO_GRAPHIC_2048x2048_10cc11c5bccfb8239585cd8d58ed7acb.jpg)
MIDTERM

PRODUCT_LAUNCH_TEMPLATE = <<~PRODUCT
  Hi {{first_name}},

  I hope you’re having a wonderful day!

  I am emailing you today to let you know we have opened doors to our **Mailit**!

  [To learn more abut the product](https://www.linkedin.com/feed/).

  Make sure you buy it before **Dec. 31, 2021**

  If you have any questions about the product, please respond to this email or use the live chat on the product page. Our staff is waiting to respond to you.

  ![](https://www.launch-marketing.com/wp-content/uploads/2018/07/GettyImages-1134023751.jpg)

  Thank you,
  {{sender}}
PRODUCT

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
                               name: 'Basic' },
                             { markdown: MIDTERM_TEMPLATE,
                               collaborator_ids: [users.last.id],
                               user_id: users.first.id,
                               name: 'Midterm' },
                             { markdown: PRODUCT_LAUNCH_TEMPLATE,
                               collaborator_ids: [users.last.id],
                               user_id: users.first.id,
                               name: 'Product Launch' }])

campaign = Campaign.create(name: 'Test', tags: ['test'], user_id: users.first.id, template_id: templates[0].id)
