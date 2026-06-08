@sanity @marketing-preferences-data
Feature: Giftaid marketing preferences contact-store verification

  Scenario: Verify giftaid marketing preferences data in contact-store
    Given I am on the Giftaid page
    And I select the Giftaid option
    When I populate the Giftaid form with the supporter details
    And I select the marketing preferences
    And I submit the Giftaid form
    Then I should see the supporter thank you message
    And the marketing preferences data should be stored in the contact-store
