@sanity @nightly-sanity
Feature: Giftaid submission

  Scenario: Valid Giftaid submission
    Given I am on the Giftaid page
    And I select the Giftaid option
    And I complete the Giftaid form with valid details
    And I select the marketing preferences
    When I submit the Giftaid form
    Then I should see the Giftaid thank you message

