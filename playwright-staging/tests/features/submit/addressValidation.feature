@sanity @nightly-sanity @address-validation
Feature: Address validation

  Background:
    Given I am on the Giftaid page
    And I select Giftaid
    And I enter supporter details

  Scenario: Empty postcode should show error message
    When I clear the postcode field
    And I submit the Giftaid form
    Then I should see postcode error message "Please enter your postcode"

  Scenario Outline: Invalid postcodes should show error messages
    When I enter postcode "<postcode>"
    Then I should see postcode error message "<message>"

    Examples:
      | postcode     | message                                                                                  |
      | 12SE17TP     | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | comic relief | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | cro 7tp      | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |

  Scenario: Enter postcode but submit without selecting address should show error message
    When I enter postcode "SE1 7TP"
    And I search for the postcode
    Then I should see the address dropdown
    When I submit the Giftaid form
    Then I should see address select error message "Please select your address"

  Scenario: Clicking on manual address link should show address fields
    When I enter postcode "SE1 7TP"
    Then I should see the manual address link
    When I click the manual address link
    Then I should see the manual address fields

  Scenario: Invalid address fields should show error messages
    When I enter postcode "SE1 7TP"
    And I click the manual address link
    And I enter invalid address line 1
    Then I should see address line 1 error message
    When I enter invalid town
    Then I should see town error message
