Feature: Edit template
    User should be able to edit a template

    Scenario: Edit a template
        Given user is on the Templates page
        When user updates the template name and content
        When user clicks save
        Then user should be redirected to the dashboard page