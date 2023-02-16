

/*
* Marketing Consent Data
* For Submit Form
*
*/
export const marketingConsentData = {
  "Questions": [
    {
      "id": "permissionEmail",
      "text": "Email me",
      "name": "Email",
      "options": [
        {
          "label": "Email",
          "value": "yes",
          "name": "emailPermission"
        }
      ]
    },
    {
      "id": "permissionPost",
      "text": "Send me post",
      "name": "Post",
      "options": [
        {
          "label": "Post",
          "value": "yes",
          "name": "postPermission"
        }
      ]
    },
    {
      "id": "permissionPhone",
      "text": "Phone me",
      "name": "Phone",
      "options": [
        {
          "label": "Phone",
          "value": "yes",
          "name": "phonePermission",
          "hideFields": false,
          "extraInfo": "Please confirm the telephone number we will use to <b>phone</b> you on:"

        }
      ],
      "field": [
        {
          "id": "phoneNumber",
          "type": "tel",
          "name": "phone",
          "label": "Phone number",
          "placeholder": "",
          "required": true
        }
      ]
    },
    {
      "id": "permissionSMS",
      "text": "Text me",
      "name": "SMS",
      "options": [
        {
          "label": "Text",
          "value": "yes",
          "name": "smsPermission",
          "hideFields": false,
          "extraInfo": "Please confirm the mobile number we will use to <b>text</b> you on:"

        }
      ],
      "field": [
        {
          "id": "mobileNumber",
          "type": "tel",
          "name": "mobile",
          "label": "Mobile number",
          "placeholder": "",
          "required": true,
          "pattern": "^07[0-9]{9}$"
        }
      ]
    }
  ]
};
