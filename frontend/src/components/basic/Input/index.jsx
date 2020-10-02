import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { InputWrapper, InputContained } from "./styles";

const Input = React.forwardRef((props, ref) => {
   const {
      label, helperText, errorText, value: preFilledText = '',
      placeholder, withIconOnError,
      onChange, onChangeCapture, disabled, type,
      withCharacterCount, maxCharacterCount, ...rest
   } = props;

   const [value, setValue] = useState(preFilledText);
   //const [error, setError] = useState(errorText);


   const textChanges = useCallback(e => {
      const { value: text } = e.target;
      if (withCharacterCount && text.length > maxCharacterCount) {
         setValue(text.slice(0, maxCharacterCount))
         e.preventDefault();
         return;
      }
      setValue(text);
      if (onChange)
         onChange(e);
      if (onChangeCapture)
         onChangeCapture(e);

      // If you need to access a synthetic event inside an asynchronous callback function,
      // event.persist() should be called to remove the current event from the pool.
      // Otherwise, an irrelevant value from another event or a null value will be read inside the callback.
      e.persist();
   }, [])

   const inputProps = useMemo(() => ({
      // hasError: !!error,
      onChange: textChanges,
      disabled, label,
      //withIconOnError,
      placeholder, value, type,
   }), [disabled, label, withIconOnError, placeholder, value, type])

   return(
       <InputWrapper>
          <InputContained
              ref={ref}
              {...inputProps}
          />
       </InputWrapper>
   );
});

//Set type of all properties
Input.propTypes = {
   inputType: PropTypes.oneOf(['filled', 'textarea', 'outline']),
   label: PropTypes.string,
   helperText: PropTypes.string,
   errorText: PropTypes.string,
   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   disabled: PropTypes.bool,
   withCharacterCount: PropTypes.bool,
   maxCharacterCount: PropTypes.number,
};

Input.defaultProps = {
   inputType: 'filled',
   disabled: false,
   withCharacterCount: false,
   maxCharacterCount: 255,
};

export default Input;