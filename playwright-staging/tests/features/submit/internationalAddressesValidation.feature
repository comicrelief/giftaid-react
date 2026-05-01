@sanity @nightly-sanity @international
Feature: International address validation

Scenario: Selecting a non-UK country and entering a non-UK postcode should submit the form
Given I am on the Giftaid page
And I select Giftaid
And I enter supporter details
When I enter a non UK postcode
Then I should see postcode validation error for UK format
When I enter international address details manually
And I select a non UK country
Then postcode error should disappear
When I select marketing preferences
And I submit the Giftaid form
Then I should see the Giftaid thank you message
