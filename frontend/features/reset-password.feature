Feature: Reset password
    User should be able to reset password

    Scenario: Go to reset password page
        Given user is on the Login page
        When user clicks Forget Your Password?
        Then user should be on the Reset page

    Scenario: Submit an email
        Given user is on the Reset page
        When user updates email to "testreset@columbia.edu"
        And user clicks Submit for email
        Then user should see "Email for reset password was sent!"