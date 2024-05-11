import { createContext, useState } from "react";

export const ThemeContext=createContext();
export const ThemeProvider=({children})=>{
    const [toggle,setToggle]=useState();
    const toggletheme=()=>{
        setToggle(!toggle);
    }
    return (
        <ThemeContext.Provider value={{toggle,toggletheme}}>
            {children}
        </ThemeContext.Provider>
    )
}