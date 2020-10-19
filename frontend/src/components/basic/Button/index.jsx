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
        text, padding, margin, border, borderRadius, boxShadow,
        width, height, transition, fontSize, textTransform,
        ...rest
    } = props;

    const { onClick } = rest;

    //Set buttonProps for more readable
    //useMemo re-render an object only when one of the values is changed
    const ButtonProps = useMemo(() => ({
        text, padding, margin,
        border, borderRadius, boxShadow,
        width, height, transition, fontSize, textTransform,
    }), [text, padding, margin, border, borderRadius, boxShadow, width, height, transition, fontSize, textTransform]);

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
    margin: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.string,
    boxShadow: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    transition: PropTypes.string,
    fontSize: PropTypes.string,
    textTransform: PropTypes.string,
}

//Default props
Button.defaultProps = {
    padding: '0',
    margin: '0',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    width: 'auto',
    height: 'auto',
    transition: 'none',
    fontSize: '12px',
    textTransform: 'none',
}

export default Button;