@sanity @update-form-validation
Feature: Giftaid update form validation

  Background:
    Given I am on the local Giftaid update page

  Scenario: Empty input fields should show error messages
    When I submit the local Giftaid form
    Then I should see the local update required field error messages
    When I click the local manual address link
    Then I should see the local update manual address required error messages
    And I should see the local update GiftAid declaration error message

  Scenario Outline: Invalid update first names should show an error message
    When I enter the local first name "<firstName>"
    Then I should see the local update first name error message "This field only accepts alphabetic characters and ' -"

    Examples:
      | firstName |
      | Test^$%£  |
      | 123Test   |
      | SPACE     |

  Scenario: A valid update first name should submit the form
    When I complete the local Giftaid update form with valid details
    And I select yes for the local update GiftAid declaration
    And I submit the local Giftaid form
    Then I should see the local thank you message containing "Thank you,"

  Scenario Outline: Invalid update last names should show an error message
    When I enter the local last name "<lastName>"
    Then I should see the local update last name error message "This field only accepts alphanumeric characters and , . ( ) / & ' -"

    Examples:
      | lastName |
      | Test^$%£ |
      | SPACE    |

  Scenario: An alphanumeric update last name should not show an error message
    When I enter the local last name "123Test"
    Then I should not see the local last name error message

  Scenario Outline: Invalid update emails should show an error message
    When I enter the local email "<email>"
    Then I should see the local update email error message "Please fill in a valid email address"

    Examples:
      | email                                             |
      | test@comic$relief.com                             |
      | test@c{(micrelief.com                             |
      | test@comic%relief.com                             |
      | Test0-9!#$%&'*+/=?^_{\|}~-@comicrelief_9-8.com.uk |

  Scenario: A valid special character email should not show an error message
    When I enter the local email "te$%^st@comicrelief.com"
    Then I should not see the local update email error message

  Scenario Outline: Update mobile number validation
    When I enter the local mobile number "<mobile>"
    Then I should see the local mobile error message "<message>"

    Examples:
      | mobile        | message                                                                                               |
      | 0722345678    | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0722345678900 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0722 345 6789 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0780ab5694245 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |

  Scenario Outline: Valid update mobile numbers should not show an error message
    When I enter the local mobile number "<mobile>"
    Then I should not see the local mobile error message

    Examples:
      | mobile      |
      | 07123456789 |
      | 07340707252 |

  Scenario Outline: Invalid update postcodes should show an error message
    When I enter the local postcode "<postcode>"
    Then I should see the local postcode error message "Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below."

    Examples:
      | postcode    |
      | S E 1 7 T P |
      | SE$%TP      |
      | cro 7tp     |

  Scenario Outline: Compact UK postcodes should not show a format error
    When I enter the local postcode "<postcode>"
    Then I should not see the local postcode error message

    Examples:
      | postcode |
      | se17tp   |
      | SE17TP   |

  Scenario: Entering a valid UK postcode on the update form using postcode lookup should submit the form
    When I complete the local update supporter details
    And I enter the local postcode "E1 8QS"
    And I search for the local postcode
    And I select the local update lookup address or enter the address manually
    And I select yes for the local update GiftAid declaration
    And I submit the local Giftaid form
    Then I should see the local thank you message containing "Thank you,"
