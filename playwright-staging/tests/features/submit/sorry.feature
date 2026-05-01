@sanity @nightly-sanity @sorry
Feature: Giftaid sorry page

Scenario: Accessing giftaid sorry page should show the sorry message
Given I navigate to the Giftaid sorry page
Then I should see the sorry heading
And I should see the sorry message paragraph
