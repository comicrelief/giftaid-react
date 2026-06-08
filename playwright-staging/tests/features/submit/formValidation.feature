@sanity @form-validation
Feature: Giftaid form validation

  Background:
    Given I am on the Giftaid page
    And I select the Giftaid option

  Scenario Outline: Invalid mobile numbers should show an error message
    When I enter the mobile number "<mobile>"
    Then I should see the mobile error message "<message>"

    Examples:
      | mobile        | message                                                                                               |
      | 0712345678    | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0712345678900 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0712 345 6789 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0780ab5694245 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |

  Scenario: A valid mobile number should submit the form
    When I complete the Giftaid form with the mobile number "07123456789"
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message

  Scenario Outline: Invalid first name values should show an error message
    When I enter the first name "<firstName>"
    Then I should see the first name error message "<message>"

    Examples:
      | firstName | message                                                                                                  |
      | Test^$%£  | This field only accepts 25 alphabetic characters and ' - starting with alphabetic characters             |
      | SPACE     | This field only accepts 25 alphabetic characters and ' - starting with alphabetic characters             |
      | 123Test   | This field only accepts 25 alphabetic characters and ' - starting with alphabetic characters             |

  Scenario: A valid first name should submit the form
    When I complete the Giftaid form with the first name "testFirstname"
    And I submit the Giftaid form
    Then I should see the thank you message for "testFirstname"

  Scenario Outline: Invalid last name values should show an error message
    When I enter the last name "<lastName>"
    Then I should see the last name error message "<message>"

    Examples:
      | lastName | message                                                                                                                 |
      | Test^$%£ | This field only accepts 25 alphanumeric characters and , . ( ) / & ' - starting with alphanumeric characters           |
      | SPACE    | This field only accepts 25 alphanumeric characters and , . ( ) / & ' - starting with alphanumeric characters           |

  Scenario: An alphanumeric last name should not show an error message
    When I enter the last name "123Test"
    Then I should not see the last name error message

  Scenario: A valid last name should submit the form
    When I complete the Giftaid form with valid details
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message
