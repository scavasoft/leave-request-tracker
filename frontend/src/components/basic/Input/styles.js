import styled from 'styled-components';
import themes from '../../../utils/themes';

export const InputWrapper = styled.div`
    margin-bottom: 35px;
    height: auto;
    position: relative;
`;

export const InputContained = styled.input`
    border: none;
    border-bottom: 1px solid gray;
    
    &:hover{
        border-bottom: 2px solid black;
    }
    
    &:focus{
        outline: none;
        border-bottom: 2px solid black;
    }
    
`;

export const TextBox = styled.h6`${props => {
    
    const { focus } = props;
    return `
        position: absolute;
        bottom: 0;
        left: 0;
        color: ${themes.BASE_THEME.secondary};
      
        ${focus &&
            `
                bottom: 13px;
                font-size: 10px;
                color: ${themes.BASE_THEME.surface};
            `
        };
    `;
}}
`;
