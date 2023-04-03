import Form, { ILayout } from "./Form";
import { Breadcrumbs, INavItem } from "./Navigation";
import useImaginaryForm, {
  IFormEvents,
  ImaginaryFormProvider,
} from "./useImaginaryForm";
import { TValuesObj } from "./utils";
import { FormFields } from "./Fields";
import { IGroup } from "../dist";

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
  formEvents = undefined,
}: {
  layout: ILayout;
  onSave: (values: TValuesObj) => void;
  withBreadcrumb?: boolean;
  components: FormFields;
  formEvents?: IFormEvents;
}) {
  return (
    <>
      <ImaginaryFormProvider
        layout={layout}
        onSave={onSave}
        formEvents={formEvents}
      >
        {withBreadcrumb ? <FormBreadCrumbs /> : null}
        <Form components={components} />
      </ImaginaryFormProvider>
    </>
  );
}
