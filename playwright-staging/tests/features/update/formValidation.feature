@sanity @nightly-sanity @update-form-validation
Feature: Giftaid update form validation

  Background:
    Given I am on the Giftaid update page

  Scenario: Empty input fields should show error messages
    When I submit the Giftaid update form
    Then I should see the required update form error messages

  Scenario Outline: Invalid first name values should show error message on update form
    When I enter the update first name "<firstName>"
    Then I should see the update first name error message "<message>"

    Examples:
      | firstName | message                                           |
      | Test^$%£  | This field only accepts alphabetic characters and ' - |
      | SPACE     | This field only accepts alphabetic characters and ' - |
      | 123Test   | This field only accepts alphabetic characters and ' - |

  Scenario: Valid first name should submit update form
    When I complete the Giftaid update form with first name "John"
    And I select yes for GiftAid declaration
    And I submit the Giftaid update form
    Then I should see update thank you message for "John"

  Scenario Outline: Invalid email values should show error message on update form
    When I enter the update email "<email>"
    Then I should see the update email error message "<message>"

    Examples:
      | email                                              | message                              |
      | test@comic$relief.com                              | Please fill in a valid email address |
      | test@c{(micrelief.com                              | Please fill in a valid email address |
      | test@comic%relief.com                              | Please fill in a valid email address |
      | Test0-9!#$%&'*+/=?^_{\|}~-@comicrelief_9-8.com.uk  | Please fill in a valid email address |

  Scenario: Valid email should submit update form with no declaration
    When I complete the Giftaid update form with the email
    And I select no for GiftAid declaration
    And I submit the Giftaid update form
    Then I should see update no declaration message

  Scenario Outline: Invalid mobile numbers should show error message on update form
    When I enter the update mobile number "<mobile>"
    Then I should see the update mobile error message "<message>"

    Examples:
      | mobile        | message                                                                                 |
      | 0722345678    | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0722345678900 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0722 345 6789 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |
      | 0780ab5694245 | Please enter a valid mobile phone number - it must be the same number associated with your donation. |

  Scenario Outline: Valid mobile numbers should not show error message on update form
    When I enter the update mobile number "<mobile>"
    Then I should not see the update mobile error message

    Examples:
      | mobile      |
      | 07123456789 |
      | 07340707252 |

  Scenario: Valid mobile number should submit update form
    When I complete the Giftaid update form with the mobile and last name "test"
    And I select yes for GiftAid declaration
    And I submit the Giftaid update form
    Then I should see update thank you message for " test"

  Scenario Outline: Invalid postcode values should show error message on update form
    When I enter update postcode "<postcode>"
    Then I should see update postcode error message "<message>"

    Examples:
      | postcode    | message                                                                                  |
      | S E 1 7 T P | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | SE$%TP      | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |
      | cro 7tp     | Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below. |

  Scenario: Valid postcode should submit update form
    When I enter update postcode "SE1 7TP"
    And I search for the update postcode
    And I select the update address from lookup or enter address manually
    And I complete the remaining update form fields
    And I select yes for GiftAid declaration
    And I submit the Giftaid update form
    Then I should see update thank you message for " test"
