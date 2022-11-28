import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../css/Sort.css';
  
export default function Sort(props) {
    return (
        <div className="sort-group">
            <FormControl>
                <FormLabel id="sort-heading">
                    Sort By
                </FormLabel>
                <RadioGroup
                    defaultValue="Choice 1"
                    name="radio-group"
                >
                    <FormControlLabel value="Choice 1"
                        onClick={() => {props.setSortType("rating")}}
                        control={<Radio color="default" />}
                        label="Popular" color="primary" />
                    <FormControlLabel value="Choice 2"
                        onClick={() => {props.setSortType("price")}}
                        control={<Radio color="default" />}
                        label="Cheapest" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}