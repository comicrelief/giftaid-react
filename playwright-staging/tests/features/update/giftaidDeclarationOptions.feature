@sanity @update-declaration
Feature: Giftaid declaration claim selection

  Scenario: Validate Giftaid declaration claim selections
    Given I am on the Giftaid update page
    When I complete the Giftaid update form with valid details
    And I submit the Giftaid update form
    Then I should see the Giftaid declaration section

    When I select yes for GiftAid declaration
    Then yes option should be selected and no option should not be selected

    When I select no for GiftAid declaration
    Then no option should be selected and yes option should not be selected

    When I submit the Giftaid update form
    Then I should see the update no declaration message
