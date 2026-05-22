@international-address-validation
Feature: International address validation

  Background:
    Given I am on the local Giftaid page
    And I select the local Giftaid option
    And I enter the local supporter details

  Scenario: Selecting a non-UK country and entering a non-UK postcode should submit the form
    When I enter the local postcode "30916-395"
    Then I should see the local postcode error message "Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below."
    When I click the local manual address link
    And I enter the local international address details
    And I select a random local non-UK country
    Then I should not see the local postcode error message
    When I select the local marketing preferences
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"
