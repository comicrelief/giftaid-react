@sanity @nightly-sanity @address-validation
Feature: Address validation

  Background:
    Given I am on the Giftaid page
    And I select the Giftaid option
    And I enter the supporter details

  Scenario: Empty postcode should show an error message
    When I enter the postcode "E1 8QS"
    And I clear the postcode field
    And I submit the Giftaid form
    Then I should see the postcode error message "Please enter your postcode"

  Scenario Outline: Invalid postcodes should show error messages
    When I enter the postcode "<postcode>"
    Then I should see the postcode error message "<message>"

    Examples:
      | postcode     | message                                                                                               |
      | 12SE17TP     | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | comic relief | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | cro 7tp      | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |

  Scenario: Entering a postcode without selecting an address should show an error message
    When I enter the postcode "E1 8QS"
    And I search for the postcode
    Then I should see the address dropdown
    When I submit the Giftaid form
    Then I should see the address select error message "Please select your address"

  Scenario: Clicking the manual address link should show the address fields
    When I enter the postcode "E1 8QS"
    Then I should see the manual address link
    When I click the manual address link
    Then I should see the manual address fields

  Scenario: Invalid address fields should show error messages
    When I enter the postcode "E1 8QS"
    And I click the manual address link
    And I enter an invalid address line 1
    Then I should see the address line 1 error message
    When I enter an invalid town
    Then I should see the town error message
