import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { isEmpty } from '../../../utils/validateFuncs';
import SelectCategory from './SelectCategory';
import { Box, Typography } from '@mui/material';


export default function AddProductBody() {
    const [isError, setError] = useState(false);

    const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!isEmpty(event.target.value)) setError(true);
    }

    // const handleFieldChange = (event: React.FocusEvent<HTMLInputElement>) => {
    //     if (isEmpty(event.target.value)) setError(false);
    // }
    
    return (
        <>

            <TextField
                name="name"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product name"
                autoFocus
            />
            <SelectCategory />
            <TextField
                name="costPrice"
                margin="normal"
                required
                fullWidth
                type='number'
                id="costPrice"
                label="Cost price"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="salePrice"
                margin="normal"
                required
                fullWidth
                type='number'
                id="salePrice"
                label="Sale price"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="quantity"
                margin="normal"
                required
                fullWidth
                type='number'
                id="quantity"
                label="quantity"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="description"
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="discountPercentage"
                margin="normal"
                required
                fullWidth
                type='number'
                id="discountPercentage"
                label="Discount Percentage"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="supplier"
                margin="normal"
                required
                fullWidth
                id="supplier"
                label="supplier"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="imageUrl"
                margin="normal"
                required
                id="imageUrl"
                label="image url"
                autoFocus
            // error={isEmailError}
            sx={{marginRight: '30px'}}
            />

            <TextField
                name="imageAlt"
                margin="normal"
                required
                id="imageAlt"
                label="Image alt"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="longitude"
                margin="normal"
                required
                type='number'
                id="longitude"
                label="longitude"
                autoFocus
            // error={isEmailError}
            sx={{marginRight: '30px'}}

            />

            <TextField
                name="latitude"
                margin="normal"
                required
                type='number'
                id="latitude"
                label="latitude"
                autoFocus
            // error={isEmailError}
            />

            <TextField
                name="tags"
                margin="normal"
                required
                fullWidth
                id="tags"
                label="Tags"
                autoFocus
            // error={isEmailError}
            />   
        </>
    )
}
