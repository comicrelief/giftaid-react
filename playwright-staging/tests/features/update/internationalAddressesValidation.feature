@sanity @nightly-sanity @update-international-address
Feature: International address validation on update form

  Scenario: Selecting a non-UK country and entering a non-UK postcode should submit the update form
    Given I am on the Giftaid update page
    And I enter basic update supporter details
    When I enter update postcode "30916-395"
    Then I should see update postcode error message "Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below."
    When I enter update international address details manually
    And I select a non UK country on the update form
    Then update postcode error should disappear
    When I select yes for GiftAid declaration
    And I submit the Giftaid update form
    Then I should see update thank you message for "test"
