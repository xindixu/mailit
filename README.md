# Mailit

## Demo
### NOTE:
- Register an account or login before using any feature
- Can use this user: email: dev@mailit.com, pwd: zxcvbn12
- When attempting to upload recipients using CSV, you might need to refresh the page in order to get the request to be formatted properly.
- In order for views to be properly incremented for an email, you must view the email in a web browser.

**Template**
1. Create a template by clicking on the  “Create A Template” button on the `/` page or `/templates` page.
2. Fill in the Name and Markdown for the Template. Click “Create” button to create the template.
3. You should be redirected to the `/` page and see your newly created template.
4. Click the Name of the template to update it.
5. Click “Trash” icon to delete the template.

**Real-time Collaboration for Template Editing**
1. To add collaborators for a template, go to the template update page.
1. Search users by user emails to add collaborators one at a time. The email must be an exact match.
1. Log in as two users and land on the same template editing page.
1. You should be able to see others’ cursors in the editor with their names on it
1. Start typing and changes will be synced across users.
1. Known issue: when a new user joins the editor, the content gets duplicated. We are looking into this issue. 

**Predefined Templates & Analytics**
1. Click “Predefined templates” on the navigation bar. 
1. Choose the template that you want. 
1. Edit it and save your own copy.
1. The analytics about predefined templates are shown on the predefined templates when there is data.

**Create A Campaign**
1. Create a campaign by clicking the “Campaigns” on the sidebar.
1. Choose a template on the left side.
1. Download the CSV template by pressing the link at the bottom of the page.
1. Follow the example in the CSV template and put in first name, last name, email address, and tags for all the recipients. Tags are separated by “|”.
1. Fill in the name and subject and add tags for this campaign. Tags are required. Make sure the target recipients and the campaign have the same tags 
1. Click the “Create Campaign” button at the bottom. 

**Recipients** 
1. Navigate to the Recipients page.
1. Click “Upload Recipients”.
1. Manually create a single recipient by filling in the fields on the right side of the page. Tags are required.
1. Create bulk recipients by uploading a csv with the following headers: firstname,lastname,email,tags. If you want more than one tag, you must separate them with “|” (ie test|beauty).
1. Navigate back to the Recipients page and see all your recipients.
1. Click the “Delete” button to delete any recipient.

**Edit A Campaign**
1. On the Dashboard page, choose a campaign by clicking the name. 
1. Choose a template on the left side.
1. You can also add recipients to your campaign using a CSV like the one mentioned in Recipients 4. Download the CSV template by pressing the link at the bottom of the page, to get access to it. 
1. Fill in the name and subject and add tags for this campaign. Tags are required. Make sure the target recipients and the campaign are having the same tag. 
1. Click the “Save Campaign” button at the bottom. 

**Campaign Analytics**
1. On the Dashboard page, click the “analytics” button for the campaign you want. 

**Reset User Password** 
1. Go to your login page and click “Forget your password?”.
1. Input your email address and submit.
1. Check your mailbox and follow the link.
1. Input your new password.


## Set up your dev env
### Prereq
1. Installed Postgres, Ruby, Rails, Node, NPM/Yarn
2. Postgres is running
   
### Setup server
1. Create a terminal window, `cd backend`
2. Run `bundle` to install all dependencies
3. Run `rake db:create` to create databases
4. Run `bin/rails db:migrate` to sync up database
5. Run `rails server` to start the Rails server. Backend application should be running at http://127.0.0.1:3000
6. Seed your db: `rails db:seed`
7. Reset your db: `rake db:drop db:create db:migrate`

### Setup environment secrets
1. Run `bundle exec figaro install`
2. Navigate to `/config/application.yml`
3. Add the following to the file:
```
development:
   frontend_url: "http://localhost:8080"
   backend_url:  "http://localhost:3000"

production:
   frontend_url: "https://mailit-app.herokuapp.com"
   backend_url:  "https://mailit-api.herokuapp.com"

test:
   frontend_url: "http://localhost:8080"
   backend_url: "http://localhost:3000"
```

### Setup client
1. Create a terminal window, `cd frontend`
2. Run `yarn install` to install all dependencies
3. Run `yarn start` to start the React server. Frontend application should be running at http://localhost:8080
4. Create an `.env` file in `/frontend` contains:
```
ESLINT_NO_DEV_ERRORS=true
REACT_APP_BASE_URL=http://localhost:3000
```

## Project structure
1. Ruby on Rails API mode:
- All controllers are under Api/V1
- Only contains controllers and models

2. React:
- Fetching data via HTTP requests

## Testing
### User testing with cucumber.js
We use cucumber.js to test our frontend. Make sure you have the Firefox browser installed
1. When running cucumber tests, make sure both the frontend and the backend of the app is running!
2. Required packages: `@cucumber/cucumber`, `selenium-webdriver`. Install them with `yarn install` 
3. Create two terminal windows and navigate to the /frontend folder
4. In one terminal, run `./geckodriver`. This will run the Firefox test window
5. In the other terminal:
6. Run `yarn run cucumber` to run cucumber tests
7. Run `yarn run coverage` to generate cucumber coverage report

### RSpec Tests
1. `cd backend`
2. `bundle exec rspec spec`

## Deploy
We choose to deploy the frontend and the backend separately
### Deploy the backend
1. `cd backend`
3. `git push heroku main`
5. `heroku run rake db:migrate`
6. `heroku run rake db:seed`

### Deploy the frontend
1. `cd frontend`
2. `git push heroku-frontend main`


