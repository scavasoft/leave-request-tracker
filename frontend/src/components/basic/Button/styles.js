import styled from 'styled-components';
import themes from "../../../utils/themes";

//Styled component which we include into the component afterward
export const ButtonWrapper = styled.div`
    align-items: center;
    width: 100%;
    height: auto;
`;

export const ContainedButton = styled.button`${props => {
    const { padding, border, borderRadius, boxShadow } = props;
    return`
        padding: ${padding};
        border: ${border}; 
        border-radius: ${borderRadius}px;
        ${boxShadow !== null && 
            `
                box-shadow: ${boxShadow};
            `
        }
        margin: auto;
        display: block;
        outline: none;
        border: 0;
        color: ${themes.surface};
        
        background-color: #36393F;
        
        &:hover{
            background-color: #282B34;
        }
    `;
}}
`;