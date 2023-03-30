import Form, { ILayout } from "./Form";
import { Breadcrumbs, INavItem } from "./Navigation";
import useImaginaryForm, { ImaginaryFormProvider } from "./useImaginaryForm";
import { TValuesObj } from "./utils";
import { FormFields } from "./Fields";

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
  components: FormFields;
}) {
  return (
    <>
      <ImaginaryFormProvider layout={layout} onSave={onSave}>
        {withBreadcrumb ? <FormBreadCrumbs /> : null}
        <Form components={components} />
      </ImaginaryFormProvider>
    </>
  );
}
