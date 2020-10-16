import styled from 'styled-components';
import themes from '../../../utils/themes';

export const InputWrapper = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
    borderRadius: 0px;
`;

export const InputFilled = styled.input`${props => {
    const { width, height, padding, transition, borderRadius } = props;
    return `
    width: ${width};
    height: ${height};
    padding: ${padding};
    margin: ${props.margin};
    border: ${props.border};
    border-radius: ${borderRadius};
    border-bottom: none;
    transition: ${transition};
    font-size: ${props.fontSize};
    
    &:focus{
        outline: none;
        border-bottom: 2px solid black;
    }
`;
}}
`;

export const MultiLineInput = styled.textarea`${props => {
    const { width, height, padding, transition, resize } = props;
    return `
        width: ${width};
        height: ${height};
        padding: ${padding};
        margin: ${props.margin};
        border: ${props.border};
        border-radius: ${props.borderRadius};
        border-bottom: 1px solid gray;
        transition: ${transition};
        font-size: ${props.fontSize};
        resize: ${resize};
        
        &:hover{
            border-bottom: 2px solid black;
        }
        
        &:focus{
            outline: none;
            border-bottom: 2px solid black;
        }
    `;
}}
`;

// Helper Text
export const TextBox = styled.h6`${props => {

    const { focus } = props;
    return `
        position: absolute;
        bottom: 0;
        left: 0;
        color: ${themes.onSecondary};
      
        ${focus &&
        `
                bottom: 85%;
                font-size: 10px;
                color: ${themes.surface};
            `
        };
    `;
}}
`;
