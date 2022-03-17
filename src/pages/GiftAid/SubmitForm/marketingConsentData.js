

/*
* Marketing Consent Data
* For Submit Form
*
*/
export const marketingConsentData = {
  Questions: [
    {
      id: 'permissionEmail',
      text: "Email me",
      name: "Email",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionEmail',
          hideFields: false
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionEmail',
          hideFields: false,
          extraInfo : "Please provide your email so we can remove it from our database, otherwise untick this option."

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
      id: 'permissionPost',
      text: "Send me post",
      name: "Post",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionPost',
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionPost',
          extraInfo : "This will remove your provided address from our database if you have opted-in before."
        }
      ]
    },
    {
      id: 'permissionPhone',
      text: 'Phone me',
      name: "Phone",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionPhone',
          hideFields: false
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionPhone',
          hideFields: false,
          extraInfo : "Please provide your telephone number so we can remove it from our database, otherwise untick this option."
        }
      ],
      field: [
        {
          id: 'phone',
          type: 'tel',
          name: 'phone',
          label: 'Telephone number',
          placeholder: 'Telephone number',
          required: true,
        }
      ]
    },
    {
      id: 'permissionSMS',
      text: 'Text me',
      name: "SMS",
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionSMS',
          hideFields: true
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionSMS',
          hideFields: true,
          extraInfo : "This will remove your provided mobile number from our database if you have opted-in before."
        }
      ],
    }
  ]
};
