@address-validation
Feature: Address validation

  Background:
    Given I am on the local Giftaid page
    And I select the local Giftaid option
    And I enter the local supporter details

  Scenario: Empty postcode should show an error message
    When I clear the local postcode field
    And I submit the local Giftaid form
    Then I should see the local postcode error message "Please enter your postcode"

  Scenario Outline: Invalid postcodes should show error messages
    When I enter the local postcode "<postcode>"
    Then I should see the local postcode error message "<message>"

    Examples:
      | postcode     | message                                                                                               |
      | 12SE17TP     | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | comic relief | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | cro 7tp      | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |

  Scenario: Entering a postcode without selecting an address should show an error message
    When I enter the local postcode "E1 8QS"
    And I search for the local postcode
    Then I should see the local address dropdown
    When I submit the local Giftaid form
    Then I should see the local address select error message "Please select your address"

  Scenario: Clicking the manual address link should show the address fields
    When I enter the local postcode "E1 8QS"
    Then I should see the local manual address link
    When I click the local manual address link
    Then I should see the local manual address fields

  Scenario: Invalid address fields should show error messages
    When I enter the local postcode "E1 8QS"
    And I click the local manual address link
    And I enter the local invalid address line 1
    Then I should see the local address line 1 error message
    When I enter the local invalid town
    Then I should see the local town error message
