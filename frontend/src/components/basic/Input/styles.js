import styled from 'styled-components';

export const InputWrapper = styled.div`
    margin: 15px auto;
    width: 50%;
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
        color: #36393F;
      
        ${focus &&
            `
                bottom: 13px;
                font-size: 10px;
            `
        };
    `;
}}
`;
