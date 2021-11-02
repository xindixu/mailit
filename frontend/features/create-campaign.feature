Feature: Create campaign
    User should be able to create a feature

    Scenario: See a new campaign
        Given user is on the Campaigns page
        Then user can see the Create Campaign button

    Scenario: Create a new campaign
        Given user is on the Campaigns page
        When user updates the campaign name to "campaign1"
        And user add "email" tag
        And user updates the campaign recipient 1 to "Amy" "Li" "amyli@gmail.com"
        And user updates the campaign recipient 2 to "Bob" "Chen" "bobchen@gmail.com"
        And user updates the campaign recipient 3 to "Tom" "An" "toman@gmail.com"
        And user click the Create Campaign button
        Then user should be on the Dashboard page
        