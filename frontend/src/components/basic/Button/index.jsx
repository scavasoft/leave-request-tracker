import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import themes from '../../../utils/themes';
import { ButtonWrapper, ContainedButton } from './styles';

const Button = React.forwardRef((props, ref) => {
    const {
        text, size, color, backgroundColor, ...moreProps
    } = props;

    const { onClick, onClose } = moreProps;

    const ButtonProps = useMemo(() => ({
        text: text,
        onClickCapture: onClick,
        onCloseCapture: onClose,
        size: size,
        color: color,
        backgroundColor: backgroundColor,
    }), [text, onClick]);

    return (
        <ButtonWrapper>
            <ContainedButton {...ButtonProps}>{text}</ContainedButton>
        </ButtonWrapper>
    );
});

//Check the types
Button.propTypes = {
    text: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
}

Button.defaultProps = {
    color: themes.BASE_THEME.secondary,
    backgroundColor: themes.BASE_THEME.surface
}

export default Button;