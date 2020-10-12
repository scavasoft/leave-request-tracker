import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import { FormControl, InputLabel, Select, MenuItem } from './styles';

/***
 * Ready component by Material design
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const DropDown = React.forwardRef((props, ref) => {
    //Custom props that which we give at initialize of the component
    const {
        onChange, values
    } = props;

    const items = []; // Array with custom tags <MenuItem/>
    for (let i = 0; i < values.length; i++) {
        if(i === 0)
            items.push(<MenuItem ref={ref} key={0} value={null}>None</MenuItem>)
        items.push(<MenuItem ref={ref} key={i+1} value={values[i]}>{values[i]}</MenuItem>)
    }

    const [value, setValue] = React.useState(''); //The type of leave ('Vacation'..)
    //Methods that we attach as events, in our case on the Select tag
    const handleChange = useCallback(event => {
        setValue(event.target.value);

        onChange(event);
    }, []);

    const selectProps = useMemo(() => ({
        value
    }), [value]);

    return (
        <div>
            <FormControl>
                <InputLabel>Leave type</InputLabel>
                <Select
                    {...selectProps}
                    onChange={handleChange}
                >
                    {items}
                </Select>
            </FormControl>
        </div>
    );
});

DropDown.propTypes = {
    values: PropTypes.array,
};

DropDown.defaultProps = {
    values: ['null'],
};

export default DropDown;