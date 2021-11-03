Feature: Create, send, delete campaign
    User should be able to create, send, and delete a campaign

    Scenario: See a new campaign
        Given user is on the Campaigns page
        Then user can see the Create Campaign button

    Scenario: Create a new campaign
        Given user is on the Campaigns page
        When user updates the campaign name to "campaign1"
        And user add "emailtest" tag
        And user updates the campaign recipient 1 to "Amy" "Li" "qianjunc@gmail.com"
        And user updates the campaign recipient 2 to "Bob" "Chen" "holeking2016@gmail.com"
        And user click the Create Campaign button
        Then user should be on the Dashboard page

    Scenario: Send a campaign
        Given user is on the Dashboard page
        When user clicks the "send" button for campaign "testcampaign"
        Then user should see "Email sent!"
    
    Scenario: delete a campaign
        Given user is on the Dashboard page
        When user clicks the "delete" button for campaign "testcampaign"
        Then user should see "Campaign deleted!"