# Imaginary UI

Config-driven React UI.

Very beta.

Used [moishinetzer/PBandJ](https://github.com/moishinetzer/PBandJ)

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
