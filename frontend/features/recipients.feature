Feature: Add and delete recipients
    User should be able to add and delete recipients

    Background: user should be logged in
        Given user is on the Login page
        And user is logged in with email "testing@columbia.edu" and password "hello1"
        And user have all data ready

    Scenario: Add a recipients
        Given user is on the RecipientsUpload page
        When user updates the recipient to "testrecipient@columbia.edu" "Bob" "Lee" "test"
        And user clicks the Submit button
        Then user should see "Recipient added!"

    Scenario: delete a recipients
        Given user is on the Recipients page
        When user clicks the delete button for recipient "qianjunc@gmail.com"
        Then user should see "Recipient deleted!"