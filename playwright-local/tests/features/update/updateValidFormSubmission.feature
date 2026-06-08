@update-valid-form-submission
Feature: Valid Giftaid update submission

  Background:
    Given I am on the local Giftaid update page

  Scenario: Valid Giftaid update submission
    When I complete the local Giftaid update form with valid details
    And I select yes for the local update GiftAid declaration
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"
