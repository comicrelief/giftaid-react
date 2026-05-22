@sanity @postcode-lookup
Feature: Postcode lookup validation

  Background:
    Given I am on the local Giftaid page
    And I select the local Giftaid option
    And I enter the local supporter details

  Scenario Outline: Postcode formatting errors should show validation message
    When I enter the local postcode "<postcode>"
    Then I should see the local postcode error message "<message>"

    Examples:
      | postcode  | message                                                                                               |
      | S E 1 7 T P | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | SE$%TP    | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |

  Scenario: Enter valid UK postcode using postcode lookup should submit the form
    When I enter the local postcode "SE1 7TP"
    And I search for the local postcode
    And I select the local lookup address or enter the address manually
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"
