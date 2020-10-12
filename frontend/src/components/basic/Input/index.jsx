import React, { useMemo, useState, useCallback } from 'react';
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
      helperText, inComingValue,
      onChange, onChangeCapture, disabled, type, inputType,
      withCharacterCount, maxCharacterCount, padding, borderRadius,
      transition, backgroundColor, width, height, resize, ...rest
   } = props;

   //useState is a Hook that allow us to have state variables in functional components
   const [focus, setFocus] = useState(false);
   const [value, setValue] = useState('');

   const textChanges = useCallback(e => {
      //Validation
      const { value } = e.target; //get current text in the focused input -> value='Ivan'
      if (withCharacterCount && value.length > maxCharacterCount) { //If has characters and length of the text is > from our default(255)
         setValue(value.slice(0, maxCharacterCount)) // get characters to maxCharacterCount in our case 255
         e.preventDefault();
         return;
      }
      setValue(value);
      if(onChange)
         onChange(e)
      if(onChangeCapture)
         onChangeCapture(e)

      e.persist();
   }, [])

   const hasFocus = () => {
      if(!focus)
         setFocus(true);
   }

   //hasBlur is an event which response when we are clicking outside our component
   const hasBlur = () => {
      if(focus && value.length === 0) setFocus(false)
   }

   //Set inputProps for more readable
   //useMemo re-render an object only when one of the values is changed
   const inputProps = useMemo(() => ({
      onChange: textChanges,
      disabled, type,
      borderRadius, transition,
      backgroundColor, padding,
      width, height
   }), [disabled, type, borderRadius, transition, backgroundColor, padding, width, height]);

   const multiLineProps = useMemo(() => ({
      onChange: textChanges,
      disabled, type,
      padding, borderRadius, transition,
      backgroundColor, resize,
      width, height,
   }), [disabled, type, padding, borderRadius, transition, backgroundColor, resize, width, height]);

   const textBoxProps = useMemo(() => ({
      padding, focus
   }), [padding, focus]);

   return(
       <InputWrapper>
          {inputType === 'filled' &&
          <InputFilled
              {...inputProps}
              onFocus={hasFocus} //Inner prop
              onBlur={hasBlur} //Inner prop
              value={inComingValue}
          />
          }
          {inputType === 'textarea' &&
            <MultiLineInput
                {...multiLineProps}
                onFocus={hasFocus} //Inner prop
                onBlur={hasBlur} //Inner prop
                value={inComingValue}
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
   borderRadius: PropTypes.number,
   transition: PropTypes.string,
   backgroundColor: PropTypes.string,
   width: PropTypes.string,
   height: PropTypes.string,
   resize: PropTypes.string,
};

Input.defaultProps = {
   inputType: 'filled',
   disabled: false,
   withCharacterCount: false,
   maxCharacterCount: 255,
   focus: false,
   padding: null,
   borderRadius: 0,
   transition: 'none',
   resize: 'none',
   width: null,
   height: null,
};

export default Input;