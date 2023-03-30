import Form, { ILayout } from "./Form";
import { Breadcrumbs, INavItem } from "./Navigation";
import useImaginaryForm, { ImaginaryFormProvider } from "./useImaginaryForm";
import { TValuesObj } from "./utils";

const FormBreadCrumbs = () => {
  const { groupNav, goToStep } = useImaginaryForm();

  return (
    <>
      <Breadcrumbs links={groupNav} onClick={(item:INavItem) => {
        goToStep(parseInt(item.id,10));
      }} />
    </>
 )
}
export default function ImaginaryForm({layout,onSave}:{
    layout:ILayout,
    onSave: (values: TValuesObj) => void,
}) {

    return (
        <>
          <ImaginaryFormProvider layout={layout} onSave={onSave}>
            <FormBreadCrumbs />
            <Form />
          </ImaginaryFormProvider>
        </>
      );
}
