import {useState} from 'react';
import {isEmpty} from '@app/helpers/Validation';

export function useTextInputValidator() {
  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const [formError, setFormError] = useState({});

  /**
   * ---------------------------------------------------- *
   * @function validateTextInput
   * @params text (String)
   * @params type (String)
   * @params setterFunction (Function)
   * @params validator (Function)
   * @params errorMessage (Object)
   * @summary handling form error using validator param
   * ---------------------------------------------------- *
   */
  const validateTextInput = (
    text,
    type,
    setterFunction,
    validator,
    errorMessage,
  ) => {
    setterFunction(text);
    if (text === '') {
      const errors = {...formError};
      if (errors[type]) {
        delete errors[type];
        setFormError(errors);
      }
    } else {
      if (validator(text) || isEmpty(text)) {
        const errors = {...formError, [type]: errorMessage};
        setFormError(errors);
      } else {
        const errors = {...formError};
        if (errors[type]) {
          delete errors[type];
          setFormError(errors);
        }
      }
    }
  };

  return [formError, validateTextInput];
}
