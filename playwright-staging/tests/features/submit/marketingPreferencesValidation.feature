@sanity @nightly-sanity @marketing-preferences
Feature: Marketing preferences validation

  Background:
    Given I am on the Giftaid page
    And I select Giftaid
    And I complete the Giftaid form with valid details

  Scenario: Clicking marketing preference options should submit the Giftaid form
    When I select all marketing preference options
    And I enter valid marketing preference contact details
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message

  Scenario: Email marketing preference field validation
    When I select email marketing preference
    And I enter valid marketing preference email
    And I clear marketing preference email
    Then I should see marketing preference email error "Please fill in your email address"
    When I enter invalid marketing preference email "example@£$^&email.com"
    Then I should see marketing preference email error "Please fill in a valid email address"
    When I enter valid marketing preference email
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message

  Scenario: Phone marketing preference field validation
    When I select phone marketing preference
    And I enter valid marketing preference phone
    And I clear marketing preference phone
    Then I should see marketing preference phone error "Please fill in your phone number"
    When I enter invalid marketing preference phone "0208569424"
    Then I should see marketing preference phone error "Please fill in a valid UK phone number, with no spaces"
    When I enter valid marketing preference phone
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message
