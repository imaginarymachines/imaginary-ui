import { ILayout } from "../lib/Form";
import "./App.css";
import { ImaginaryForm } from "../lib/ImaginaryForm";

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
      options: [],
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
      options: [],
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
      options: [],
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
      options: [],
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
      options: [],
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

  return (
    <>
      <ImaginaryForm layout={layout} onSave={onSave} />
    </>
  );
}

export default App;
