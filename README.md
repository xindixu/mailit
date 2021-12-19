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
