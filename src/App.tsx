import { ILayout } from "../lib/Form";
import "./App.css";
import { ImaginaryForm } from "../lib/ImaginaryForm";
import { FieldLabel, FormFields, Input, InputError, Select } from "../lib";

const layout: ILayout = {
  id: "vendor",
  label: "Vendor Info",
  groups: [
    {
      id: "vendor",
      label: "Vendor Info",
      order: 1,
      description: "The vendor information",
      link: "https://docs.trustedlogin.com/Client/configuration",
      fields: [
        "vendor.namespace",
        "vendor.title",
        "vendor.email",
        "vendor.website",
        "vendor.support_url",
      ],
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
      id: "vendor.namespace",
      name: "vendor.namespace",
      label: "Vendor Namespace",
      type: "text",
      fieldType: "input",
      defaultValue: undefined,
      description:
        "Slug for vendor. Must be unique. Must be shorter than 96 characters. Must not be a reserved namespace: trustedlogin, client, vendor, admin, wordpress.",
      required: true,
      rules: "lowercase|alpha_dash",
    },
    {
      id: "vendor.title",
      name: "vendor.title",
      label: "Title",
      type: "text",
      fieldType: "input",
      defaultValue: "Tunes",
      description:
        "Name of the vendor company. Used in text such as Visit the %s website",
      required: true,
    },
    {
      id: "vendor.email",
      name: "vendor.email",
      label: "Email",
      type: "email",
      fieldType: "input",
      defaultValue: undefined,
      link: "https://docs.trustedlogin.com/Client/configuration#email-hash",
      description:
        "Email address for support. Used when creating usernames. Recommended: use {hash} dynamic replacement ",
      required: true,
      rules: "email",
    },
    {
      id: "vendor.website",
      name: "vendor.website",
      label: "Website",
      type: "url",
      fieldType: "input",
      defaultValue: undefined,
      description:
        "URL to the vendor support page. Shown to users in the Grant Access form and also serves as a backup to redirect users if the TrustedLogin server is unreachable. Must be a valid URL.",
      required: true,
      rules: "url",
    },
    {
      id: "vendor.support_url",
      name: "vendor.support_url",
      label: "Support URL",
      type: "url",
      fieldType: "input",
      defaultValue: undefined,
      description: "",
      required: true,
      rules: "url",
    },
    {
      id: "role",
      name: "role",
      label: "Role",
      type: "select",
      defaultValue: "editor",
      description: "",
      fieldType: "select",
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
      rules: "in:editor,admin",
    },
  ],
};

function App() {
  const onSave = (data: any) => {
    console.log(data);
  };
  const components: FormFields = {
    Input: Input,
    Select: Select,
    fieldWrapperClassName: {
      className: "mt-4 w-full",
      descClassName: "mt-2 text-sm text-gray-500",
    },
    FieldLabel: FieldLabel,
    FieldError: InputError,
    Button: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
    SubmitButton: ({ text }) => <input type="submit" value={text} />,
  };

  return (
    <>
      <ImaginaryForm components={components} layout={layout} onSave={onSave} />
    </>
  );
}

export default App;
