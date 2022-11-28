import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormGroup, Checkbox } from '@mui/material';
  
export default function FilterCategory(props) {
    const createFormControlLabel = (option) => {
        return <FormControlLabel 
        control={<Checkbox onChange={() => handleChange(option)} value={option} />} 
        key={option}
        label={option}
        />
    }
    const options = props.options.map(createFormControlLabel);

    const handleChange = (filterName) => {
        // props.title represents the filter category
        // name represents the name of a filter within a category
        props.filterItems(props.title, filterName);
    };
    
    return (
        <div style={{ padding: '8px 25px'}}>
            <FormControl>
                <FormLabel id="filter-group">
                    {props.title}
                </FormLabel>
                <FormGroup>
                    {options}
                </FormGroup>
            </FormControl>
        </div>
    );
}