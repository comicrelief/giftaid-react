@sanity @form-validation
Feature: Form validation

  Background:
    Given I am on the local Giftaid page
    And I select the local Giftaid option

  Scenario Outline: Invalid mobile numbers should show an error message
    When I enter the local mobile number "<mobile>"
    Then I should see the local mobile error message "Please enter a valid mobile phone number - it must be the same number associated with your donation."

    Examples:
      | mobile        |
      | 0712345678    |
      | 0712345678900 |
      | 0712 345 6789 |
      | 0780ab5694245 |

  Scenario: Valid mobile number should submit the form
    When I complete the local Giftaid form with valid details
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, test!"

  Scenario Outline: Invalid first names should show an error message
    When I enter the local first name "<firstName>"
    Then I should see the local first name error message "This field only accepts 25 alphabetic characters and ' - starting with alphabetic characters"

    Examples:
      | firstName |
      | Test^$%£  |
      | SPACE     |
      | 123Test   |

  Scenario: Valid first name should submit the form
    When I complete the local Giftaid form with the first name "testFirstname"
    And I submit the local Giftaid form
    Then I should see the local thank you message "Thank you, testFirstname!"

  Scenario Outline: Invalid last names should show an error message
    When I enter the local last name "<lastName>"
    Then I should see the local last name error message "This field only accepts 25 alphanumeric characters and , . ( ) / & ' - starting with alphanumeric characters"

    Examples:
      | lastName |
      | Test^$%£ |
      | SPACE    |

  Scenario: Alphanumeric last name should not show an error message
    When I enter the local last name "123Test"
    Then I should not see the local last name error message

  Scenario: Valid last name should submit the form
    When I complete the local Giftaid form with valid details
    And I submit the local Giftaid form
    Then I should see the local thank you message containing "Thank you,"
