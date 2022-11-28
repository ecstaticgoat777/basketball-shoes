import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
  
export default function Sort(props) {
    return (
        <div style={{ padding: 25 }}>
            <FormControl>
                <FormLabel id="sort-group">
                    Sort By
                </FormLabel>
                <RadioGroup
                    defaultValue="Choice 1"
                    name="radio-group"
                >
                    <FormControlLabel value="Choice 1"
                        onClick={() => {props.setSortType("rating")}}
                        control={<Radio />}
                        label="Popular" color="primary" />
                    <FormControlLabel value="Choice 2"
                        onClick={() => {props.setSortType("price")}}
                        control={<Radio color="primary" />}
                        label="Cheapest" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}