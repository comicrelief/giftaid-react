@sanity @update-success-redirect
Feature: Giftaid update success page redirect

  Scenario: Accessing success page should redirect to giftaid update homepage
    Given I navigate to the Giftaid update success page
    Then I should be redirected to the Giftaid homepage

