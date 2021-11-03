Feature: Template
    User should be able to CRUD a template

    Scenario: Create a template
        Given user is on the TemplateIndex page
        When user clicks the "Create A Template" button
        When user updates the template name to "Merry Christmas"
        Then user can see the template name to be "Merry Christmas"
        When user updates the template content to "Wish you a Merry Christmas"
        When user clicks the "Update" button
        Then user should be on the Dashboard page

    Scenario: See a template
        Given user is on the TemplateIndex page
        When user clicks the "Merry Christmas" button
        Then user should be on TemplateShow like page
        And user can see the template name and content

    Scenario: Edit a template
        Given user is on the TemplateIndex page
        When user clicks the "Merry Christmas" button
        Then user should be on TemplateShow like page
        When user updates the template name to "Happy New Year"
        Then user can see the template name to be "Happy New Year"
        When user clicks the "Update" button
        Then user should be on the Dashboard page

    Scenario: Delete a template
        Given user is on the TemplateIndex page
        When user deletes "Happy New Year"