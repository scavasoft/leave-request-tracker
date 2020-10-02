import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//css for material ui drop down menu
const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const DropDown = React.forwardRef((props, ref) => {
    const classes = useStyles();

    const {
        onChange, ...rest
    } = props;

    const values = rest.values; // Array of values
    const items = []; // That means react elements

    for (let i = 0; i < values.length; i++) {
        //Look for safely ref
        console.log(ref);
        items.push(<MenuItem ref={ref} key={i} value={values[i]}>{values[i]}</MenuItem>)
    }

    const [value, setValue] = React.useState(''); //The type of leave ('Vacation'..)
    const [open, setOpen] = React.useState(false); // open value, setOpen(function)

    console.group('Dropdown props')
    console.log(props)
    console.groupEnd()

    const handleChange = useCallback(event => {
        setValue(event.target.value);

        onChange(event);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Leave type:</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={value}
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