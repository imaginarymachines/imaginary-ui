import { ILayout } from "../lib/Form";
import "./App.css";
import { ImaginaryForm } from "../lib/ImaginaryForm";
import { FieldLabel, FormFields, Input, InputError, Select } from "../lib";

const layout: ILayout = {
  id: "vendor",
  label: "Vendor Info",
  groups: [
    {
      id: "Your info",
      label: "Vendor Info",
      order: 1,
      description: "The vendor information",
      link: "https://docs.trustedlogin.com/Client/configuration",
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
      id: "first_name",
      name: "first_name",
      label: "First Name",
      type: "text",
      fieldType: "input",
      defaultValue: undefined,
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
      rules: "email",
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
    FormButtonWrap: ({ children }) => (
      <div className="flex justify-end mt-4">{children}</div>
    ),
  };

  return (
    <>
      <ImaginaryForm components={components} layout={layout} onSave={onSave} />
    </>
  );
}

export default App;
