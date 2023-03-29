import * as React from 'react';
import { Button, Select, FormControl, MenuItem, OutlinedInput } from '@mui/material';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from '../../data';

export default function SelectInput({ genderName, options, onChange, order, onClick }) {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChange = (event) => {
        onChange(event.target.value)
    };

    return (
        <>
            <FormControl sx={{ width: '100%', my: 3, flexDirection: "row" }}>
                <Select
                    value={genderName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        height: 40,
                        width: "100%",
                        background: "white",
                        borderRadius: "5px 0px 0px 5px",
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9adb02',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9adb02',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#9adb02',
                        },
                        '.MuiSvgIcon-root ': {
                            fill: "white !important",
                        }
                    }}
                >
                    {options.map((element) => (
                        <MenuItem
                            key={element}
                            value={element}
                        >
                            {element}
                        </MenuItem>
                    ))}
                </Select>
                <Button sx={
                    {
                        width: 180,
                        height: 40,
                        background: "#9adb02",
                        color: 'black',
                        textTransform: "none",
                        borderRadius: "0px 5px 5px 0px",
                        "&:hover": {
                            background: "#94eb00",
                        }
                    }}
                    onClick={onClick}
                >
                    {order === 'asc' ? 'Year Ascending' : 'Year Descending'}
                </Button>
            </FormControl>
        </>
    );
}