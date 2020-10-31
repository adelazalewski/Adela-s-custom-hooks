import {useEffect} from "react"; 
import {useLocalStorage} from "./useLocalStorage";

export const useDarkMode = () => { 
const [someValue, setSomeValue] = useLocalStorage("adelaskeyDarkMode2020"); 
//custom logic from the parent component index.js here 
useEffect(()=>{ 
if (someValue === true){ 
document.body.classList.add("dark-mode"); 
}else{ document.body.classList.remove("dark-mode"); 
} 
}, [someValue])

return [someValue, setSomeValue];
}
