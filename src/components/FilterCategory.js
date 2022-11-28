import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormGroup } from '@mui/material';
import FilterItem from './FilterItem';
  
export default function FilterCategory(props) {
    const createFilterItem = (option) => {
        return <FilterItem key={props.option} title={props.title} option={option} filterItems={props.filterItems} filterList={props.filterList} />
    }
    const filterItems = props.options.map(createFilterItem);

    return (
        <div style={{ padding: '8px 25px'}}>
            <FormControl>
                <FormLabel id={props.title}>
                    {props.title}
                </FormLabel>
                <FormGroup>
                    {filterItems}
                </FormGroup>
            </FormControl>
        </div>
    );
}