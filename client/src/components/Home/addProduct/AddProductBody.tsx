import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SelectCategory from './SelectCategory';
import CostSaleFields from './CostSaleFields';
import ImgCoorFields from './ImgCoorFields';

export default function AddProductBody() {
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [supplyError, setSupplyError] = useState(false);
    const [tagNameError, setTagNameError] = useState(false);
    const [tagValError, setTagValError] = useState(false);

    const handleNamelBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setNameError(false)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setNameError(true)
    }

    const handleDescriptionlBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setDescriptionError(false)
    }
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setDescriptionError(true)
    }

    const handleSupplyBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setSupplyError(false)
    }
    const handleSupplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setSupplyError(true)
    }

    const TagNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setTagNameError(false)
    }
    const TagNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setTagNameError(true)
    }

    const TagValueBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setTagValError(false)
    }
    const TagValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setTagValError(true)
    }

    return (
        <>
            <TextField
                onBlur={handleNamelBlur}
                onChange={handleNameChange}
                name="name"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product name"
                autoFocus
                error={nameError}
                helperText={nameError ? 'Required field' : ''}
            />

            <SelectCategory />
            <CostSaleFields />

            <TextField
                onBlur={handleDescriptionlBlur}
                onChange={handleDescriptionChange}
                name="description"
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                autoFocus
                error={descriptionError}
                helperText={descriptionError ? 'Required field' : ''}
            />

            <TextField
                onBlur={handleSupplyBlur}
                onChange={handleSupplyChange}
                name="supplier"
                margin="normal"
                required
                fullWidth
                id="supplier"
                label="supplier"
                autoFocus
                error={supplyError}
                helperText={supplyError ? 'Required field' : ''}
            />
            <ImgCoorFields />

            <TextField
                onBlur={TagNameBlur}
                onChange={TagNameChange}
                name="tagName"
                margin="normal"
                required
                id="tagName"
                label="Tag name"
                autoFocus
                error={tagNameError}
                helperText={tagNameError ? 'Required field' : ''}
                sx={{ marginRight: '30px' }}
            />

            <TextField
                onBlur={TagValueBlur}
                onChange={TagValueChange}
                name="tagValue"
                margin="normal"
                required
                id="tagValue"
                label="Tag value"
                autoFocus
                error={tagValError}
                helperText={tagValError ? 'Required field' : ''}
            />
        </>
    )
}
