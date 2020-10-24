import styled from "styled-components";

export const FormControl = styled.div``;

export const Select = styled.select`${props => {
    const { width, height, fontSize } = props;
    return `
    display: block;
    width: ${width};
    height: ${height};
    font-size: ${fontSize};
    background: #FFFFFF;
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
}}
`;
export const MenuItem = styled.option`
    font-size: 0.9em;
`;