import SelectCategory from '../SelectCategory';
import { NameInput, DescriptionInput, SupplierInput } from './StringInputs';
import { NumberInputs } from './NumberInputs';
import { ImgCoorTagInputs } from './ImgCoorTagInputs';
import { useForm } from 'react-hook-form';
import { nameValidate, requiredValidate } from '../../../../utils/validateFuncs';

export default function MainBody() {
  const {
    register,
    formState: { errors},
  } = useForm({ mode: "onChange" });

  return (
    <>
      <NameInput
        register={register}
        nameValidate={nameValidate}
        errors={errors}
        />
      <SelectCategory/>
      <NumberInputs
        register={register}
        requiredValidate={requiredValidate}
        errors={errors}
      />
      <DescriptionInput
        register={register}
        nameValidate={nameValidate}
        errors={errors}
      />
      <SupplierInput
        register={register}
        nameValidate={nameValidate}
        errors={errors}
      />
      <ImgCoorTagInputs
      register={register}
      requiredValidate={requiredValidate}
      errors={errors}
      />
    </>
  )

}
