import React, { useMemo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { InputWrapper, InputFilled, MultiLineInput, TextBox } from "./styles";

/***
 * Arrow function instead class, it is stateful component which use hooks
 * More readable, scalable and easier for understand
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const Input = React.forwardRef((props, ref) => {
   //Custom props that which we give at initialize of the component
   const {
      helperText, value: preFilledText = '',
      onChange, disabled, type, inputType,
      withCharacterCount, maxCharacterCount, padding, margin, borderRadius,
      transition, width, height, border, fontSize, resize, ...rest
   } = props;

   //useState is a Hook that allow us to have state variables in functional components
   const [focus, setFocus] = useState(false);
   const [value, setValue] = useState('');

   useEffect(() => setValue(preFilledText), [preFilledText]);

   const textChanges = useCallback(e => {
      //Validation
      const { value: text } = e.target; //get current text in the focused input -> value='Ivan'
      if (withCharacterCount && text.length > maxCharacterCount) { //If has characters and length of the text is > from our default(255)
         setValue(value.slice(0, maxCharacterCount)) // get characters to maxCharacterCount in our case 255
         e.preventDefault();
         return;
      }
      setValue(text);
      if (onChange)
         onChange(e)

      e.persist();
   }, [])

   const hasFocus = () => {
      if (!focus)
         setFocus(true);
   }

   //hasBlur is an event which response when we are clicking outside our component
   const hasBlur = () => {
      if (focus && preFilledText.length === 0) setFocus(false)
   }

   //Set inputProps for more readable
   //useMemo re-render an object only when one of the values is changed
   const inputProps = useMemo(() => ({
      onChange: textChanges,
      disabled, type,
      borderRadius, transition,
      padding, margin, width, height,
      border, fontSize,
   }), [disabled, type, borderRadius, transition, padding, width, height, margin, border, fontSize]);

   const multiLineProps = useMemo(() => ({
      onChange: textChanges,
      disabled, type,
      padding, margin, borderRadius, transition,
      resize, width, height, border, fontSize,
   }), [disabled, type, padding, borderRadius, transition, resize, width, height, margin, border, fontSize]);

   const textBoxProps = useMemo(() => ({
      padding, focus
   }), [padding, focus]);

   return (
      <InputWrapper>
         {(inputType === 'filled' && type !== 'date' && type !== 'textarea') &&
            <InputFilled
               {...inputProps}
               onFocus={hasFocus}
               onBlur={hasBlur}
               value={preFilledText}
            />
         }
         {type === 'date' &&
            <InputFilled
               {...inputProps}
               value={value}
            />
         }
         {inputType === 'textarea' &&
            <MultiLineInput
               {...multiLineProps}
               onFocus={hasFocus}
               onBlur={hasBlur}
               value={preFilledText}
            />
         }
         <TextBox {...textBoxProps}>
            {helperText}
         </TextBox>
      </InputWrapper>
   );
});

//Set type of all properties
Input.propTypes = {
   inputType: PropTypes.oneOf(['filled', 'textarea']),
   helperText: PropTypes.string,
   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   disabled: PropTypes.bool,
   withCharacterCount: PropTypes.bool,
   maxCharacterCount: PropTypes.number,
   focus: PropTypes.bool,
   padding: PropTypes.string,
   margin: PropTypes.string,
   borderRadius: PropTypes.string,
   transition: PropTypes.string,
   width: PropTypes.string,
   height: PropTypes.string,
   resize: PropTypes.string,
   border: PropTypes.string,
   fontSize: PropTypes.string,
};

Input.defaultProps = {
   inputType: 'filled',
   disabled: false,
   withCharacterCount: false,
   maxCharacterCount: 255,
   focus: false,
   padding: '0',
   margin: 'auto',
   border: 'none',
   borderRadius: '0',
   transition: 'none',
   resize: 'none',
   width: 'auto',
   height: 'auto',
   fontSize: '12px',
};

export default Input;