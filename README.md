# Adela-s-custom-hooks
React.js custom hooks: useDarkMode useLocalStorage useForm
//useDarkMode
import {useEffect} from "react";
import {useLocalStorage} from "./useLocalStorage";

export const useDarkMode = () => {
    const [someValue, setSomeValue] = useLocalStorage("adelaskeyDarkMode2020");
    //custom logic from the parent compoenet index.js here
    useEffect(()=>{
if (someValue === true){
document.body.classList.add("dark-mode");
}else{
  document.body.classList.remove("dark-mode");
}
    }, [someValue])

    return [someValue, setSomeValue];
}

//useLocalStorage
import {useState} from "react";

export const useLocalStorage = (key, initialValue) => {
const [storedValue, setStoredValue] = useState(() => {
if(window.localStorage.getItem(key)){
return JSON.parse(window.localStorage.getItem(key));
} else{
    window.localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
}
});

const setValue = (value) => {
    //save to state now
    setStoredValue(value);
    //now save ot local storage
    window.localStorage.setItem(key, JSON.stringify(value));
};
return [storedValue, setValue];
}


//useFormHook
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useForm = (key, initialValues) => {
  //useform composes useState/ absorbs usestate

  const [values, setValues] = useLocalStorage(key, initialValues);
  //initiaValue is an obj with a key for each field in the form

  //custom logic here
  const handleChanges = (e) => {
    setValues({
      ...values,
      //the squaer brackets  here define the key
      //if e.target.name = "firstName",
      [e.target.name]: e.target.value
    });
    //console.log(firstName)
  };
  const clearForm = (e) => {
    e.preventDefault();
    setValues(initialValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(values);
  };
  //define your own interface for the return values----match the interface with how we apply thisin signup form
  return [values, handleChanges, handleSubmit, clearForm];
};

//OR
import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  //we wnat to enable all thge fitures od useState also persist values to localStorage for example progress in a formcan be saved even if the user accidentaly quits their browser and has to come back to the form later

  //goals for this custom hook:
  //if the values already excist in local storage use that value for initialization
  //persist values to local storage with every setValue call
  //dont forget to strigify before saving to local storage and parse when retrieving an object

  const [storedValue, setStoredValue] =
    //privat value

    //we dont know what the initial value is yet, we have to run a function to figure it out(could be the value passed in or localstorage)
    useState(() => {
      //if the value is there in ls use it else use initaialValue
      if (window.localStorage.getItem(key)) {
        return JSON.parse(window.localStorage.getItem(key));
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    });

  const setValue = (value) => {
    //save ti state
    setStoredValue(value);
    //save to localStorage
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

//the interface for this hook [storedValue, setValue] symilar to useState and = useLocalStorage(initialValue);
