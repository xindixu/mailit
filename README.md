# Mailit

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

### Setup client
1. Create a terminal window, `cd frontend`
2. Run `yarn install` to install all dependencies
3. Run `yarn start` to start the React server. Frontend application should be running at http://localhost:8080

## Project structure
1. Ruby on Rails API mode:
- All controllers are under Api/V1
- Only contains controllers and models

2. React:
- Fetching data via HTTP requests

## Testing
### User testing with cucumber.js
We use cucumber.js to test our frontend
1. When running cucumber tests, make sure both the frontend and the backend of the app is running!
2. Navigate to the /frontend folder
3. Required packages: `@cucumber/cucumber`, `selenium-webdriver`. Install them with `yarn install`
4. In your terminal, run `safaridriver --enable`. This will allow `selenium` to run cucumber tests on Safari
5. Run `yarn run cucumber` to run cucumber tests