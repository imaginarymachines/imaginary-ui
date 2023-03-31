# Config File

```js
const layout = {
  id: "user",
  //Form label
  label: "User",
  //Sections of form
  groups: [
    {
      id: "info",
      //section label
      label: "User Info",
      order: 1,
      description: "The users information",
      link: "https://docs.something.com",
      //Names of fields in group
      //Must match id of field in fields
      fields: ["first_name", "email"],
    },
    {
      id: "roles",
      label: "Roles",
      order: 2,
      fields: ["role"],
    },
  ],
  fields: [
    {
      //id and name should be the same
      id: "first_name",
      name: "first_name",
      label: "First Name",
      //HTML5 type for input
      type: "text",
      //input|select
      fieldType: "input",
      defaultValue: undefined,
      //Default is false
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      fieldType: "input",
      defaultValue: undefined,
      link: "https://docs.trustedlogin.com/Client/configuration#email-hash",
      description: undefined,
      required: true,
      //Laravel-like rules
      rules: "email",
    },
    {
      id: "role",
      name: "role",
      label: "Role",
      type: "select",
      defaultValue: "editor",
      description: "",
      //input|select
      fieldType: "select",
      //Options for a select field
      options: [
        {
          value: "editor",
          label: "Editor",
        },
        {
          value: "admin",
          label: "Administrator",
        },
      ],
      required: true,
      //seperate rules with |
      rules: "in:editor,admin|lowercase",
    },
  ],
};
```
