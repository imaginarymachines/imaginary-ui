# Imaginary UI

Config-driven React UI.

https://github.com/imaginarymachines/imaginary-ui

Very beta.

Used [moishinetzer/PBandJ](https://github.com/moishinetzer/PBandJ)

## Install

- `npm i @imaginary-machines/imaginary-ui`

## Development

- Clone
  - `git clone https://github.com/imaginarymachines/imaginary-ui`
- Install
  - `npm i`
- Start demo:
  - `npm run dev`
- Run tests
  - `npm run test`
  - Tests are for util functions.
  - Will use [storybook interactions](https://storybook.js.org/addons/@storybook/addon-interactions)
- Build lib for release
  - `npm run build:lib`
- Run Lint
  - `npm run lint`
- Run Formatter
  - `npm run format`
- Run type checker
  - `npm run check`
- Run Storybook
  - `npm run storybook`
  - Not yet.

## Layout Config Spec

### JSON

- [Configuration](./docs/config.md)

## ImaginaryForm

```jsx
import { ImaginaryForm } from "@imaginarymachines/ui";
const layout = {
  //@todo document
};
const Test = () => {
  function App() {
    const onSave = (data: any) => {
      console.log(data);
    };
    const components: IImaginaryUiComponents = {
      InputArea: InputArea,
      SelectArea: SelectArea,
      FormButton: ({ text, onClick }) => (
        <button onClick={onClick}>{text}</button>
      ),
      SubmitButton: ({ text }) => <input type="submit" value={text} />,
    };

    return (
      <>
        <ImaginaryForm
          components={components}
          layout={layout}
          onSave={onSave}
        />
      </>
    );
  }
};
```

## Tailwind config

In the future, this will have a WordPress preset and a Tailwind preset.

Add `./node_modules/@imaginary-machines/imaginary-ui/dist/*.js',` to `content` in your tailwind.config

```js
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "..//other paths",
    "./node_modules/@imaginary-machines/imaginary-ui/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

## Changing Components

The `<ImaginaryUiProvider />` and `useImaginaryUi()` hooks provide components.

## Commit a Changeset

Once you have added your token to GitHub secrets, you need to commit a changeset. Generate your first changeset by running:

```sh
npx changeset
```

Then commit the changeset log to trigger the GitHub Action.

See [below](#-changesets) for more information on how to use changesets.

> Note: PBandJ has been configured assuming projects use the `main` branch as the default branch. If you use a different branch, you will need to change the `publish.yml` file in the `.github/workflows` folder to use your default branch. You will also need to change the `config.json` file in the `.changeset` folder to use your default branch.

### 5. Merge the Release PR

Once the GitHub Action has been triggered, it will create a PR that will publish your library to npm. Once the PR has been merged, your library will be published to npm!

> Note: Sometimes the GitHub Action can fail, this can be due to a number of reasons most likely it is to do with the name of your package. If this happens, change the name of your package in `package.json`, and either rerun the action or try again from step 4.
