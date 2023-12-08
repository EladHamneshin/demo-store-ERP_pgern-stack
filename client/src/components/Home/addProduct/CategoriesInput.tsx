import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FieldInputInterface } from '../../../types/addProductInterfaces/FieldInputInterface';
import { FC, useEffect, useState } from 'react';
import { AllCategories } from '../../../types/Product';
import { useAppDispatch } from '../../../store/hooks';
import { saveCategory } from '../../../store/emailSlice';

export const CategoriesInput: FC<FieldInputInterface> = ({
  register,
  requiredValidate
}) => {
  
  const dispatch = useAppDispatch();
  const [allCategories, setAllCategories] = useState<AllCategories[]>([])
  const [category, setCategory] = useState('');
  
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://erp-server-zqf9.onrender.com/shopInventory/categories')
      const resCategories: AllCategories[] = await res.json();
      setAllCategories(resCategories);
    }
    getData()
  }, []);


  return (
    <>
      <Autocomplete
        freeSolo
        disablePortal
        id="Categories"
        fullWidth
        value={category}
        {...register("Categories", requiredValidate)}
        options={allCategories!.map((option) => option.name)}
        sx={{ width: 534}}
        renderInput={(params) => <TextField {...params} label="Categories" />}
        onChange={(event, newValue) => {
          for (let category of allCategories) {
            if (newValue === category.name) {
              dispatch(saveCategory(category.id));
            }
          }
            newValue ? setCategory(newValue): setCategory(category)
        }}
      />
    </>
  );
}


