@sanity @marketing-preferences-validation
Feature: Marketing preferences validation

  Background:
    Given I am on the local Giftaid page
    And I select the local Giftaid option
    And I complete the local Giftaid form with valid details

  Scenario: Clicking marketing preference options should submit the Giftaid form
    When I select all the local marketing preference options
    And I enter the local marketing email
    And I enter the local marketing phone
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"

  Scenario: The email marketing preference field should show validation errors
    When I select the local email marketing preference
    And I enter the local marketing email
    And I clear the local marketing email
    Then I should see the local marketing email error message "Please fill in your email address"
    When I enter an invalid local marketing email "example@£$^&email.com"
    Then I should see the local marketing email error message "Please fill in a valid email address"
    When I enter the local marketing email
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"

  Scenario: The phone marketing preference field should show validation errors
    When I select the local phone marketing preference
    And I enter the local marketing phone
    And I clear the local marketing phone
    Then I should see the local marketing phone error message "Please fill in your phone number"
    When I enter an invalid local marketing phone "0208569424"
    Then I should see the local marketing phone error message "Please fill in a valid UK phone number, with no spaces"
    When I enter the local marketing phone
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"
