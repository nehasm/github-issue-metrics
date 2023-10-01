import {useState} from 'react'

const useInput = (initialValue="") => {
    const [enteredValue,setEnteredValue] = useState("");
    const [isTouched,setIsTouched] = useState(false);

    let valueIsValid = enteredValue.trim() !== ''

    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (e) => {
        setEnteredValue(e.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true)
    }
    const reset = () => {
        setEnteredValue('');
        setIsTouched(false)
    }
    const setInitialValue = () => {
        setEnteredValue(initialValue);
    }

  return {
    value:enteredValue,valueIsValid,hasError,valueChangeHandler,inputBlurHandler,setInitialValue,reset
  }
}

export default useInput;