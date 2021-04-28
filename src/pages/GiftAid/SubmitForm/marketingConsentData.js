

/*
* Marketing Consent Data
* For Submit Form
*
*/
export const marketingConsentData = {
  Questions: [
    {
      id: 'permissionEmail',
      text: 'Email',
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
          hideFields: false
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
      text: 'Post',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionPost'
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionPost'
        }
      ]
    },
    {
      id: 'permissionPhone',
      text: 'Phone',
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
          hideFields: false
        }
      ],
      field: [
        {
          id: 'phone',
          type: 'tel',
          name: 'phone',
          label: 'Telephone number',
          placeholder: '01234 567890',
          required: true,
        }
      ]
    },
    {
      id: 'permissionSMS',
      text: 'SMS',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionSMS'
        },
        {
          label: 'No',
          value: 'no',
          name: 'permissionSMS'
                }
      ]
    }
  ]
};
