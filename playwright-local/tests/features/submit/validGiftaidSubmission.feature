@sanity @valid-giftaid-submission
Feature: Valid Giftaid submission

  Background:
    Given I am on the local Giftaid page
    And I select the local Giftaid option

  Scenario: Valid Giftaid submission
    When I complete the local Giftaid form with valid details
    And I select the local marketing preferences
    And I submit the local Giftaid form and wait for the navigation
    Then I should see the local thank you message containing "Thank you,"
