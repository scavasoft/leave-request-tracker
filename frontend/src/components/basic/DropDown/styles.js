import styled from "styled-components";

export const FormControl = styled.div`
    padding-bottom: 20px;
`;

export const InputLabel = styled.label`
    color: #FFF;
`;

export const Select = styled.select`
    display: block;
    width: 100%;
    font-size: 12px;
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

export const MenuItem = styled.option`
    font-size: 12px;
`;