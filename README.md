# Imaginary UI

Config-driven React UI.

Very beta.

## Development

- Clone
  - `git clone ...`
- Install
  - `npm i`
- Start demo:
  - `npm run dev`
- Run tests
  - `npm run test`
  - Tests are for util functions.
  - Will use [storybook interactions](https://storybook.js.org/addons/@storybook/addon-interactions)
- Lint
  - `npm run lint`
- Format
  - `npm run format`
- Run Storybook
  - `npm run storybook`
  - Not yet.

## Layout Config Spec

### JSON

- @todo document

## ImaginaryForm

```jsx
import { ImaginaryForm } from "@imaginarymachines/ui";
const layout = {
  //@todo document
};
const Test = () => {
  const onSave = (data) => {
    console.log(data);
  };

  return (
    <>
      <ImaginaryForm layout={layout} onSave={onSave} />
    </>
  );
};
```

## Changing Components

The `<ImaginaryUiProvider />` and `useImaginaryUi()` hooks provide components.
