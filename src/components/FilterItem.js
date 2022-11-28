import React from 'react';
import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
  
export default function FilterItem(props) {
    const [checked, setChecked] = useState(false)
    const handleChange = () => {
        setChecked(!checked)
        props.filterItems(props.title, props.option);
    };

    // visually deselects checkboxes
    useEffect(() => {
        const resetFilters = () => {
            if (props.filterList.length == 0) {
                setChecked(false);
            }
        }
        resetFilters();
      }, [props.filterList]);
    
    return (
        <FormControlLabel 
            control={<Checkbox checked={checked} onChange={() => handleChange()} value={props.option} style ={{
                color: "#000000",
              }} />} 
            key={props.option}
            label={props.option}
        />
    );
}