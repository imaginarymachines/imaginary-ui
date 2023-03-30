import Form, { ILayout } from "./Form";
import { IImaginaryUiComponents, ImaginaryUiProvider } from "./useImaginaryUi";
import { Breadcrumbs, INavItem } from "./Navigation";
import useImaginaryForm, { ImaginaryFormProvider } from "./useImaginaryForm";
import { TValuesObj } from "./utils";

const FormBreadCrumbs = () => {
  const { groupNav, goToStep } = useImaginaryForm();
  return (
    <>
      <Breadcrumbs
        links={groupNav}
        onClick={(item: INavItem) => {
          goToStep(parseInt(item.id, 10));
        }}
      />
    </>
  );
};
export function ImaginaryForm({
  layout,
  onSave,
  withBreadcrumb = false,
  components,
}: {
  layout: ILayout;
  onSave: (values: TValuesObj) => void;
  withBreadcrumb?: boolean;
  components: IImaginaryUiComponents;
}) {
  return (
    <ImaginaryUiProvider {...components}>
      <ImaginaryFormProvider layout={layout} onSave={onSave}>
        {withBreadcrumb ? <FormBreadCrumbs /> : null}
        <Form />
      </ImaginaryFormProvider>
    </ImaginaryUiProvider>
  );
}
