import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export default function SelectCategory() {
    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={'f1485671-82e2-4998-81d2-a57b43bc1d90'}>Phones</MenuItem>
                    <MenuItem value={'4a90c012-9583-45b1-b818-8d0d31620876'}>Computers</MenuItem> 
                </Select>
            </FormControl>
        </>
    )
}

