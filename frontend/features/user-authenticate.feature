Feature: User authentication
    User should be able to register for a new account and login

    Scenario: Register for a new account
        Given user is on the Register page
        When user fill in the email to "random@columbia.edu"
        And user fill in the password to "hello1"
        And user fill in the username to "user1"
        And user clicks the register button
        Then user should be on the Dashboard page
        And user can see Sign Out button

    Scenario: Login with an existing account
        Given user is on the Login page
        When user fill in the email to "kgp2111@columbia.edu"
        And user fill in the password to "hello1"
        And user clicks the login button
        Then user should be on the Dashboard page
        And user can see Sign Out button

    Scenario: Sign out when logged in
        Given user is logged in with email "kgp2111@columbia.edu" and password "hello1"
        When user clicks the sign out button
        Then user should be on the Login page