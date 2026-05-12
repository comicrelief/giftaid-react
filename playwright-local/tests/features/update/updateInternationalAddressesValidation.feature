@sanity @update-international-address-validation
Feature: International address validation on the update form

  Background:
    Given I am on the local Giftaid update page

  Scenario: Selecting a non-UK country and entering a non-UK postcode should submit the update form
    When I complete the local update supporter details
    And I enter the local postcode "30916-395"
    Then I should see the local postcode error message "Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below."
    When I click the local manual address link
    And I enter the local update international address details
    And I select a random local update non-UK country
    Then I should not see the local postcode error message
    When I select yes for the local update GiftAid declaration
    And I submit the local Giftaid form
    Then I should see the local thank you message containing "Thank you,"
