Feature: Create, send, delete campaign
    User should be able to create, send, and delete a campaign

    Background: user should be logged in
        Given user is on the Login page
        And user is logged in with email "testing@columbia.edu" and password "hello1"
        And user have all data ready

    Scenario: See a new campaign
        Given user is on the Campaigns page
        Then user can see the Create Campaign button

    Scenario: Create a new campaign
        Given user is on the Campaigns page
        When user updates the campaign name to "campaign1"
        And user add "emailtest" tag
        And user clicks the Create Campaign button
        Then user should be on the Dashboard page

    Scenario: Send a campaign
        Given user is on the Dashboard page
        When user clicks the "send" button for campaign "testcampaign"
        Then user should see "Email sent!"
    
    Scenario: Edit a campaign
        Given user is on the Dashboard page
        When user clicks the "testcampaign" campaign button
        Then user should be on CampaignShow like page
        When user updates the campaign name to "test2campaign"
        And user clicks the Save Campaign button
        Then user should be on the Dashboard page
        And user should see "test2campaign"
    
    Scenario: delete a campaign
        Given user is on the Dashboard page
        When user clicks the "delete" button for campaign "testcampaign"
        Then user should see "Campaign deleted!"
        And user should sign out
