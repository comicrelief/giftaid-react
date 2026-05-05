@sanity @nightly-sanity @update-valid-submission
Feature: Valid Giftaid update submission

  # Step definitions for this feature are implemented in:
  # tests/step-definitions/update/giftaidUpdateCommon.steps.js
  Scenario: Valid giftaid update submission
    Given I am on the Giftaid update page
    When I complete the Giftaid update form with valid details
    And I select yes for GiftAid declaration
    And I submit the Giftaid update form
    Then I should see update thank you message
