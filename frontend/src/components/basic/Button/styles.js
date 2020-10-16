import styled from 'styled-components';
import themes from "../../../utils/themes";

//Styled component which we include into the component afterward
export const ButtonWrapper = styled.div`
    align-items: center;
    width: 100%;
    height: auto;
`;

export const ContainedButton = styled.button`${props => {
    const { padding, border, borderRadius, boxShadow, margin, 
    width, height, transition, fontSize, textTransform } = props;
    return`
        display: block;
        outline: none;
        padding: ${padding};
        margin: ${margin};
        border: ${border}; 
        border-radius: ${borderRadius};
        box-shadow: ${boxShadow};
        width: ${width};
        height: ${height};
        transition: ${transition};
        font-size: ${fontSize};
        text-transform: ${textTransform};
        
        color: ${themes.secondary};
        background-color: ${themes.onSurface};
        
        &:hover{
            background-color: #282B34;
        }
    `;
}}
`;