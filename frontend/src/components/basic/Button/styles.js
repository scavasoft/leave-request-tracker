import styled from 'styled-components';
import themes from "../../../utils/themes";

export const ButtonWrapper = styled.div`
    align-items: center;
    width: 100%;
    height: auto;
    padding: 150px;
`;

export const ContainedButton = styled.button`
    padding: ${props => props.size}px; 
    border-radius: 8px;
    outline: none;
    border: 0;
    color: ${props => props.color};
    
    background-color: #36393F;
    
    &:hover{
        background-color: #4B4B4B;
        box-shadow: 5px 5px 8px #65586F;
    }
`;