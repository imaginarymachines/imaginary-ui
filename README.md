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

- @todo document

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
      <ImaginaryForm components={components} layout={layout} onSave={onSave} />
    </>
  );
}
};
```

## Changing Components

The `<ImaginaryUiProvider />` and `useImaginaryUi()` hooks provide components.
