import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function CostSaleFields() {
    const [isCostError, setCostError] = useState(false);
    const [isSaleError, setSaleError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [discountError, setDiscountError] = useState(false);
    
    const positiveNun = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(event.target.value) < 0) event.target.value = '0';
    }

    const handleCostBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setCostError(false)

    }
    const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setCostError(true)
        positiveNun(event)
    }

    const handleSaleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setSaleError(false)

    }
    const handleSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setSaleError(true)
        positiveNun(event)
    }

    const handleQuantityBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setQuantityError(false)
    }
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setQuantityError(true)
        positiveNun(event)
    }

    const handleDiscountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== "") setDiscountError(false)
    }
    const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") setDiscountError(true)
        positiveNun(event)
    }

    return (
        <>
            <TextField
                onBlur={handleCostBlur}
                onChange={handleCostChange}
                name="costPrice"
                margin="normal"
                required
                fullWidth
                type='number'
                id="costPrice"
                label="Cost price"
                autoFocus
                error={isCostError}
                helperText={isCostError ? 'Required field' : ''}
            />
            <TextField
                onBlur={handleSaleBlur}
                onChange={handleSaleChange}
                name="salePrice"
                margin="normal"
                required
                fullWidth
                type='number'
                id="salePrice"
                label="Sale price"
                autoFocus
                error={isSaleError}
                helperText={isSaleError ? 'Required field' : ''}

            />
            <TextField
                onBlur={handleQuantityBlur}
                onChange={handleQuantityChange}
                name="quantity"
                margin="normal"
                required
                fullWidth
                type='number'
                id="quantity"
                label="quantity"
                autoFocus
                error={quantityError}
                helperText={quantityError ? 'Required field' : ''}
            />
            <TextField
                onBlur={handleDiscountBlur}
                onChange={handleDiscountChange}
                name="discountPercentage"
                margin="normal"
                required
                fullWidth
                type='number'
                id="discountPercentage"
                label="Discount Percentage"
                autoFocus
                error={discountError}
                helperText={discountError ? 'Required field' : ''}
            />
        </>
    )
}