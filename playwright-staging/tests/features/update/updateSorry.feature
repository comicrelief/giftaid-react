@sanity @nightly-sanity @update-sorry
Feature: Giftaid update sorry page

  Scenario: Accessing giftaid update sorry page should show the sorry message
    Given I navigate to the Giftaid update sorry page
    Then I should see the update sorry heading
    And I should see the update sorry message
