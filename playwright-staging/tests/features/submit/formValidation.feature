@sanity @nightly-sanity @form-validation
Feature: Giftaid form validation

  Background:
    Given I am on the Giftaid page
    And I select Giftaid

  Scenario Outline: Invalid mobile numbers should show error message
    When I enter mobile number "<mobile>"
    Then I should see mobile error message "<message>"

    Examples:
      | mobile        | message                                                                                     |
      | 0712345678    | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0712345678900 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0712 345 6789 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0780ab5694245 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |

  Scenario: Valid mobile number should submit the form
    When I complete the Giftaid form with mobile number "07123456789"
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message

  Scenario Outline: Invalid first name values should show error message
    When I enter first name "<firstName>"
    Then I should see first name error message "<message>"

    Examples:
      | firstName | message                                                                            |
      | Test^$%£  | This field only accepts 25 alphabetic characters and ' - starting with alphabetic characters |
      | SPACE     | This field only accepts 25 alphabetic characters and ' - starting with alphabetic characters |
      | 123Test   | This field only accepts 25 alphabetic characters and ' - starting with alphabetic characters |

  Scenario: Valid first name should submit the form
    When I complete the Giftaid form with first name "testFirstname"
    And I submit the Giftaid form
    Then I should see thank you message for "testFirstname"

  Scenario Outline: Invalid last name values should show error message
    When I enter last name "<lastName>"
    Then I should see last name error message "<message>"

    Examples:
      | lastName | message                                                                                       |
      | Test^$%£ | This field only accepts 25 alphanumeric characters and , . ( ) / & ' - starting with alphanumeric characters |
      | SPACE    | This field only accepts 25 alphanumeric characters and , . ( ) / & ' - starting with alphanumeric characters |

  Scenario: Alphanumeric last name should not show error message
    When I enter last name "123Test"
    Then I should not see last name error message

  Scenario: Valid last name should submit the form
    When I complete the Giftaid form with valid details
    And I submit the Giftaid form
    Then I should see the Giftaid thank you message
