import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function ImgCoorFields() {
    const [urlError, setUrlError] = useState(false);
    const [altError, setAltError] = useState(false);
    const [longitudeError, setLongitudeError] = useState(false);
    const [latitudeError, setLatitudeError] = useState(false);

    const handleUrlBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setUrlError(false)
    }
    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setUrlError(true)
    }

    const handleAltBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setAltError(false)
    }
    const handleAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setAltError(true)
    }

    const handleLongitudeBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setLongitudeError(false) 
    }
    const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setLongitudeError(true)
    }

    const handleLatitudeBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setLatitudeError(false)
    }
    const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setLatitudeError(true)
    }

    return (
        <>
            <TextField
                onBlur={handleUrlBlur}
                onChange={handleUrlChange}
                name="imageUrl"
                margin="normal"
                required
                id="imageUrl"
                label="image url"
                autoFocus
                error={urlError}
                helperText={urlError ? 'Required field' : ''}
                sx={{ marginRight: '30px' }}
            />

            <TextField
                onBlur={handleAltBlur}
                onChange={handleAltChange}
                name="imageAlt"
                margin="normal"
                required
                id="imageAlt"
                label="Image alt"
                autoFocus
                error={altError}
                helperText={altError ? 'Required field' : ''}
            />

            <TextField
                onBlur={handleLongitudeBlur}
                onChange={handleLongitudeChange}
                name="longitude"
                margin="normal"
                required
                type='number'
                id="longitude"
                label="longitude"
                autoFocus
                error={longitudeError}
                helperText={longitudeError ? 'Required field' : ''}
                sx={{ marginRight: '30px' }}
            />

            <TextField
                onBlur={handleLatitudeBlur}
                onChange={handleLatitudeChange}
                name="latitude"
                margin="normal"
                required
                type='number'
                id="latitude"
                label="latitude"
                autoFocus
                error={latitudeError}
                helperText={latitudeError ? 'Required field' : ''}  
            />
        </>
    );
}