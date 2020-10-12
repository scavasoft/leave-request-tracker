import styled from 'styled-components';
import themes from '../../../utils/themes';

export const InputWrapper = styled.div`
    margin-bottom: 35px;
    height: auto;
    position: relative;
`;

export const InputFilled = styled.input`${props => {
    const { width, height, padding, transition } = props;
    return `
     ${width !== null &&
            `
                width: ${width};
            `
    }
    ${height !== null &&
            `
                height: ${height};
            `
    }
    ${padding !== null &&
            `
                padding: ${padding};
            `
    }
    border: none;
    border-bottom: 1px solid gray;
    transition: ${transition};
    
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

export const MultiLineInput = styled.textarea`${props => {
    const { width, height, padding, transition, resize } = props;
    return`
        ${width !== null &&
            `
                width: ${width};
            `
        }
        ${height !== null &&
            `
                height: ${height};
            `
        }
        ${padding !== null &&
            `
                padding: ${padding};
            `
        }
        border: none;
        border-bottom: 1px solid gray;
        resize: ${resize};
        transition: ${transition};
        
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
