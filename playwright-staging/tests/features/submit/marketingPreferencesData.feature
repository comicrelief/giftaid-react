@sanity @nightly-sanity @marketing-preferences-data @contact-store
Feature: Giftaid marketing preferences contact-store verification

  Scenario: Verify giftaid marketing preferences data in contact-store
    Given I am on the Giftaid page
    And I select Giftaid
    When I populate the Giftaid form with generated supporter details
    And I select generated marketing preferences
    And I submit the Giftaid form
    Then I should see the generated supporter thank you message
    And the marketing preferences data should be stored in contact-store
