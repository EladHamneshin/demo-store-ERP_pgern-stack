import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export default function SelectCategory() {
    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    return (
        <>
            <br></br>
            <br></br>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    name='categorySelect'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={'c2f36898-84b4-4563-b2ca-47bc9a8fac5a'}>Phones</MenuItem>
                    <MenuItem value={'be2b9b97-cf82-4acc-85ac-83c8b1f79da5'}>Computers</MenuItem> 
                    <MenuItem value={'4dd06fee-d86c-421a-952c-8e3a71f34edd'}>Home Appliances</MenuItem> 
                </Select>
            </FormControl>
        </>
    )
}

