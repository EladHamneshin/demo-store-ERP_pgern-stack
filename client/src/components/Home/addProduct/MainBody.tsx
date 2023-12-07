import { NameInput, DescriptionInput, SupplierInput } from './StringInputs';
import { NumberInputs } from './NumberInputs';
import { ImgCoorTagInputs } from './ImgCoorTagInputs';
import { requiredValidate } from '../../../utils/validateFuncs';
import { MainBodyInterface } from '../../../types/addProductInterfaces/mainBodyInterface';
import { FC } from 'react';
import { CategoriesInput } from './CategoriesInput';
import { Switch, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../utils/store/hooks';
import { changeForSale } from '../../../utils/store/emailSlice';

export const MainBody: FC<MainBodyInterface> = ({
  register,
  errors
}) => {
  const dispatch = useAppDispatch();
  const forSale: boolean = useAppSelector((state) => state.email.forSale)

  const isForSaleHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeForSale(event.target.checked));
  };
  return (
    <>
      <NameInput
        register={register}
        requiredValidate={requiredValidate}
        errors={errors}
      />
      <CategoriesInput
        register={register}
        errors={errors}
        requiredValidate={requiredValidate}
      />
      <NumberInputs
        register={register}
        requiredValidate={requiredValidate}
        errors={errors}
      />
      <DescriptionInput
        register={register}
        requiredValidate={requiredValidate}
        errors={errors}
      />
      <SupplierInput
        register={register}
        requiredValidate={requiredValidate}
        errors={errors}
      />
      <ImgCoorTagInputs
        register={register}
        requiredValidate={requiredValidate}
        errors={errors}
      />
      <br></br>
      <Typography>Is For Sale</Typography>
      <Switch
        checked={forSale}
        onChange={isForSaleHandleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </>
  )

}
