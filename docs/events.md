# Events

## `validationFailed`

```jsx
const Form  = () => (
    <>
        <ImaginaryForm
            formEvents={{
                {
                    validationFailed: (errors: any) => {
                        console.log("validation failed", errors);
                }
            }}
            components={components}
            layout={layout}
            onSave={onSave}
        />
    </>
);
```

## `stepChanged`

```jsx
const Form  = () => (
    <>
        <ImaginaryForm
            formEvents={{
                {
                    stepChanged: (
                        step: number, group: IGroup) => {
                        console.log(step, group);
                    }
            }}
            components={components}
            layout={layout}
            onSave={onSave}
        />
    </>
);
```
