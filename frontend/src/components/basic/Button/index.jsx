import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper, ContainedButton } from './styles';

/***
 * Arrow function instead class, it is stateful component which use hooks
 * More readable, scalable and easier for understand
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const Button = React.forwardRef((props, ref) => {
    //Custom props that which we give at initialize of the component
    const {
        text, padding, border,
        borderRadius, boxShadow,
        ...rest
    } = props;

    const { onClick } = rest;

    //Set buttonProps for more readable
    //useMemo re-render an object only when one of the values is changed
    const ButtonProps = useMemo(() => ({
        text, padding,
        border, borderRadius,
        boxShadow,
    }), [text, padding, border, borderRadius, boxShadow]);

    return (
        <ButtonWrapper>
            <ContainedButton onClick={onClick} {...ButtonProps}>{text}</ContainedButton>
        </ButtonWrapper>
    );
});

//Set types of our props
Button.propTypes = {
    text: PropTypes.string,
    padding: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.number,
    boxShadow: PropTypes.string,
}

//Default props
Button.defaultProps = {
    padding: null,
    border: 'none',
    borderRadius: 0,
    boxShadow: null,
}

export default Button;