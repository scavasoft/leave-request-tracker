import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { FormControl, Select, MenuItem } from './styles';

/***
 * Ready component by Material design
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const DropDown = React.forwardRef((props, ref) => {
    //Custom props that which we give at initialize of the component
    const {
        onChange, values, width, height, fontSize,
    } = props;

    const items = []; // Array with custom tags <MenuItem/>
    for (let i = 0; i < values.length; i++) {
        if (i === 0)
            items.push(<MenuItem ref={ref} key={0} hidden value={null}>None</MenuItem>)
        items.push(<MenuItem ref={ref} key={i + 1} value={values[i]}>{values[i]}</MenuItem>)
    }

    const [value, setValue] = React.useState(''); //The type of leave ('Vacation'..)
    //Methods that we attach as events, in our case on the Select tag
    const handleChange = useCallback(event => {
        setValue(event.target.value);

        onChange(event);
    }, []);

    const selectProps = useMemo(() => ({
        value, width, height, fontSize
    }), [value, width, height, fontSize]);

    return (
        <div>
            <FormControl>
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
    width: PropTypes.string,
    height: PropTypes.string,
    fontSize: PropTypes.string,
};

DropDown.defaultProps = {
    values: ['null'],
    width: '100%',
    height: 'auto',
    fontSize: '1em',
};

export default DropDown;