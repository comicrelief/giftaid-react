

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
          "name": "emailPermission",
          "hideFields": false,
          "extraInfo": "Please confirm the email address we will use to <b>email</b> you:"
        }
      ],
      field: [
        {
          id: 'emailAddress',
          type: 'email',
          name: 'email',
          label: 'Email address',
          placeholder: 'example@email.com',
          required: true,
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
      "id": "permissionSMS",
      "text": "Text me",
      "name": "SMS",
      "options": [
        {
          "label": "Text",
          "value": "yes",
          "name": "smsPermission",
          "hideFields": true
        }
      ]
    },
  ]
};
