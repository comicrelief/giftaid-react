@valid-giftaid-submission
Feature: Valid Giftaid Submission

  Background:
    Given I am on the local Giftaid page
    And I select the local Giftaid option

  Scenario: Valid Giftaid Submission
    When I complete the local Giftaid form with valid details
    And I select the local marketing preferences
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"
