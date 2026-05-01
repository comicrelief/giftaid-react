@sanity @nightly-sanity @successRedirect
Feature: Giftaid success page redirect

  Scenario: Accessing success page should redirect to giftaid homepage
    Given I navigate to the Giftaid success page
    Then I should be redirected to the Giftaid homepage
    And I should see the Giftaid heading
    And I should see the Giftaid option
    And I should see the mobile input field

