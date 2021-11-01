Feature: Edit template
    User should be able to edit a template

    Scenario: See a template
        Given user is on the TemplateShow page
        Then user can see the template name and content

    Scenario: Edit a template
        Given user is on the TemplateShow page
        When user updates the template name to "Merry Christmas"
        Then user can see the template name to be "Merry Christmas"
