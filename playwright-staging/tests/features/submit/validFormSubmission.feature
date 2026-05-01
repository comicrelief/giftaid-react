@sanity @nightly-sanity
Feature: Giftaid submission

  Scenario: Submit Giftaid form with valid details
    Given I am on the Giftaid page
    When I select Giftaid
    And I complete the Giftaid form with valid details
    And I select marketing preferences
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message

