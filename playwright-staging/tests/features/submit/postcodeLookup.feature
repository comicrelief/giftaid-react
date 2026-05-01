@sanity @nightly-sanity @postcode
Feature: Postcode validation

  Background:
    Given I am on the Giftaid page
    And I select Giftaid
    And I enter supporter details

  Scenario Outline: Invalid postcode formatting should show error message
    When I enter postcode "<postcode>"
    Then I should see postcode error message "<message>"

    Examples:
      | postcode    | message                                                                                  |
      | S E 1 7 T P | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | SE$%TP      | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |

  Scenario: Valid UK postcode using postcode lookup should submit the form
    When I enter postcode "SE1 7TP"
    And I search for the postcode
    And I select address from lookup or enter address manually
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message with line break
