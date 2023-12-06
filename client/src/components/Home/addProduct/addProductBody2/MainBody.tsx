import {SelectCategory} from '../SelectCategory';
import { NameInput, DescriptionInput, SupplierInput } from './StringInputs';
import { NumberInputs } from './NumberInputs';
import { ImgCoorTagInputs } from './ImgCoorTagInputs';
import { FieldErrors, FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import { nameValidate, requiredValidate } from '../../../../utils/validateFuncs';
import { MainBodyInterface } from './mainBodyInterface';
import { FC } from 'react';

export const MainBody: FC<MainBodyInterface> = ({
  register,
  errors
  }) => {
  // const {
  //   register,
  //   formState: { errors},
  // } = useForm({ mode: "onChange" });

  return (
    <>
      <NameInput
        register={register}
        nameValidate={nameValidate}
        errors={errors}
        />
      <SelectCategory
      register={register}
      nameValidate={nameValidate}
      errors={errors}
      />
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
