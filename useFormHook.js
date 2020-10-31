import { useState } from "react"; 
import { useLocalStorage } from "./useLocalStorage";

export const useForm = (key, initialValues) => { 
//useform composes useState/ absorbs usestate

const [values, setValues] = useLocalStorage(key, initialValues); 
//initiaValue is an obj with a key for each field in the form

//custom logic here 
const handleChanges = (e) => { 
setValues({ ...values, 
if e.target.name = "firstName", 
[e.target.name]: e.target.value }); 
//console.log(firstName) }; 
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
